import newPlayerRegistered from 'src/emails/newPlayerRegistered'
import tournamentCancelledPlayer from 'src/emails/tournamentCancelledPlayer'
import { sendEmail } from 'src/helpers/sendEmail'
import {
  generateMatches,
  generateTournamentUrl,
  randomWordGenerator,
} from 'src/helpers/tournamentHelpers'
import { db } from 'src/lib/db'

export const tournament = ({ id }) => {
  return db.tournament.findUnique({
    where: { id },
  })
}

export const tournaments = () => {
  return db.tournament.findMany()
}

export const myTournaments = () => {
  let currentUser = context.currentUser

  return db.tournament.findMany({
    where: {
      AND: [
        {
          OR: [
            { ownerId: currentUser?.user?.id },
            { players: { some: { playerId: currentUser?.user?.id } } },
          ],
        },
        {
          OR: [
            {
              startDate: {
                gte: new Date(),
              },
            },
            {
              AND: [
                {
                  dateEnded: {
                    equals: null,
                  },
                },
                {
                  dateStarted: {
                    lte: new Date(),
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  })
}

export const upcomingTournaments = ({ input }) => {
  return db.tournament.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              startDate: {
                gte: new Date(),
              },
            },
            {
              dateEnded: {
                equals: null,
              },
            },
          ],
        },
      ],
    },
    orderBy: [
      {
        startDate: 'desc',
      },
      {
        createdAt: 'desc',
      },
    ],
  })
}

export const finishedTournaments = ({ input }) => {
  return db.tournament.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              dateEnded: {
                lte: new Date(),
              },
            },
          ],
        },
      ],
    },
    orderBy: {
      dateEnded: 'desc',
    },
  })
}

export const searchTournaments = async ({ input }) => {
  let earthsRadius = 6371

  let distanceQuery = `111.111 *
  DEGREES(ACOS(LEAST(1.0, COS(RADIANS("Tournament".lat))
       * COS(RADIANS(${input.lat}))
       * COS(RADIANS("Tournament".lng - ${input.lng}))
       + SIN(RADIANS("Tournament".lat))
       * SIN(RADIANS(${input.lat}))))) AS distance`

  let sqlQuery = `
    SELECT "Tournament".id, "Tournament"."name", "Tournament"."desc", "tournamentUrl", "city", "Tournament"."maxPlayers", "Tournament"."locationName", "Tournament".lat, "Tournament".lng, "dateStarted", "startDate", "dateEnded", "Tournament"."createdAt", "Tournament"."updatedAt", "street1", "street2",  "country", "state", "zip", "timerLeftInSeconds", "timerStatus", "Tournament".active,
    COUNT("PlayerTournamentScore"."tournamentId") AS "playerCount",
    ${distanceQuery}
    FROM "Tournament"
    LEFT JOIN "PlayerTournamentScore" ON "Tournament".id="PlayerTournamentScore"."tournamentId"
    WHERE "Tournament".active = true ${
      input.name
        ? `AND LOWER("Tournament".name) LIKE LOWER('%${input.name}%')`
        : ``
    }
    ${
      input.dateStart
        ? `AND "Tournament"."startDate" >= '${
            new Date(input.dateStart).toISOString().split('T')[0]
          }'`
        : ``
    }
    ${
      input.dateEnd
        ? `AND "Tournament"."startDate" <= '${
            new Date(input.dateEnd).toISOString().split('T')[0]
          }'`
        : ``
    }
    GROUP BY "Tournament".id
    ${
      input.openSpotsOnly
        ? `HAVING COUNT("PlayerTournamentScore"."tournamentId") < "Tournament"."maxPlayers"`
        : ``
    }
    ${
      input.lat && input.lng
        ? `ORDER BY acos(sin(${input.lat}) * sin("Tournament".lat) + cos(${input.lat}) * cos("Tournament".lat) * cos("Tournament".lng - (${input.lng}))) * ${earthsRadius} ASC;`
        : `;`
    }
  `

  const tournamentIds = await db.$queryRaw(sqlQuery)

  return tournamentIds
}

export const tournamentByUrl = ({ url }) => {
  return db.tournament.findUnique({
    where: { tournamentUrl: url },
    include: {
      players: {
        orderBy: {
          score: 'desc',
        },
        select: {
          score: true,
        },
      },
    },
  })
}

export const createTournament = async ({ input }) => {
  var newInput = { ...input }
  delete newInput.storeId
  let tournamentUrl = await generateTournamentUrl(input.name, db)
  let currentUser = context.currentUser
  var storeId = input.storeId

  if (storeId) {
    newInput['store'] = { connect: { id: storeId } }
  }

  return db.tournament.create({
    data: {
      ...newInput,
      tournamentUrl,
      owner: {
        connect: { id: currentUser.user.id },
      },
    },
  })
}

export const updateTournament = ({ id, input }) => {
  return db.tournament.update({
    data: { ...input, updatedAt: new Date() },
    where: { id },
  })
}

export const registerForTournament = async ({ id }) => {
  let currentUser = context.currentUser

  await db.playerTournamentScore.create({
    data: {
      player: {
        connect: { id: currentUser.user.id },
      },
      tournament: {
        connect: { id },
      },
      randomizer: randomWordGenerator(10),
    },
  })

  const player = await db.user.findUnique({
    where: { id: currentUser.user.id },
  })

  const tournament = await db.tournament.findUnique({
    where: { id },
  })

  let ownerEmail = ''
  if (tournament.storeId) {
    const store = await db.store.findUnique({
      where: {
        id: tournament.storeId,
      },
    })

    ownerEmail = store.email
  } else {
    const owner = await db.user.findUnique({
      where: {
        id: tournament.ownerId,
      },
    })

    ownerEmail = owner.email
  }

  let html = `${newPlayerRegistered({ tournament, player }).html}`
  sendEmail({
    to: ownerEmail,
    subject: `GEO: New Player Registered for: ${tournament.name}`,
    html,
    text: `New Player Registered for: ${tournament.name}`,
  })

  return 'Successfully Signed up for Tournament'
}

export const startTournament = async ({ id }) => {
  const tournament = await db.tournament.findUnique({ where: { id } })

  //Grab list of players and generate match ups
  const proposedMatches = await generateMatches({ roundNumber: 1, id, db })

  //Create new round, associate to all match ups
  const round = await db.round.create({
    data: {
      roundNumber: 1,
      tournament: {
        connect: {
          id,
        },
      },
    },
  })

  await createMatches({ proposedMatches, round, id })

  //Add tournament started date
  await db.tournament.update({
    data: {
      dateStarted: new Date(),
    },
    where: {
      id,
    },
  })

  //Return tournament
  return tournament
}

export const advanceRound = async ({
  id,
  roundNumber,
  startingTimerInSeconds,
  roundTimerLeftInSeconds,
}) => {
  const tournament = await db.tournament.findUnique({ where: { id } })

  //Grab list of players and generate match ups
  const proposedMatches = await generateMatches({ roundNumber, id, db })

  const lastRound = await db.round.findFirst({
    orderBy: { roundNumber: 'desc' },
  })

  await db.round.update({
    data: {
      startingTimerInSeconds,
      roundTimerLeftInSeconds,
    },
    where: {
      id: lastRound.id,
    },
  })

  const round = await db.round.create({
    data: {
      roundNumber,
      tournament: {
        connect: {
          id,
        },
      },
    },
  })

  await createMatches({ proposedMatches, round, id })

  //Add tournament started date
  await db.tournament.update({
    data: {
      updatedAt: new Date(),
    },
    where: {
      id,
    },
  })

  //Return tournament
  return tournament
}

export const reshuffleRound = async ({ id }) => {}

export const endTournament = async ({
  id,
  startingTimerInSeconds,
  roundTimerLeftInSeconds,
}) => {
  const tournament = await db.tournament.findUnique({ where: { id } })
  const players = await db.tournament.findUnique({ where: { id } }).players({
    orderBy: [
      { score: 'desc' },
      { wins: 'desc' },
      { byes: 'desc' },
      { draws: 'desc' },
      { losses: 'asc' },
    ],
  })

  const winners = [players[0]]
  players.map((player) => {
    if (
      player.score === players[0].score &&
      player.wins === players[0].wins &&
      player.draws === players[0].draws
    ) {
      winners.push(player)
    }
  })

  const lastRound = await db.round.findFirst({
    orderBy: { roundNumber: 'desc' },
  })

  await db.round.update({
    data: {
      startingTimerInSeconds,
      roundTimerLeftInSeconds,
    },
    where: {
      id: lastRound.id,
    },
  })

  //Put tournament end date and assign winner
  await db.tournament.update({
    data: {
      updatedAt: new Date(),
      dateEnded: new Date(),
    },
    where: {
      id,
    },
  })

  await winners.map(async (winner) => {
    await db.playerTournamentScore.update({
      data: {
        wonTournament: true,
      },
      where: {
        id: winner.id,
      },
    })
  })

  return tournament
}

export const cancelTournament = async ({ id }) => {
  const players = await db.tournament.findUnique({ where: { id } }).players({})

  //Update tournament correctly
  const tournament = await db.tournament.update({
    data: {
      active: false,
    },
    where: {
      id,
    },
  })

  //Send emails to all players
  players.forEach(async (player) => {
    let html = `${tournamentCancelledPlayer({ tournament, player }).html}`
    let playerAccount = await db.user({ where: { id: player.playerId } })

    sendEmail({
      to: playerAccount.email,
      subject: `GEO: Tournament ${tournament.name} has been cancelled`,
      html,
      text: `Tournament ${tournament.name} has been cancelled`,
    })
  })

  return tournament
}

export const deleteTournament = ({ id }) => {
  return db.tournament.delete({
    where: { id },
  })
}

export const addMatchScore = async ({ input }) => {
  const match = await db.match.findUnique({ where: { id: input.matchId } })

  try {
    await input.matches.map(async (playerMatch) => {
      await db.playerMatchScore.update({
        data: {
          score: playerMatch.score,
          wonMatch: playerMatch.result === 'WIN',
          updatedAt: new Date(),
        },
        where: {
          id: playerMatch.playerMatchScore,
        },
      })

      let playerTourneyScore = await db.playerTournamentScore.findFirst({
        where: {
          playerId: playerMatch.userId,
          tournamentId: match.tournamentId,
        },
      })

      let updateData = {}
      switch (playerMatch.result) {
        case 'WIN':
          updateData.wins = playerTourneyScore.wins + 1
          updateData.score = playerTourneyScore.score += 1
          break
        case 'TIED':
          updateData.draws = playerTourneyScore.draws + 1
          updateData.score = playerTourneyScore.score += 0.5
          break
        case 'LOSS':
          updateData.losses = playerTourneyScore.losses + 1
          break
      }

      await db.playerTournamentScore.update({
        data: {
          ...updateData,
          updatedAt: new Date(),
        },
        where: {
          id: playerTourneyScore.id,
        },
      })

      await db.match.update({
        data: {
          updatedAt: new Date(),
        },
        where: {
          id: input.matchId,
        },
      })
    })
  } catch (err) {
    console.log(err)
  }

  return match
}

export const updateTimer = async ({ input }) => {
  const {
    tournamentId: id,
    timerLeftInSeconds,
    timerStatus,
    startingTimerInSeconds,
  } = input

  return db.tournament.update({
    data: {
      timerLeftInSeconds,
      timerStatus,
      startingTimerInSeconds,
      timerLastUpdated: new Date(),
    },
    where: {
      id,
    },
  })
}

const createMatches = async ({ proposedMatches, id, round }) => {
  //Create all matches
  proposedMatches.forEach(async (proposedMatch) => {
    const match = await db.match.create({
      data: {
        tournament: {
          connect: {
            id,
          },
        },
        round: {
          connect: {
            id: round.id,
          },
        },
      },
    })

    proposedMatch.forEach(async (proposedPlayer) => {
      await db.playerMatchScore.create({
        data: {
          bye: proposedMatch.length === 1 ? true : false,
          match: {
            connect: {
              id: match.id,
            },
          },
          user: {
            connect: {
              id: proposedPlayer,
            },
          },
        },
      })

      if (proposedMatch.length === 1) {
        let playerTourneyScore = await db.playerTournamentScore.findFirst({
          where: {
            playerId: proposedPlayer,
            tournamentId: id,
          },
        })

        await db.playerTournamentScore.update({
          data: {
            byes: playerTourneyScore.byes + 1,
            score: playerTourneyScore.score + 1,
          },
          where: {
            id: playerTourneyScore.id,
          },
        })
      }
    })
  })
}

export const Tournament = {
  players: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).players({
      orderBy: [
        { score: 'desc' },
        { wins: 'desc' },
        { byes: 'desc' },
        { draws: 'desc' },
      ],
    }),
  round: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).round(),
  matches: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).matches(),
  winners: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).players({
      where: {
        wonTournament: true,
      },
    }),
  store: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).store(),
  owner: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).owner(),
}
