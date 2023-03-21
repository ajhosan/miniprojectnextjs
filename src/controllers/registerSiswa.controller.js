import { PrismaClient } from "@prisma/client";


export default class RegisterSiswaController {
    constructor(props) {
        this.prisma = new PrismaClient();
        this.fields = props?.fields ?? null
        this.value = props?.value ?? null
    }

    async create() {
        try {
            if (!this.fields) return [new Error('Fields is required'), null]

            const result = await this.prisma.siswa.create({
                data: this.fields
            })
            return [null, result]
        } catch (err) {
            return [err, null]
        }
    }

    async delete() {
        try {
            if (!this.value) return [new Error('Fields is required'), null]
            const result = await this.prisma.siswa.delete({
                where: {
                    id: this.value
                }
            })

            return [null, result]
        } catch (err) {
            return [err, null]
        }
    }

    async getAllSiswa() {
        try {
            const siswa = await this.prisma.siswa.findMany();

            return [null, siswa];
        } catch (err) {
            return [err, null];
        }
    }

    async getFindById() {
        try {
            if (!this.value) return [new Error('Fields is required'), null]

            const findById = await this.prisma.siswa.findUnique({
                where: {
                    id: this.value
                }
            })
            return [null, findById]
        } catch (err) {
            return [err, null];
        }
    }
}