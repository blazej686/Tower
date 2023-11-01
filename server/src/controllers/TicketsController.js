import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";

export class TicketsController extends BaseController {

    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
    }

    async createTicket(req, res, next) {
        try {
            const ticketData = req.body
            const userId = req.userInfo.id
            ticketData.accountId = userId
            const ticket = await ticketsService.createTicket(ticketData)
            res.send(ticket)

        } catch (error) {
            next(error)
        }
    }
}

