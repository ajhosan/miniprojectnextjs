import nc from 'next-connect'
import bcrypt from 'bcryptjs'
import ErrorHendler from '@/src/handlers/error.handler'
import { isNumber } from 'lodash';
import UserControllers from '@/src/controllers/user.controller';


const handler = nc(ErrorHendler);

handler
    .post(
        async (req, res) => {
            let inputDTO = req.body

            // Check email
            let salt = bcrypt.genSaltSync(10);
            let hashPassword = bcrypt.hashSync(inputDTO?.password, salt);

            Reflect.set(inputDTO, 'password', hashPassword);
            Reflect.set(inputDTO, 'salt', salt);


            // Create user baru
            const [err, data] = await new UserControllers({
                fields: inputDTO
            }).create()

            if (err) {
                return res.status(400).json({
                    message: err?.message ?? "Error: Some error"
                })
            }

            // Activation email
            Reflect.deleteProperty(data, 'password');
            Reflect.deleteProperty(data, 'salt');

            return res.status(200).json({
                message: "OK!",
                data: data
            })
        }
    )
    .delete(async (req, res) => {
        try {
            const inputDTO = req.body
            const [err, data] = await new UserControllers({
                key: inputDTO?.key ?? "id",
                value: isNumber(inputDTO?.value) ? Number(inputDTO.value) : inputDTO?.value ?? null
            }).delete()

            if (err) {
                return res.status(400).json({
                    error: true,
                    message: err?.message ?? "Bad request"
                })
            }

            return res.status(201).json({
                message: `${inputDTO?.key} ${inputDTO?.value} Delete sukses`
            })
        } catch (err) {
            return res.status(500).json({
                error: true,
                message: err?.message ?? null
            })

        }
    })



export default handler