import express, { Router } from 'express'
import connectToDatabase   from "./middlewares/connectToDatabase";
import routing             from "./routing";
import morgan              from 'morgan'
import handleError         from './middlewares/handleError';
import NotificationService from "./services/NotificationService";
import PostService from "./services/PostService";

const api = express()
const router = Router()

routing(router)

api.set('NotificationService', new NotificationService())
api.set('PostService', new PostService())

api.use(morgan(process.env.LOG_TYPE || 'common'))
api.use(connectToDatabase(api))
api.use(express.json())
api.use(express.urlencoded({ extended: true }))
api.use(router)
api.use(handleError)

api.listen(process.env.PORT || 3000, () => {
    console.log(`running port ${process.env.PORT || 3000}`)
})
