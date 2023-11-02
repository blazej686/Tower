import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"

class EventsService {



    async getEvents() {
        const events = await dbContext.Events.find()
            .populate('creator', 'name picture')
            .populate('ticketCount')
        return events
    }
    async getEventById(eventId) {
        const event = await dbContext.Events.findById(eventId).populate('creator', 'name picture')
            .populate('ticketCount')
        if (!event) {
            throw new BadRequest(`(${eventId} is not a valid ID`)
        }
        return event
    }

    async createEvent(eventData) {
        const event = await dbContext.Events.create(eventData)
        await event.populate('creator', 'name picture')
        await event.populate('ticketCount')


        return event
    }

    async editEvent(eventData, userId, eventId) {
        const originalEvent = await dbContext.Events.findById(eventId)
        if (!originalEvent.creatorId) throw new BadRequest(`There is no event with ID ${eventId} `)


        if (originalEvent.creatorId != userId) {
            throw new Forbidden('Not your event to edit')
        }

        if (originalEvent.isCanceled == true) {
            throw new BadRequest(`event is canceled. You can't cancel it again`)
        }
        originalEvent.name = eventData.name || originalEvent.name
        originalEvent.description = eventData.description || originalEvent.description
        originalEvent.coverImg = eventData.coverImg || originalEvent.coverImg
        originalEvent.location = eventData.location || originalEvent.location
        originalEvent.capacity = eventData.capacity || originalEvent.capacity
        originalEvent.startDate = eventData.startDate || originalEvent.startDate
        originalEvent.type = eventData.type || originalEvent.type


        await originalEvent.save()
        return originalEvent
    }


    async cancelEvent(eventId, userId) {
        const event = await this.getEventById(eventId)

        if (!event) {
            throw new BadRequest('No event with that Id')
        }
        if (event.isCanceled == true) {
            throw new BadRequest(`event is canceled. You can't cancel it again`)

        }

        if (event.creatorId.toString() != userId) {
            throw new Forbidden(`Not your event to cancel`)
        }
        event.isCanceled = !event.isCanceled
        await event.save()
        return event
    }
}

export const eventsService = new EventsService()
