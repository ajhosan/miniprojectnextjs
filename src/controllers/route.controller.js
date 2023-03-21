import { PrismaClient } from "@prisma/client";


export default class RouteController {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async getRoute() {
        try {
            const route = await this.prisma.route.findMany();

            return [null, route];
        } catch (err) {
            return [err, null];
        }
    }
}