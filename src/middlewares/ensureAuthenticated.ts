import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";
import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface TokenPayload{
    role: string
    sub: string
}
export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    const authHeader = request.headers.authorization
    if(!authHeader){
        throw new AppError("Token não informado", 401)
    }
    const[_,token] = authHeader.split(" ")
    
    const {sub:user_id, role} = verify(token, authConfig.jwt.secret) as TokenPayload

    request.user = {id:String(user_id), role}
    return next()
}