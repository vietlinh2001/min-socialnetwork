import {Request} from "express";
import {getRepository} from "typeorm";
import {EntityBoundRequest} from "../types";

export default function bindEntity<T>(entityClass, parameter = 'id') {
    return (
        request: Request & EntityBoundRequest<T>,
        response,
        next
    ) => {
        const repository = getRepository<T>(entityClass)

        repository.findOneOrFail(request.params[parameter])
            .then(entity => {
                request.entity = entity
                next()
            })
            .catch(error => {
                next(error)
            })
    }
}
