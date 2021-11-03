import { Prisma } from '@prisma/client'
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

export const tournaments = ({
  searchTerm,
  orderBy = { orderByKey: 'id', orderByDirection: 'desc' },
  id,
}) => {
  try {
    return db.tournament.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            tournamentUrl: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            locationName: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            street1: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: {
        [orderBy.orderByKey]: orderBy.orderByDirection,
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

export const currentTournaments = ({ input = {}, take = 6 }) => {
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
            dateStarted: {
              //Get any tournament that started less than 24 hours ago
              gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
            },
          },
          {
            active: true,
          },
          {
            country: {
              contains: input.country,
              mode: 'insensitive',
            },
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

export const upcomingTournaments = ({ input = {}, take = 6 }) => {
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
          {
            OR: [
              {
                country: {
                  contains: input.country,
                  mode: 'insensitive',
                },
              },
              {
                country: {
                  equals: null,
                },
              },
            ],
          },
        ],
      },
      orderBy: [
        {
          startDate: 'asc',
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

export const finishedTournaments = ({ input = {}, take = 6 }) => {
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

  let distanceQuery = Prisma.sql`111.111 *
  DEGREES(ACOS(LEAST(1.0, COS(RADIANS("Tournament".lat))
       * COS(RADIANS(${input.lat}))
       * COS(RADIANS("Tournament".lng - ${input.lng}))
       + SIN(RADIANS("Tournament".lat))
       * SIN(RADIANS(${input.lat}))))) AS distance`

  let sqlQuery = Prisma.sql`
    SELECT "Tournament".id, "Tournament"."name", "Tournament"."desc", "tournamentUrl", "Tournament"."city", "Tournament"."maxPlayers", "storeId", "Tournament"."locationName", "Tournament".lat, "Tournament".lng, "dateStarted", "startDate", "dateEnded", "Tournament"."createdAt", "Tournament"."updatedAt", "Tournament"."street1", "Tournament"."street2",  "Tournament"."country", "Tournament"."state", "Tournament"."zip", "timerLeftInSeconds", "timerStatus", "Tournament".active,
    COUNT("PlayerTournamentScore"."tournamentId") AS "playerCount", COUNT(*) OVER() AS full_count,
    ${distanceQuery}
    FROM "Tournament"
    LEFT JOIN "PlayerTournamentScore" ON "Tournament".id="PlayerTournamentScore"."tournamentId"
    LEFT JOIN "Store" ON "Tournament"."storeId"="Store".id
    WHERE "Tournament".active = true ${
      input.name
        ? Prisma.sql`AND LOWER("Tournament".name) LIKE LOWER(${input.name})`
        : Prisma.sql``
    }
    ${
      input.type && input.type !== 'ALL'
        ? Prisma.sql`AND LOWER("Tournament".type) LIKE LOWER(${input.type})`
        : Prisma.sql``
    }
    ${
      input.store
        ? Prisma.sql`AND LOWER("Store".name) LIKE LOWER(${input.store})`
        : Prisma.sql``
    }
    ${
      input.dateStart
        ? Prisma.sql`AND "Tournament"."startDate" >= ${new Date(
            input.dateStart
          )}`
        : Prisma.sql``
    }
    ${
      input.dateEnd
        ? Prisma.sql`AND "Tournament"."startDate" <= ${new Date(input.dateEnd)}`
        : Prisma.sql``
    }
    ${
      input.finishedTournaments
        ? Prisma.sql`AND "Tournament"."dateEnded" IS NOT NULL`
        : Prisma.sql`AND "Tournament"."dateEnded" IS NULL`
    }
    GROUP BY "Tournament".id
    ${
      input.openSpotsOnly
        ? Prisma.sql`HAVING COUNT("PlayerTournamentScore"."tournamentId") < "Tournament"."maxPlayers"`
        : Prisma.sql``
    }
    ${
      input.lat && input.lng
        ? Prisma.sql`ORDER BY distance ASC`
        : Prisma.sql`ORDER BY "Tournament"."startDate" ASC`
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
    console.log(error)
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

  const tournament = await db.tournament.findUnique({
    where: { id },
  })

  if (!tournament.publicRegistration) {
    throw new Error(
      'Registration can only be made by admins for this tournament. Please contact the organizer.'
    )
  }

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
  if (input.playerId) {
    let playerId = input.playerId
    let newInput = { ...input }
    delete newInput.playerId

    await db.playerTournamentScore.create({
      data: {
        ...newInput,
        tournament: {
          connect: {
            id,
          },
        },
        player: {
          connect: {
            id: playerId,
          },
        },
      },
    })
  } else {
    let newInput = { ...input }
    delete newInput.playerId

    await db.playerTournamentScore.create({
      data: {
        ...newInput,
        tournament: {
          connect: {
            id,
          },
        },
      },
    })
  }

  return tournament
}

export const startTournament = async ({ id }) => {
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

  //Return tournament
  return db.tournament.update({
    data: {
      dateStarted: new Date(),
      startingTimerInSeconds: 3600,
      timerLeftInSeconds: 3600,
      timerStatus: 'INPROGRESS',
      timerLastUpdated: new Date(),
    },
    where: {
      id,
    },
  })
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
      startingTimerInSeconds: 3600,
      timerLeftInSeconds: 3600,
      timerStatus: 'INPROGRESS',
      timerLastUpdated: new Date(),
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
  const tournament = await db.tournament.findUnique({
    where: { id: match.tournamentId },
  })

  try {
    await Promise.all(
      input.matches.map(async (playerMatch) => {
        await addPlayerMatchScore({ playerMatch, input, match })
      })
    )
  } catch (err) {
    Sentry.captureException(err)
    return err
  }

  return tournament
}

export const updateMatchScore = async ({ input }) => {
  const match = await db.match.findUnique({ where: { id: input.matchId } })
  const tournament = await db.tournament.findUnique({
    where: { id: match.tournamentId },
  })

  try {
    await updatePlayerMatchScore({ match })

    await Promise.all(
      input.matches.map(async (playerMatch) => {
        await addPlayerMatchScore({ playerMatch, input, match })
      })
    )
  } catch (err) {
    Sentry.captureException(err)
    return err
  }

  return tournament
}

// Add scores, update playerTournamentScore
const addPlayerMatchScore = async ({ playerMatch, input, match }) => {
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

  let playerTournamentWhere = {
    tournamentId: match.tournamentId,
  }

  if (playerMatch.userId) {
    playerTournamentWhere.playerId = playerMatch.userId
  } else if (playerMatch.playerName) {
    playerTournamentWhere.playerName = playerMatch.playerName
  }

  let playerTourneyScore = await db.playerTournamentScore.findFirst({
    where: {
      ...playerTournamentWhere,
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
}

const updatePlayerMatchScore = async ({ match }) => {
  //Check if previous match was a win, draw, or loss, then update scores appropriately
  let scores = {}

  let matches = await db.playerMatchScore.findMany({
    where: { matchId: match.id },
  })

  matches.forEach((playerMatch) => {
    scores[playerMatch.userId || playerMatch.playerName] = {
      prevScore: playerMatch.score,
      ...playerMatch,
    }
  })

  let [player1, player2] = Object.keys(scores)

  let updateDataPlayer1 = {}
  let player1TourneyWhere = scores[player1].userId
    ? { playerId: scores[player1].userId }
    : { playerName: scores[player1].playerName }

  let player1TourneyScore = await db.playerTournamentScore.findFirst({
    where: {
      tournamentId: match.tournamentId,
      ...player1TourneyWhere,
    },
  })

  let updateDataPlayer2 = {}
  let player2TourneyWhere = scores[player2].userId
    ? { playerId: scores[player2].userId }
    : { playerName: scores[player2].playerName }

  let player2TourneyScore = await db.playerTournamentScore.findFirst({
    where: {
      tournamentId: match.tournamentId,
      ...player2TourneyWhere,
    },
  })

  //Return scores to previous values based on whether they won or loss
  if (scores[player1].prevScore > scores[player2].prevScore) {
    //Player1 won
    updateDataPlayer1.wins = player1TourneyScore.wins - 1
    updateDataPlayer1.score = player1TourneyScore.score -= 1
    updateDataPlayer2.losses = player2TourneyScore.losses -= 1
  } else if (scores[player1].prevScore < scores[player2].prevScore) {
    //Player2 won
    updateDataPlayer2.wins = player2TourneyScore.wins - 1
    updateDataPlayer2.score = player2TourneyScore.score -= 1
    updateDataPlayer1.losses = player1TourneyScore.losses -= 1
  } else {
    //drew
    updateDataPlayer1.draws = player1TourneyScore.draws - 1
    updateDataPlayer1.score = player1TourneyScore.score -= 0.5
    updateDataPlayer2.draws = player2TourneyScore.draws - 1
    updateDataPlayer2.score = player2TourneyScore.score -= 0.5
  }

  await db.playerTournamentScore.update({
    data: {
      ...updateDataPlayer1,
      updatedAt: new Date(),
    },
    where: {
      id: player1TourneyScore.id,
    },
  })

  await db.playerTournamentScore.update({
    data: {
      ...updateDataPlayer2,
      updatedAt: new Date(),
    },
    where: {
      id: player2TourneyScore.id,
    },
  })
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

export const searchNonPlayers = async ({ id, searchTerm, take = 20 }) => {
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
            mode: 'insensitive',
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
    take,
  })

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
          let player = await db.playerTournamentScore.findUnique({
            where: { id: proposedPlayer },
            include: { player: true },
          })

          let playerMatchScore = {
            data: {
              bye: proposedMatch.length === 1 ? true : false,
              playerName: player.playerName || player.player.nickname,
              match: {
                connect: {
                  id: match.id,
                },
              },
            },
          }

          if (player.playerId) {
            playerMatchScore.data.user = {
              connect: {
                id: player.playerId,
              },
            }
          }

          await db.playerMatchScore.create({
            ...playerMatchScore,
          })

          if (proposedMatch.length === 1) {
            let playerTourneyScore = await db.playerTournamentScore.findFirst({
              where: {
                id: proposedPlayer,
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
