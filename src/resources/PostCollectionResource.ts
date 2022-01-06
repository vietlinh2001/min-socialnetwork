import Post from "../entity/Post";
import PostResource from "./PostResource";

export default class PostCollectionResource {
    
    constructor(private readonly posts: Post[]) { }

    toJson() {
        return this.posts.map((post) => new PostResource(post).toJson())
    }

}
