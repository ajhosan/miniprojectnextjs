import RouteController from "@/src/controllers/route.controller";
import ErrorHendler from "@/src/handlers/error.handler";
import { isNumber } from "lodash";
import nc from 'next-connect';

const handler = nc(ErrorHendler);

handler.get(async (req, res) => {
    const [err, data] = await new RouteController().getRoute();

    return res.status(201).json({
        rc: "00",
        data: data
    })
})

export default handler