import { db } from 'src/lib/db'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = async ({ input }) => {
  var role = await db.userRole.findFirst({ where: { name: input.role } })
  var currentUser = context.currentUser
  var provider = await db.provider.findUnique({
    where: { uid: currentUser.uid },
  })
  var newData = { ...input }
  delete newData.role
  return db.user.create({
    data: {
      ...newData,
      userRoles: { connect: [{ id: role.id }] },
      providers: { connect: [{ id: provider.id }] },
    },
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  userRoles: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).userRoles(),
  providers: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).providers(),
}
