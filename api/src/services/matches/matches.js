import { db } from 'src/lib/db'

export const matches = () => {
  return db.match.findMany()
}

export const Match = {
  players: (_obj, { root }) =>
    db.match.findUnique({ where: { id: root.id } }).players(),
  tournament: (_obj, { root }) =>
    db.match.findUnique({ where: { id: root.id } }).tournament(),
  round: (_obj, { root }) =>
    db.match.findUnique({ where: { id: root.id } }).round(),
}
