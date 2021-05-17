import { db } from 'src/lib/db'

export const playerMatchScores = () => {
  return db.playerMatchScore.findMany()
}

export const PlayerMatchScore = {
  user: (_obj, { root }) =>
    db.playerMatchScore.findUnique({ where: { id: root.id } }).user(),
  match: (_obj, { root }) =>
    db.playerMatchScore.findUnique({ where: { id: root.id } }).match(),
}
