import newPlayerRegisteredEO from 'src/emails/newPlayerRegisteredEO'
import newPlayerRegistered from 'src/emails/newPlayerRegisteredEO'
import newPlayerRegisteredPlayer from 'src/emails/newPlayerRegisteredPlayer'
import tournamentCancelledEO from 'src/emails/tournamentCancelledEO'
import tournamentCancelledPlayer from 'src/emails/tournamentCancelledPlayer'
import tournamentEditedEO from 'src/emails/tournamentEditedEO'
import tournamentEditedPlayer from 'src/emails/tournamentEditedPlayer'
import { sendEmail } from 'src/helpers/sendEmail'
import {
  generateMatches,
  generateTournamentUrl,
} from 'src/helpers/tournamentHelpers'
import { db } from 'src/lib/db'
import * as Sentry from '@sentry/node'
import { isEqual } from 'date-fns'

export const tournament = ({ id }) => {
  return db.tournament.findUnique({
    where: { id },
  })
}

export const tournaments = ({ searchTerm, id }) => {
  try {
    return db.tournament.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
            },
          },
          {
            tournamentUrl: {
              contains: searchTerm,
            },
          },
          {
            locationName: {
              contains: searchTerm,
            },
          },
          {
            street1: {
              contains: searchTerm,
            },
          },
        ],
      },
    })
  } catch (error) {
    Sentry.captureException(error)
  }
}

export const myTournaments = ({}) => {
  try {
    let currentUser = context.currentUser
    if (currentUser) {
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
                  dateStarted: {
                    lte: new Date(),
                  },
                },
              ],
            },
            {
              dateEnded: {
                equals: null,
              },
            },
            {
              active: true,
            },
          ],
        },
      })
    }

    return []
  } catch (error) {
    Sentry.captureException(error)
  }
}

export const upcomingTournaments = ({ input, take = 6 }) => {
  try {
    return db.tournament.findMany({
      where: {
        AND: [
          {
            dateEnded: {
              equals: null,
            },
          },
          {
            startDate: {
              gte: new Date(),
            },
          },
          {
            active: true,
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
      take,
    })
  } catch (error) {
    Sentry.captureException(error)
  }
}

export const finishedTournaments = ({ input, take = 6 }) => {
  try {
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
          {
            active: true,
          },
        ],
      },
      orderBy: {
        dateEnded: 'desc',
      },
      take,
    })
  } catch (error) {
    Sentry.captureException(error)
  }
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
    COUNT("PlayerTournamentScore"."tournamentId") AS "playerCount", COUNT(*) OVER() AS full_count,
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
    ${input.openSpotsOnly ? `AND "Tournament"."dateEnded" IS NULL` : ``}
    GROUP BY "Tournament".id
    ${
      input.openSpotsOnly
        ? `HAVING COUNT("PlayerTournamentScore"."tournamentId") < "Tournament"."maxPlayers"`
        : ``
    }
    ${
      input.lat && input.lng
        ? `ORDER BY acos(sin(${input.lat}) * sin("Tournament".lat) + cos(${input.lat}) * cos("Tournament".lat) * cos("Tournament".lng - (${input.lng}))) * ${earthsRadius} ASC`
        : ``
    }
    LIMIT ${input.take}
    OFFSET ${input.skip};
  `

  try {
    const tournaments = await db.$queryRaw(sqlQuery)

    return {
      more: tournaments[0]?.full_count > input.take,
      totalCount: tournaments[0]?.full_count,
      tournaments,
    }
  } catch (error) {
    Sentry.captureException(error)
  }
}

export const tournamentByUrl = ({ url }) => {
  try {
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
  } catch (error) {
    Sentry.captureException(error)
  }
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

  try {
    return db.tournament.create({
      data: {
        ...newInput,
        tournamentUrl,
        owner: {
          connect: { id: currentUser.user.id },
        },
      },
    })
  } catch (error) {
    Sentry.captureException(error)
  }
}

export const updateTournament = async ({ id, input }) => {
  let newData = { ...input }

  if (newData.storeId === '') {
    delete newData.storeId
  }

  try {
    const prevTournament = await db.tournament.findUnique({
      where: { id },
    })

    const tournament = await db.tournament.update({
      data: { ...newData, updatedAt: new Date() },
      where: { id },
    })

    const owner = await db.tournament.findUnique({ where: { id } }).owner({})

    const players = await db.tournament
      .findUnique({ where: { id } })
      .players({ where: { active: true } })

    if (
      !isEqual(
        new Date(prevTournament.startDate),
        new Date(tournament.startDate)
      ) ||
      prevTournament.name !== tournament.name ||
      prevTournament.street1 !== tournament.street1 ||
      prevTournament.locationName !== tournament.locationName
    ) {
      //Send emails to all players
      await await Promise.all(
        players.map(async (player) => {
          let html = `${
            tournamentEditedPlayer({ tournament, player, prevTournament }).html
          }`
          let playerAccount = await db.user.findUnique({
            where: { id: player.playerId },
          })

          await sendEmail({
            to: playerAccount.email,
            subject: `GEO: Tournament ${tournament.name} has been updated`,
            html,
            text: `Tournament ${tournament.name} has been updated`,
          })
        })
      )

      let html = `${
        tournamentEditedEO({ tournament, owner, prevTournament }).html
      }`

      await sendEmail({
        to: owner.email,
        subject: `GEO: Tournament ${tournament.name} has been updated`,
        html,
        text: `Tournament ${tournament.name} has been updated`,
      })

      html = `${
        tournamentEditedEO({
          tournament,
          owner,
          prevTournament,
          adminEmail: true,
        }).html
      }`

      await sendEmail({
        to: process.env.ADMIN_EMAILS,
        subject: `GEO: Tournament ${tournament.name} has been updated`,
        html,
        text: `Tournament ${tournament.name} has been updated`,
      })
    }

    return tournament
  } catch (error) {
    Sentry.captureException(error)
  }
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

  let html = `${newPlayerRegisteredEO({ tournament, player }).html}`
  await sendEmail({
    to: ownerEmail,
    subject: `GEO: New Player Registered for: ${tournament.name}`,
    html,
    text: `New Player Registered for: ${tournament.name}`,
  })

  html = `${newPlayerRegisteredPlayer({ tournament, player }).html}`
  await sendEmail({
    to: player.email,
    subject: `GEO: Thanks for Registering for: ${tournament.name}`,
    html,
    text: `Thanks for Registering for:: ${tournament.name}`,
  })

  return 'Successfully Signed up for Tournament'
}

export const addPlayer = async ({ id, input }) => {
  const tournament = await db.tournament.findUnique({ where: { id } })

  await db.playerTournamentScore.create({
    data: {
      ...input,
      tournament: {
        connect: {
          id,
        },
      },
    },
  })

  return tournament
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

export const advanceRound = async ({ id, roundNumber }) => {
  const tournament = await db.tournament.findUnique({ where: { id } })

  //Grab list of players and generate match ups
  const proposedMatches = await generateMatches({ roundNumber, id, db })

  const lastRound = await db.round.findFirst({
    where: { tournamentId: id },
    orderBy: { roundNumber: 'desc' },
  })

  let startingTimerInSeconds = tournament.startingTimerInSeconds
  let roundTimerLeftInSeconds = 0

  let timeElapsed = 0
  if (tournament.timerStatus === 'INPROGRESS') {
    timeElapsed = Math.floor(
      (new Date() - new Date(tournament.timerLastUpdated)) / 1000
    )
  }

  if (timeElapsed > tournament.timerLeftInSeconds) {
    timeElapsed = tournament.timerLeftInSeconds
  }

  roundTimerLeftInSeconds = tournament.timerLeftInSeconds - timeElapsed

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
      startingTimerInSeconds: null,
      timerLeftInSeconds: null,
      timerStatus: null,
      timerLastUpdated: null,
    },
    where: {
      id,
    },
  })

  //Return tournament
  return tournament
}

export const reshuffleRound = async ({ id }) => {}

export const endTournament = async ({ id }) => {
  const tournament = await db.tournament.findUnique({ where: { id } })
  const players = await db.tournament.findUnique({ where: { id } }).players({
    where: { active: true },
    orderBy: [
      { score: 'desc' },
      { wins: 'desc' },
      { byes: 'desc' },
      { draws: 'desc' },
      { losses: 'asc' },
    ],
  })

  const winners = [players[0]]
  await Promise.all(
    players.map((player) => {
      if (
        player.score === players[0].score &&
        player.wins === players[0].wins &&
        player.draws === players[0].draws
      ) {
        winners.push(player)
      }
    })
  )

  const lastRound = await db.round.findFirst({
    where: { tournamentId: id },
    orderBy: { roundNumber: 'desc' },
  })

  let startingTimerInSeconds = tournament.startingTimerInSeconds
  let roundTimerLeftInSeconds = 0

  let timeElapsed = 0
  if (tournament.timerStatus === 'INPROGRESS') {
    timeElapsed = Math.floor(
      (new Date() - new Date(tournament.timerLastUpdated)) / 1000
    )
  }

  if (timeElapsed > tournament.timerLeftInSeconds) {
    timeElapsed = tournament.timerLeftInSeconds
  }

  roundTimerLeftInSeconds = tournament.timerLeftInSeconds - timeElapsed

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
      startingTimerInSeconds: null,
      timerLeftInSeconds: null,
      timerStatus: null,
      timerLastUpdated: null,
    },
    where: {
      id,
    },
  })

  await Promise.all(
    winners.map(async (winner) => {
      await db.playerTournamentScore.update({
        data: {
          wonTournament: true,
        },
        where: {
          id: winner.id,
        },
      })
    })
  )

  return tournament
}

export const cancelTournament = async ({ id }) => {
  const players = await db.tournament
    .findUnique({ where: { id } })
    .players({ where: { active: true } })

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
  await Promise.all(
    players.map(async (player) => {
      let html = `${tournamentCancelledPlayer({ tournament, player }).html}`
      let playerAccount = await db.user.findUnique({
        where: { id: player.playerId },
      })

      await sendEmail({
        to: playerAccount.email,
        subject: `GEO: Tournament ${tournament.name} has been cancelled`,
        html,
        text: `Tournament ${tournament.name} has been cancelled`,
      })
    })
  )

  const owner = await db.tournament.findUnique({ where: { id } }).owner({})
  let html = `${tournamentCancelledEO({ tournament, owner }).html}`
  await sendEmail({
    to: owner.email,
    subject: `GEO: Tournament ${tournament.name} has been cancelled`,
    html,
    text: `Tournament ${tournament.name} has been cancelled`,
  })

  html = `${
    tournamentCancelledEO({ tournament, owner, adminEmail: true }).html
  }`
  await sendEmail({
    to: owner.email,
    subject: `GEO: Tournament ${tournament.name} has been cancelled`,
    html,
    text: `Tournament ${tournament.name} has been cancelled`,
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
    await Promise.all(
      input.matches.map(async (playerMatch) => {
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
    )
  } catch (err) {
    Sentry.captureException(err)
    return err
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

export const removePlayer = async ({ id }) => {
  //TODO: Check if admin or owner

  try {
    await db.playerTournamentScore.update({
      data: {
        active: false,
      },
      where: {
        id,
      },
    })

    return 'SUCCESS'
  } catch (err) {
    Sentry.captureException(err)
    return err
  }
}

export const leaveTournament = async ({ id }) => {
  //TODO: Check if in tournament

  let currentUser = context.currentUser

  try {
    const playerTournamentScore = await db.playerTournamentScore.findFirst({
      where: {
        tournamentId: id,
        playerId: currentUser?.user?.id,
      },
    })

    await db.playerTournamentScore.update({
      data: {
        active: false,
      },
      where: {
        id: playerTournamentScore?.id,
      },
    })

    return 'SUCCESS'
  } catch (err) {
    Sentry.captureException(err)
    return err
  }
}

export const searchNonPlayers = async ({ id, searchTerm }) => {
  let currentPlayers = await db.playerTournamentScore.findMany({
    where: { tournamentId: id },
  })

  let playerIds = []

  currentPlayers.forEach((player) => {
    if (player.playerId) playerIds.push(player.playerId)
  })

  let playerUserRole = await db.userRole.findUnique({
    where: { name: 'PLAYER' },
  })

  let nonSearchPlayers = await db.user.findMany({
    where: {
      AND: [
        {
          nickname: {
            contains: searchTerm,
          },
        },
        {
          UserUserRole: {
            some: {
              userRoleId: { equals: playerUserRole.id },
            },
          },
        },
        {
          id: {
            notIn: playerIds,
          },
        },
      ],
    },
    take: 20,
  })

  console.log(nonSearchPlayers)

  return nonSearchPlayers
}

const createMatches = async ({ proposedMatches, id, round }) => {
  //Create all matches
  await Promise.all(
    proposedMatches.map(async (proposedMatch) => {
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

      await Promise.all(
        proposedMatch.map(async (proposedPlayer) => {
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
      )
    })
  )
}

export const Tournament = {
  owner: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).owner(),
  store: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).store(),
  user: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).user(),
  matches: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).matches(),
  players: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).players({
      orderBy: [
        { active: 'desc' },
        { score: 'desc' },
        { wins: 'desc' },
        { byes: 'desc' },
        { draws: 'desc' },
      ],
    }),
  winners: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).players({
      where: {
        wonTournament: true,
      },
    }),
  round: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).round(),
}
