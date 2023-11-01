import { dbContext } from "../db/DbContext.js"

class TicketsService {
    async getMyTickets(userId) {
        const myTickets = await dbContext.Tickets.find(userId)
            .populate('profile')
        return myTickets
    }
    async createTicket(ticketData) {
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('event')
        await ticket.populate('profile')

        return ticket
    }

}

export const ticketsService = new TicketsService()