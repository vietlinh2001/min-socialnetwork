import {User} from "./entity/User";

export interface BelongToUser {

    isOwnedBy(user: User): Boolean

}