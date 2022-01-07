import { Request } from "express";
import { User } from "./entity/User";
import {SelectQueryBuilder} from "typeorm";
import Post from "./entity/Post";

export type AuthenticatedRequest = Request & {
    user: User
}

export interface Notification<Payload> {
    to(): User
    payload(): Payload
    type(): string
}

export interface Condition {
    buildWhereCondition(query: SelectQueryBuilder<Post>): SelectQueryBuilder<Post>
}
