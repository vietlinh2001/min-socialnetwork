import {Notification} from "../types";
import {getRepository} from "typeorm";
import NotificationEntity from "../entity/NotificationEntity";

export default class NotificationService {

    async send(notification: Notification<any>) {

        const notificationRepository = getRepository(NotificationEntity)
        const notificationEntity = new NotificationEntity()
        notificationEntity.to = notification.to()
        notificationEntity.payload = notification.payload()
        notificationEntity.type = notification.type()

        await notificationRepository.save(notificationEntity)
    }

}
