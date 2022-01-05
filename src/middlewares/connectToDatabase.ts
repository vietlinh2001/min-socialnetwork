import { createConnection } from "typeorm";
import { Express }          from "express";

export default (app: Express) => {

  const createConnectionPromise = createConnection()

  return async (request, response, next) => {
    const connection = await createConnectionPromise
    app.set('db.connection', connection)
    next()
  }
}
