import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules) => {
  rules.add(requireAuth)
}

export const playerTournamentScores = () => {
  return db.playerTournamentScore.findMany()
}

export const playerLeaderboard = async ({
  nicknameSearch,
  skip = 0,
  take = 10,
}) => {
  let sqlQuery = `select ranked.*, count(*) OVER() AS full_count
                  FROM (
                   select "playerId", COUNT(*) as "totalTournamentsPlayed", SUM(wins) as wins, SUM(losses) as losses, SUM(draws) as draws, SUM(byes) as byes, SUM(score) as "totalPoints", SUM(score) + count(*) as "totalScore", RANK () OVER (
                      ORDER BY SUM(score) + count(*) DESC
                    ) rank, "User".nickname
                    FROM "PlayerTournamentScore"
                    LEFT JOIN "User" ON "PlayerTournamentScore"."playerId" =  "User"."id"
                    where "PlayerTournamentScore"."active" = true
                    group by "playerId", "User".nickname
                    order by SUM(score) + count(*) desc
                  ) AS ranked
                  ${
                    nicknameSearch
                      ? `WHERE LOWER("ranked".nickname) LIKE LOWER('%${nicknameSearch}%')`
                      : ``
                  }
                  limit ${take}
                  offset ${skip}
                  `

  const playerLeaderboard = await db.$queryRaw(sqlQuery)

  return {
    more: playerLeaderboard[0]?.full_count > take,
    totalCount: playerLeaderboard[0]?.full_count,
    leaderboard: playerLeaderboard,
  }
}

export const playerTournamentScore = ({ id }) => {
  return db.playerTournamentScore.findUnique({
    where: { id },
  })
}

export const createPlayerTournamentScore = ({ input }) => {
  return db.playerTournamentScore.create({
    data: input,
  })
}

export const updatePlayerTournamentScore = ({ id, input }) => {
  return db.playerTournamentScore.update({
    data: input,
    where: { id },
  })
}

export const deletePlayerTournamentScore = ({ id }) => {
  return db.playerTournamentScore.delete({
    where: { id },
  })
}

export const PlayerTournamentScore = {
  player: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.playerId } }),
  tournament: (_obj, { root }) =>
    db.playerTournamentScore
      .findUnique({ where: { id: root.id } })
      .tournament(),
}
