import { db } from 'src/lib/db'

export const playerLeaderboard = async ({ nicknameSearch, skip, take }) => {
  let playerSums = await db.playerTournamentScore.groupBy({
    where: {
      tournament: {
        is: {
          dateEnded: {
            lte: new Date(),
          },
        },
      },
    },
    by: ['playerId'],
    sum: {
      score: true,
    },
    count: {
      score: true,
    },
    orderBy: {
      _sum: {
        score: 'desc',
      },
    },
  })

  let scores = {}

  playerSums.map((player) => {
    scores[player.playerId] = player
  })

  let players = await db.playerTournamentScore.findMany({
    where: {
      playerId: {
        in: Object.keys(scores),
      },
    },
    include: {
      player: true,
    },
  })

  let playersCounted = {}
  let playersWithScore = players.reduce((result, player) => {
    if (!(player.playerId in playersCounted)) {
      let playerScore = scores[player.playerId]
      playersCounted[player.playerId] = true
      result.push({
        ...player,
        totalScore: playerScore.sum.score + playerScore.count.score,
        totalPoints: playerScore.sum.score,
        totalTournamentsPlayed: playerScore.count.score,
      })
    }

    return result
  }, [])

  playersWithScore.sort((a, b) => b.totalScore - a.totalScore)
  playersWithScore = playersWithScore.map((player, index) => {
    return { ...player, rank: index + 1 }
  })

  if (nicknameSearch) {
    playersWithScore = playersWithScore.filter((player) => {
      return player.player.nickname.includes(nicknameSearch)
    })
  }

  let maxTake =
    take + skip > playersWithScore.length
      ? playersWithScore.length
      : take + skip

  let maxSkip = skip > playersWithScore.length ? playersWithScore.length : skip
  playersWithScore = playersWithScore.slice(maxSkip, maxTake)

  return playersWithScore
}

export const PlayerTournamentScore = {
  player: (_obj, { root }) =>
    db.playerTournamentScore.findUnique({ where: { id: root.id } }).player(),
  tournament: (_obj, { root }) =>
    db.playerTournamentScore
      .findUnique({ where: { id: root.id } })
      .tournament(),
}
