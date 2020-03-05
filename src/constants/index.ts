import { ForbiddenException } from "@nestjs/common";
import { getRepository } from "typeorm";
import { Counter } from "../entities/counter.entity";
import { RequestContext } from "../contexts/request.context";
import { UserRole } from "../entities/role.entity";
const mysql = require('mysql');

export const jwtConstants = {
    secret: 'secretKey',
};

export const forbiddenException = () => {
    throw new ForbiddenException();
};

export const getSeq = async (name: string) => {
    const counter = await getRepository(Counter)
        .createQueryBuilder()
        .where('name = :name', { name })
        .getOne();
    await getRepository(Counter)
        .createQueryBuilder()
        .update(Counter)
        .set({ seq: counter.seq + 1 })
        .where('name = :name', { name })
        .execute();
    return counter.seq + 1;
};

export const checkPermission = async (event, entity, property: string = 'clientId') => {
    // console.log('upda', event.entity)
    // const { clientId, role }: any = RequestContext.getCurrentUser();
    // const value = await getRepository(entity)
    //     .createQueryBuilder()
    //     .where('id = :id', { id: event.entity.id })
    //     .getOne();
    // if (clientId !== `${value}.${property}` && role !== UserRole.SUPER_ADMIN) {
    //     forbiddenException();
    // }
}
    ;
export const connection = mysql.createConnection({
    host: '45.76.176.241',
    user: 'nets',
    password: 'nets2019devdb',
    database: 'cms'
});