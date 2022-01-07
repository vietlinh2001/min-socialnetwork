import {Condition} from "./types";
import {SelectQueryBuilder} from "typeorm";
import Post from "./entity/Post";

export default class SearchByTitleCondition implements Condition {

    constructor(private readonly keyword: string = null) {
    }

    buildWhereCondition(query: SelectQueryBuilder<Post>): SelectQueryBuilder<Post> {
        if (this.keyword) {
            query.where('post.content like :title',
                {title: `%${this.keyword}%`})
        }

        return query
    }
}
