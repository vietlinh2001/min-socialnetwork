import {EntityNotFoundError} from "typeorm"
import PermissionDenied from "../PermissionDenied";

export default (error, request, response, next) => {

    if (error instanceof EntityNotFoundError) {

        return response.status(404).json({
            error: 'Entity Not Found'
        })
    }
    if (error instanceof PermissionDenied) {
        return response.status(401).json({
            error: error.message
        })
    }

    console.error(error)

    return response.status(500).json({
        error: 'Server Error'
    })
}
