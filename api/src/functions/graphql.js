import {
  createGraphQLHandler,
  makeMergedSchema,
  makeServices,
} from '@redwoodjs/api'

import schemas from 'src/graphql/**/*.{js,ts}'
import { db } from 'src/lib/db'
import services from 'src/services/**/*.{js,ts}'
import * as Sentry from '@sentry/node'

import { getCurrentUser } from 'src/lib/auth'

Sentry.init({
  dsn: 'https://1ef8976c56a4482d821c43d8e607947f@o937181.ingest.sentry.io/5888060',

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

export const handler = createGraphQLHandler({
  getCurrentUser,
  schema: makeMergedSchema({
    schemas,
    services: makeServices({ services }),
  }),

  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})
