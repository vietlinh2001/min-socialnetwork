import {Request} from "express";
import {AuthenticatedRequest, EntityBoundRequest} from "../types";
import PermissionDenied from "../PermissionDenied";
import {BelongToUser} from "../BelongToUser";

export default function mustBeOwner(resource: string, action: string) {
    return (
        request: Request & EntityBoundRequest<BelongToUser> & AuthenticatedRequest,
        response,
        next
    ) => {
        if (!request.entity.isOwnedBy(request.user)) {
            return next(new PermissionDenied(request.user, resource, action))
        }
        return next()
    }
}
