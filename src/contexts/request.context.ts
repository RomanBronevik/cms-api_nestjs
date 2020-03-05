import { HttpException, HttpStatus } from "@nestjs/common";
import * as cls from 'cls-hooked';
import { IncomingMessage } from "http";
import * as jwt from 'jsonwebtoken';

export class RequestContext {


    public static nsid = 'some_random_guid';
    public readonly id: Number;

    public request: IncomingMessage;
    public response: Response;


    constructor(request: IncomingMessage, response: Response) {
        this.id = Math.random();
        this.request = request;
        this.response = response;
    }

    public static currentRequestContext(): RequestContext {
        const session = cls.getNamespace(RequestContext.nsid);
        if (session && session.active) {
            return session.get(RequestContext.name);
        }

        return null;
    }

    public static getCurrentUser(throwError?: boolean) {
        let requestContext = RequestContext.currentRequestContext();
        if (requestContext) {
            const user = requestContext.request.headers['authorization'];
            const usertoken = user;
            const token = usertoken.split(' ');
            const decoded = jwt.decode(token[1]);
            return decoded;
        }
        if (throwError) {
            throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
        return "null";
    }

}