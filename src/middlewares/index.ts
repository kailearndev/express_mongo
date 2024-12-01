import { merge } from 'lodash';

import express from 'express';
import { getUserBySession } from '../db/users';


export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['KAI-DEV']
        if (!sessionToken) {
            return res.sendStatus(400)
        }
        const isExistedUser = await getUserBySession(sessionToken)
        if (!isExistedUser) {
            return res.sendStatus(403)
        }
        merge(req, {
            identity: isExistedUser
        })
        return next()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)

    }

}

