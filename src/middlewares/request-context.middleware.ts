import { Injectable, NestMiddleware } from '@nestjs/common';
import * as cls from 'cls-hooked';
import { Request } from 'express';
import { RequestContext } from "../contexts/request.context";


@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
    
    use(req: Request, res: any, next: Function) {
        const requestContext = new RequestContext(req, res);
        const session = cls.getNamespace(RequestContext.nsid) || cls.createNamespace(RequestContext.nsid);        
        session.run(async () => {
            session.set(RequestContext.name, requestContext);
            next();
        })
    }
}