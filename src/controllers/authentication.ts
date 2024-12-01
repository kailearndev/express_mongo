import express from 'express';
import { createUser, getUserByEmail } from '../db/users';
import { authentication, random } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { password, email } = req.body
        if (!password || !email) {
            return res.sendStatus(400)
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')
        if (!user) {
            return res.sendStatus(400)
        }
        const expectHash = authentication(user.authentication?.salt as string, password)
        if (user.authentication?.password !== expectHash) {
            return res.sendStatus(403).json('ss')
        }

        const salt = random()
        user.authentication.sessionToken = authentication(salt, user._id.toString())

        await user.save()


        res.cookie('KAI-DEV', user.authentication.sessionToken, { domain: 'localhost', path: '/' })


        return res.status(200).json({
            user: { _id: user._id, email: user.email },
            authentication: { sessionToken: user.authentication?.sessionToken },

        }).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)

    }

}


export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body
        if (!email || !password || !username) {
            return res.sendStatus(400);
        }

        const isUser = await getUserByEmail(email)
        if (isUser) {
            return res.sendStatus(400)
        }
        const salt = random()
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error)
        return res.sendStatus(400);

    }
}