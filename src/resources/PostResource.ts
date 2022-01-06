import Like from "../entity/Like";
import Post from "../entity/Post";
import UserResource from "./UserResource";

export default class PostResource {

    constructor(
        private readonly post: Post 
    ) { }

    toJson() {
        return {
            id: this.post.id,
            title: this.post.title,
            content: this.post.content,
            author: this.post.author ? new UserResource(this.post.author).toJson() : undefined,
            createdAt: this.post.createdAt,
            updatedAt: this.post.updatedAt
        }
    }
}
