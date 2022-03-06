import storeApprovedEO from 'src/emails/storeApprovedEO'
import { sendEmail } from 'src/helpers/sendEmail'
import { db } from 'src/lib/db'
import { Prisma } from '@prisma/client'

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

// Given a latitude and longitude, return the stores with the distance
export const storeLocator = async ({ input }) => {
  let distanceQuery = Prisma.sql`111.111 *
  DEGREES(ACOS(LEAST(1.0, COS(RADIANS("Store".lat))
       * COS(RADIANS(${input.lat}))
       * COS(RADIANS("Store".lng - ${input.lng}))
       + SIN(RADIANS("Store".lat))
       * SIN(RADIANS(${input.lat}))))) AS distance`

  let sqlQuery = Prisma.sql`
       SELECT *,
       COUNT(*) OVER() AS full_count,
       ${distanceQuery}
       FROM "Store"
       WHERE "Store".active = true
       AND "Store".approved = true
       GROUP BY "Store".id
       ${
         input.lat && input.lng
           ? Prisma.sql`ORDER BY distance ASC`
           : Prisma.sql`ORDER BY "Store"."name" ASC`
       }
       LIMIT ${input.take}
       OFFSET ${input.skip};
     `

  try {
    const stores = await db.$queryRaw(sqlQuery)

    return {
      more: stores[0]?.full_count > input.take,
      totalCount: stores[0]?.full_count,
      stores,
    }
  } catch (error) {
    console.log(error)
    Sentry.captureException(error)
  }
}

export const activeStores = ({ searchTerm = '' }) => {
  return db.store.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: 'insensitive',
      },
      active: true,
      approved: true,
    },
    orderBy: {
      name: 'asc',
    },
  })
}

export const store = ({ id }) => {
  return db.store.findUnique({
    where: { id },
  })
}

export const activeStore = ({ id }) => {
  return db.store.findFirst({
    where: { id, active: true, approved: true },
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
