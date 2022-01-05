import express, { Router } from 'express'
import connectToDatabase   from "./middlewares/connectToDatabase";
import routing             from "./routing";
import morgan              from 'morgan'
import handleError         from './middlewares/handleError';
import bodyParser          from "body-parser";

const api = express()
const router = Router()

routing(router)

api.use(morgan(process.env.LOG_TYPE || 'common'))
api.use(connectToDatabase(api))
api.use(bodyParser.json())
api.use(bodyParser.urlencoded())
api.use(router)
api.use(handleError)

api.listen(process.env.PORT || 3000)
