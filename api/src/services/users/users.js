import newStorePending from 'src/emails/newStorePending'
import { sendEmail } from 'src/helpers/sendEmail'
import { db } from 'src/lib/db'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = async ({ input, storeInput }) => {
  if (input.role !== 'EO' && input.role !== 'PLAYER')
    throw Error('Incorrect User Role')
  var role = await db.userRole.findFirst({ where: { name: input.role } })
  var currentUser = context.currentUser

  var provider = await db.provider.findUnique({
    where: { uid: currentUser.uid },
  })

  var newData = { ...input }
  delete newData.role

  const user = await db.user.create({
    data: {
      ...newData,
      providers: { connect: [{ id: provider.id }] },
    },
  })

  await db.userUserRole.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      userRole: {
        connect: {
          id: role.id,
        },
      },
    },
  })

  //Create store
  if (storeInput) {
    let store = await db.store.create({
      data: {
        ...storeInput,
        owner: { connect: { id: user.id } },
      },
    })

    let html = `${newStorePending({ store }).html}`
    sendEmail({
      to: process.env.ADMIN_EMAILS,
      subject: `GEO: New Pending Store: ${store.name}`,
      html,
      text: `New Pending Store: ${store.name}`,
    })
  }

  return user
}

export const checkNickname = async ({ nickname }) => {
  let numUsers = await db.user.count({ where: { nickname } })
  return numUsers > 0 ? false : true
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
