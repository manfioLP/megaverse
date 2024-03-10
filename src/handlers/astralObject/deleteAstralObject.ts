import {Request, Response} from "express";
import axios from "axios/index";
import {API_SERVICE_URL} from "../../constants";

export const removeAstralObject = async (req: Request, res: Response) => {
	const { row, column, candidateId } = req.body;

	if (!row || !column || !candidateId) return res.status(400).send('Missing required parameters');

	// this doesn't really matter since we are deleting
	// if (!(req.params.type in AstralObject)) return res.status(400).send('Invalid astral object type');

	const r = await deleteAstralObject(req.params.type, { row, column, candidateId })

	if (r.ok) {
		return res.status(200).send('Astral object deleted')
	} else {
		console.error("response", r)
		return res.status(400).send('Astral object not deleted - something happened')
	}
}

export const deleteAstralObject = async (type: string, bodyData: { row: number, column: number, candidateId: string }) => {
	try {
		const res = await axios.delete(`${API_SERVICE_URL}polyanets`, {data: bodyData}) // the delete route doesn't matter much

		if (res.status >= 200 && res.status < 300) {
			return {ok: true, msg: "Astral object deleted"}
		}
		return {ok: false, ...res.data}
	} catch (err) {
		return {ok: false, msg: "Astral object not deleted - something happened"}
	}
}
