import {Notification} from "../types";
import Like from "../entity/Like";
import {User} from "../entity/User";

export default class LikedPostNotification implements Notification<Like> {

    constructor(private readonly like: Like) {
    }

    payload(): Like {
        return this.like;
    }

    to(): User {
        return this.like.creator;
    }

    type(): string {
        return "LikedPostNotification";
    }
}
