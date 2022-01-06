import Like from "../entity/Like";
import PostResource from "./PostResource";
import UserResource from "./UserResource";

export default class LikeResource {

    constructor (private readonly like: Like) { }

    toJson() {

        return {
            id: this.like.id,
            post: this.like.post ? new PostResource(this.like.post).toJson() : undefined,
            creator: new UserResource(this.like.creator).toJson(),
            createdAt: this.like.createdAt
        }

    }

}
