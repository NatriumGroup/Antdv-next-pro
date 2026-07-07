import { setupWorker } from 'msw/browser'
import { userHandlers } from './user'
import { dashboardHandlers } from './dashboard'
import { tableHandlers } from './table'

const handlers = [...userHandlers, ...dashboardHandlers, ...tableHandlers]

export const worker = setupWorker(...handlers)
