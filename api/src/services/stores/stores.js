import storeApprovedEO from 'src/emails/storeApprovedEO'
import { sendEmail } from 'src/helpers/sendEmail'
import { db } from 'src/lib/db'

export const stores = ({ searchTerm = '' }) => {
  return db.store.findMany({
    where: {
      OR: [
        {
          id: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          name: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          street1: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          country: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
      ],
    },
  })
}

export const store = ({ id }) => {
  return db.store.findUnique({
    where: { id },
  })
}

export const createStore = ({ input }) => {
  return db.store.create({
    data: input,
  })
}

export const updateStore = async ({ id, input }) => {
  let currentUser = context.currentUser
  let store = await db.store.findUnique({
    where: { id },
    include: { owner: true },
  })

  let owner = await db.user.findUnique({ where: { id: store.ownerId } })

  if (!store.approved && input.approved) {
    let newInput = { ...input }
    delete newInput.ownerId
    let store = await db.store.update({
      data: {
        ...newInput,
        approvedBy: {
          connect: {
            id: currentUser.user.id,
          },
        },
        approvedOn: new Date(),
      },
      where: { id },
    })

    let html = `${storeApprovedEO({ store }).html}`

    sendEmail({
      to: owner.email,
      subject: `GEO: Your Store, ${store.name}, has been Approved!`,
      html,
      text: `Your Store Has Been Approved!`,
    })

    return store
  }

  return db.store.update({
    data: input,
    where: { id },
  })
}

export const deleteStore = ({ id }) => {
  return db.store.delete({
    where: { id },
  })
}

export const Store = {
  tournaments: (_obj, { root }) =>
    db.store.findUnique({ where: { id: root.id } }).tournaments(),
  owner: (_obj, { root }) =>
    db.store.findUnique({ where: { id: root.id } }).owner(),
  approvedBy: (_obj, { root }) =>
    db.store.findUnique({ where: { id: root.id } }).approvedBy(),
}
