import {Handler, Request} from "express";
import {getRepository} from "typeorm";
import Notification from "../entity/NotificationEntity";
import {AuthenticatedRequest} from "../types";
import {paginate} from "nestjs-typeorm-paginate";
import { paginationLimit } from "../config"

export const show: Handler = async (request: Request & AuthenticatedRequest, response) => {
    const notificationRepository = getRepository(Notification)

    const query = notificationRepository
        .createQueryBuilder('notification')
        .where('notification.toId = :userId', { userId: request.user.id })

    const paginatedNotifications = await paginate(query, {
        page: request.query.page as string,
        limit: paginationLimit
    })

    return response.json({
        notifications: paginatedNotifications.items,
        _pagination: paginatedNotifications.meta
    })
}