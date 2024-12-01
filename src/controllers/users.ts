
import express from 'express';
import { getUsers } from '../db/users';


export const getListUser = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers()
        console.log(users);

        return res.status(200).json({
            ...users,

        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)

    }
}