import {User} from "./entity/User";

export default class PermissionDenied {
    constructor(
        public readonly user: User,
        public readonly  resource: string,
        public readonly  action: string) {
    }

    get message() {
        return `You don't have permission to ${this.action} on ${this.resource}`
    }
}