export const randomWordGenerator = (length = 8) => {
  var result = []
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)))
  }
  return result.join('')
}

export const generateTournamentUrl = async (tournamentName, db) => {
  //Replace spaces in name with dashes
  let name = tournamentName.replaceAll(/[\W_]+/g, ' ')
  let url = name.trim().replaceAll(' ', '-')

  //Check if any other tournaments exist in the database with that URL
  let tournaments = await db.tournament.findMany({
    where: {
      OR: [{ tournamentUrl: url }, { tournamentUrl: { contains: `${url}-` } }],
    },
  })

  //Add a number to the end of the tournament name if it has a duplicate
  if (tournaments.length > 0) {
    url = url + `-${tournaments.length}`
  }

  //Return unique URL
  return url
}

export const generateMatches = async ({ roundNumber = 1, db, id }) => {
  //Given a tournament, generate the matches for the round
  const players = await db.tournament
    .findUnique({ where: { id } })
    .players({ where: { active: true } })
  let playersNotGivenMatches = players.map((player) => player.playerId)
  let playersGivenMatches = []
  let playerScores = {}

  let generatedMatches = []
  let scoreObj = {}
  let playersPlayed = {}

  //Organize each user into a score differential
  players.forEach((player) => {
    let scoreDiff = player.wins - player.losses + 0.5 * player.draws
    if (scoreDiff in scoreObj) {
      scoreObj[scoreDiff].push(player.playerId)
    } else {
      scoreObj[scoreDiff] = [player.playerId]
    }
    playerScores[player.playerId] = scoreDiff
  })

  if (roundNumber > 1) {
    const matches = await db.tournament
      .findUnique({ where: { id } })
      .matches({ where: { active: true }, include: { players: true } })

    //Go through all previous matches, find which players played which and add to the player dictionary
    matches.forEach((match) => {
      let player1 = match.players[0].userId
      if (!(player1 in playersPlayed)) {
        playersPlayed[player1] = []
      }

      if (match.players.length > 1) {
        let player2 = match.players[1].userId

        if (!(player2 in playersPlayed)) {
          playersPlayed[player2] = []
        }

        playersPlayed[player1] = [...playersPlayed[player1], player2]
        playersPlayed[player2] = [...playersPlayed[player2], player1]
      }
    })
  }

  //Sort the score differentials
  let scoreObjDiff = Object.keys(scoreObj)
  scoreObjDiff.sort((a, b) => parseInt(a) - parseInt(b)).reverse()

  //Join playerList into playersWithByes and playersWithoutBytes (randomized)
  let playersWithByes = players.filter((player) => player.byes > 0)
  let playersWithoutByes = randomizedArray(
    players.filter((player) => player.byes === 0)
  )
  let playerList = [...playersWithByes, ...playersWithoutByes].map(
    (player) => player.playerId
  )

  playerList.forEach((player) => {
    if (playersNotGivenMatches.indexOf(player) !== -1) {
      let match = []
      let scoreDifToCheck = playerScores[player]

      //Players to avoid include players NOT in the same differential as current player && players they have played before

      let playersToAvoid = []

      scoreObjDiff.forEach((key) => {
        //Players to avoid include players NOT with the same differential
        if (parseInt(scoreDifToCheck) !== parseInt(key)) {
          playersToAvoid = [...playersToAvoid, ...scoreObj[key]]
        }
      })

      console.log('Score obj diff', scoreObj)
      console.log('Score dif to check', scoreDifToCheck)

      let preferredPlayers = scoreObj[scoreDifToCheck]

      console.log(preferredPlayers)

      //Players that player cannot play against include players who have been given matches
      playersGivenMatches.push(player)

      //Setup match for player (even if alone)
      match.push(player)
      playersNotGivenMatches.splice(playersNotGivenMatches.indexOf(player), 1)
      let playersProhibited = [...playersGivenMatches]

      console.log('Player', player)
      let opponent = findOpponent({
        preferredPlayers,
        playersNotGivenMatches,
        playersToAvoid,
        playersProhibited,
        playersPlayedAgainst:
          player in playersPlayed ? playersPlayed[player] : [],
      })

      if (opponent) {
        match.push(opponent)
        playersGivenMatches.push(opponent)
        playersNotGivenMatches.splice(
          playersNotGivenMatches.indexOf(opponent),
          1
        )
      }

      generatedMatches.push(match)
    }
  })

  return generatedMatches
}

export const calcNumRounds = (numPlayers, power = 1) => {
  if (2 ** power >= numPlayers) {
    return power
  } else {
    return calcNumRounds(numPlayers, power + 1)
  }
}

const randomizedArray = (arr) =>
  arr
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)

const findOpponent = ({
  preferredPlayers = [],
  playersNotGivenMatches = [],
  playersToAvoid = [],
  playersProhibited = [],
  playersPlayedAgainst = [],
}) => {
  let chosenOpponent = null

  //We will go through the playersNotGivenMatches and try to find a player that is not in the playersProhibited array and playersToAvoid array
  if (playersNotGivenMatches.length > 0) {
    //If player is in preferred list and not prohibited or to avoid, match them
    playersNotGivenMatches.forEach((possOpp) => {
      if (
        preferredPlayers.indexOf(possOpp) !== -1 &&
        playersProhibited.indexOf(possOpp) == -1 &&
        playersToAvoid.indexOf(possOpp) == -1 &&
        !chosenOpponent
      ) {
        chosenOpponent = possOpp
      }
    })

    if (!chosenOpponent) {
      playersNotGivenMatches.forEach((possOpp) => {
        if (
          playersProhibited.indexOf(possOpp) == -1 &&
          playersToAvoid.indexOf(possOpp) == -1 &&
          playersPlayedAgainst.indexOf(possOpp) === -1 &&
          !chosenOpponent
        ) {
          chosenOpponent = possOpp
        }
      })
    }

    //If none is found, pick the top players from playersToAvoid that is not in playersProhibited AND  not in players played against
    if (!chosenOpponent) {
      playersNotGivenMatches.forEach((possOpp) => {
        if (
          playersProhibited.indexOf(possOpp) == -1 &&
          playersPlayedAgainst.indexOf(possOpp) === -1 &&
          !chosenOpponent
        ) {
          chosenOpponent = possOpp
        }
      })
    }

    //If  still no opponent found, just pick any player that is not prohibited
    if (!chosenOpponent) {
      playersNotGivenMatches.forEach((possOpp) => {
        if (playersProhibited.indexOf(possOpp) == -1 && !chosenOpponent) {
          chosenOpponent = possOpp
        }
      })
    }
  }

  //Return ChosenOpponent
  return chosenOpponent
}
