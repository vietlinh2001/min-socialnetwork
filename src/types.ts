import { Request } from "express";
import { User } from "./entity/User";

export type AuthenticatedRequest = Request & {
    user: User
}
