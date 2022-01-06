import Post from "../entity/Post";
import UserResource from "./UserResource";

export default class PostResource {

    constructor(private readonly post: Post) { }

    toJson() {

        const authorResource = new UserResource(this.post.author)

        return {
            id: this.post.id,
            title: this.post.title,
            content: this.post.content,
            author: authorResource.toJson(),
            createdAt: this.post.createdAt,
            updatedAt: this.post.updatedAt
        }
    }
}
