import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"

class CommentsServices {
    async removeComment(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId)

        if (!comment) {
            throw new BadRequest('Comment Id is invalid')
        }

        if (comment.creatorId.toString() != userId) {
            throw new Forbidden('Not your comment to remove')
        }

        await comment.delete()
        return 'comment has been removed'
    }
    async getEventComments(eventId) {
        const comment = await dbContext.Comments.find({ eventId: eventId })
            .populate('creator')
        return comment

    }
    async createComment(commentData) {
        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator')
        return comment
    }

}

export const commentsService = new CommentsServices()
