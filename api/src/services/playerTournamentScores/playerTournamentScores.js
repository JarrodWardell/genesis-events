import { db } from 'src/lib/db'

export const playerTournamentScores = () => {
  return db.playerTournamentScore.findMany()
}

export const PlayerTournamentScore = {
  player: (_obj, { root }) =>
    db.playerTournamentScore.findUnique({ where: { id: root.id } }).player(),
  tournament: (_obj, { root }) =>
    db.playerTournamentScore
      .findUnique({ where: { id: root.id } })
      .tournament(),
}
