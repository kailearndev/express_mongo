
import express from 'express'
import { getListUser } from '../controllers/users'
import { isAuthenticated } from '../middlewares'

export default (router: express.Router) => {
    return router.get('/users', isAuthenticated as any, getListUser as any)
}