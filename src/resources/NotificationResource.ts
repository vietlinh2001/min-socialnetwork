import Notification from "../entity/NotificationEntity";

export default class NotificationResource<T> {
    constructor(private readonly notification: Notification<T>) {
    }

    toJson() {
        return {
            id: this.notification.id,
            to: this.notification.to,
            payload: this.notification.payload,
            createdAt: this.notification.createdAt
        }
    }
}