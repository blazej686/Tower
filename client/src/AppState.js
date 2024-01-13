import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/TowerEvent.js').Event[] | null} */
  events: [],

  /** @type {import('./models/Comment.js').Comment[] | null} */
  comments: [],

  /** @type {import('./models/Ticket.js').Ticket[] | null} */
  tickets: [],

  /** @type {import('./models/TowerEvent.js').Event | null} */
  activeEvent: null,

  remainingTickets: null,

  myTickets: [],
})
