import newPlayerRegistered from 'src/emails/newPlayerRegistered'
import { sendEmail } from 'src/helpers/sendEmail'
import {
  generateMatches,
  generateTournamentUrl,
  randomWordGenerator,
} from 'src/helpers/tournamentHelpers'
import { db } from 'src/lib/db'
import { format } from 'date-fns'

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
          startDate: {
            gte: new Date().toISOString(),
          },
        },
      ],
    },
  })
}

export const tournament = ({ id }) => {
  return db.tournament.findUnique({
    where: { id },
  })
}

export const tournamentByUrl = ({ url }) => {
  return db.tournament.findUnique({
    where: { tournamentUrl: url },
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
    data: input,
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
    })
  })

  //Add tournament started date
  console.log(format(new Date(), 'yyyy-MM-dd HH:mm:ss'))
  db.tournament.update({
    data: {
      dateStarted: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    },
    where: {
      id,
    },
  })

  //Return tournament
  return tournament
}

export const advanceRound = async ({ id }) => {}

export const reshuffleRound = async ({ id }) => {}

export const endTournament = async ({ id }) => {}

export const deleteTournament = ({ id }) => {
  return db.tournament.delete({
    where: { id },
  })
}

export const Tournament = {
  players: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).players(),
  round: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).round(),
  matches: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).matches(),
  winner: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).winner(),
  store: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).store(),
  owner: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).owner(),
  User: (_obj, { root }) =>
    db.tournament.findUnique({ where: { id: root.id } }).User(),
}
