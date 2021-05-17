import { db } from 'src/lib/db'

export const rounds = () => {
  return db.round.findMany()
}

export const Round = {
  matches: (_obj, { root }) =>
    db.round.findUnique({ where: { id: root.id } }).matches(),
  tournament: (_obj, { root }) =>
    db.round.findUnique({ where: { id: root.id } }).tournament(),
}
