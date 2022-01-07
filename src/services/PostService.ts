import {User} from "../entity/User";
import Post from "../entity/Post";
import Like from "../entity/Like";
import {getRepository} from "typeorm";
import {paginate} from "nestjs-typeorm-paginate";
import {paginationLimit} from "../config";
import {Condition} from "../types";

export default class PostService {

    async like(user: User, post: Post): Promise<Like> {
        const likeRepository = getRepository(Like)
        const like = new Like()
        like.post = post
        like.creator = user

        await likeRepository.save(like)

        return like
    }

    async compose(author: User, title: string, content: string): Promise<Post> {
        const postRepository = getRepository(Post)

        const post = new Post()
        post.title = title
        post.content = content
        post.author = author
        post.likes = []

        await postRepository.save(post)

        return post
    }

    async search(condition: Condition, page:number = 1) {
        const postRepository = getRepository(Post)
        const query = postRepository
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'user')

        return await paginate<Post>(condition.buildWhereCondition(query), {
            page: page,
            limit: paginationLimit
        })
    }
}
