import Notification from "../entity/NotificationEntity";
import NotificationResource from "./NotificationResource";

export default class NotificationCollectionResource {

    constructor(private readonly notifications: Notification<any>[]) {
    }

    toJson() {
        return this.notifications
            .map(notification => new NotificationResource(notification).toJson())
    }
}