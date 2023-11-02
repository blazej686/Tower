import { Auth0Provider } from "@bcwdev/auth0provider";
import { eventsService } from "../services/EventsService.js";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getEvents)
            .get('/:eventId', this.getEventById)
            .get('/:eventId/tickets', this.getEventTickets)
            .get('/:eventId/comments', this.getEventComments)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.cancelEvent)


    }

    async getEvents(req, res, next) {
        try {
            const events = await eventsService.getEvents()
            return res.send(events)

        } catch (error) {
            next(error)
        }
    }

    async getEventById(req, res, next) {

        try {
            const eventId = req.params.eventId
            const event = await eventsService.getEventById(eventId)
            return res.send(event)
        } catch (error) {
            next(error)
        }

    }

    async getEventTickets(req, res, next) {
        try {
            const eventId = req.params.eventId
            const tickets = await ticketsService.getEventTickets(eventId)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }

    async getEventComments(req, res, next) {
        try {
            const eventId = req.params.eventId
            const comment = await commentsService.getEventComments(eventId)
            return res.send(comment)

        } catch (error) {
            next(error)
        }
    }

    async createEvent(req, res, next) {
        try {
            const eventData = req.body
            const userId = req.userInfo.id
            eventData.creatorId = userId
            const event = await eventsService.createEvent(eventData)
            return res.send(event)

        } catch (error) {
            next(error)
        }
    }

    async editEvent(req, res, next) {
        try {
            const eventData = req.body
            const userId = req.userInfo.id
            const eventId = req.params.eventId
            const editedEvent = await eventsService.editEvent(eventData, userId, eventId)
            return res.send(editedEvent)

        } catch (error) {
            next(error)
        }
    }
    async cancelEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const userId = req.userInfo.id
            const event = await eventsService.cancelEvent(eventId, userId)
            return res.send(event)
        } catch (error) {
            next(error)
        }

    }
}