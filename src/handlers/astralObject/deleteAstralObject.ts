import {Request, Response} from "express";
import {AstralObject} from "../../types";
import axios from "axios/index";
import {API_SERVICE_URL} from "../../constants";

export const deleteAstralObject = async (req: Request, res: Response) => {
	const { row, column, candidateId } = req.body;

	if (!row || !column || !candidateId) return res.status(400).send('Missing required parameters');

	if (!(req.params.type in AstralObject)) return res.status(400).send('Invalid astral object type');

	// todo: add row and columns
	const r = await axios.delete(`${API_SERVICE_URL}astral-objects/${req.params.type}`, {data: {row, column}})

	if (r.status >= 200 && r.status < 300) {
		return res.status(200).send('Astral object deleted')
	} else {
		console.error("response", r)
		return res.status(400).send('Astral object not deleted - something happened')
	}
}
