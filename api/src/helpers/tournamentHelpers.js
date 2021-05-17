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
  const tournament = await db.tournament.findUnique({ where: { id } })
  const players = await db.tournament.findUnique({ where: { id } }).players()

  let playerList = players.map((player) => player.playerId)
  let playersNotGivenMatches = players.map((player) => player.playerId)
  let generatedMatches = []

  if (roundNumber > 1) {
    players.map((player) => {
      let playerDict = {}
      playerDict[player.playerId] = []
    })

    const matches = await db.tournament.findUnique({ where: { id } }).matches()

    //Go through all previous matches, find which players played which and add to the player dictionary
    matches.map(async (match) => {})
  } else {
    playerList.forEach((player) => {
      let match = []
      if (playersNotGivenMatches.length > 1) {
        let playerIndex = playersNotGivenMatches.indexOf(player)
        if (playerIndex != -1) {
          playersNotGivenMatches.splice(playerIndex, 1)
          match.push(player)
          let otherPlayerIndex = Math.floor(
            Math.random() * playersNotGivenMatches.length
          )
          let otherPlayer = playersNotGivenMatches[otherPlayerIndex]
          match.push(otherPlayer)
          playersNotGivenMatches.splice(otherPlayerIndex, 1)
          generatedMatches.push(match)
        }
      } else if (playersNotGivenMatches.length === 1) {
        match.push(player)
        generatedMatches.push(match)
      }
    })
  }

  console.log(generatedMatches)

  return generatedMatches
}
