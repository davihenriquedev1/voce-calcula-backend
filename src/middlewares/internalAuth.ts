import { NextFunction, Request, Response } from "express";

export function internalAuth(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];

    if(!apiKey || apiKey !== process.env.INTERNAL_API_KEY) {
        return res.status(401).json({error: 'unauthorized'});
    }
    next();
}
