import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketsService {
    async destroyTicket(ticketId, userId) {
        const ticket = await dbContext.Tickets.findById(ticketId)
        if (!ticket) {
            throw new BadRequest(`Ticket ID ${ticketId} isn't a valid ticket`)
        }
        if (ticket.accountId.toString() != userId) {
            throw new Forbidden(`Mick stop trying to break my site!`)
        }
        await ticket.delete()
        return 'ticket has been deleted'
    }
    async getMyTickets(userId) {
        const myTickets = await dbContext.Tickets.find({ accountId: userId })
            .populate('profile')
            .populate('event')

        return myTickets
    }
    async createTicket(ticketData) {
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('event')
        await ticket.populate('profile')

        return ticket
    }

    async getEventTickets(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId: eventId })
            .populate('profile')
        return tickets
    }

}

export const ticketsService = new TicketsService()