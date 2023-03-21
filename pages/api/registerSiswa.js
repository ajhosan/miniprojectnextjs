import RegisterSiswaController from "@/src/controllers/registerSiswa.controller";
import ErrorHendler from "@/src/handlers/error.handler";
import { isNumber } from "lodash";
import nc from 'next-connect';

const handler = nc(ErrorHendler);

handler
    .post(async (req, res) => {
        let inputDTO = req.body;
        if (inputDTO?.value) {

            const [err, data] = await new RegisterSiswaController({
                value: Number(inputDTO.value)
            }).getFindById();

            if (err) {
                return res.status(400).json({
                    rc: "400",
                    rd: err?.message ?? "Error: Some error"
                })
            }

            return res.status(201).json({
                rc: "00",
                data: data
            })
        } else {
            let namaSiswa = inputDTO?.namaSiswa;
            let alamat = inputDTO?.alamat;
            let noHp = inputDTO?.noHp;
            Reflect.set(inputDTO, 'namaSiswa', namaSiswa);
            Reflect.set(inputDTO, 'alamat', alamat);
            Reflect.set(inputDTO, 'noHp', noHp);

            const [err, data] = await new RegisterSiswaController({
                fields: inputDTO
            }).create();

            if (err) {
                return res.status(400).json({
                    rc: "400",
                    rd: err?.message ?? "Error: Some error"
                })
            }

            Reflect.deleteProperty(data, 'namaSiswa');
            Reflect.deleteProperty(data, 'alamat');
            Reflect.deleteProperty(data, 'noHp');

            return res.status(200).json({
                rc: "00",
                rd: "Register Success!",
                data: data
            })
        }
    })
    .get(async (req, res) => {
        const [err, data] = await new RegisterSiswaController().getAllSiswa();

        return res.status(201).json({
            rc: "00",
            data: data
        })
    })
    .delete(async (req, res) => {
        try {
            const inputDTO = req.body

            const [err, data] = await new RegisterSiswaController({
                value: isNumber(inputDTO.value) ? Number(inputDTO.value) : inputDTO?.value ?? null
            }).delete()

            if (err) {
                return res.status(400).json({
                    error: true,
                    message: err?.message ?? "Bad request"
                })
            }

            return res.status(201).json({
                message: `ID : ${inputDTO?.value}, delete sukses`
            })
        } catch (err) {
            return res.status(500).json({
                error: true,
                message: err?.message ?? null
            })
        }
    })


export default handler