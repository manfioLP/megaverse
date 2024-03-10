import express, { Request, Response } from 'express';
import {API_SERVICE_URL} from "../../constants";
import {
	AstralObject,
	AstralObjectType,
	ComethDirectionEnum,
	ComethsParams,
	PolyanetsParams,
	SoloonColorEnum,
	SoloonsParams
} from "../../types";
import axios from "axios";

export const createAstralObject = async (req: Request, res: Response) => {
	const { row, column, candidateId } = req.body;

	if (!row || !column || !candidateId) return res.status(400).send('Missing required parameters');

	let postData : PolyanetsParams | SoloonsParams | ComethsParams;
	switch (req.params.type) {
		// all requires parameters: row, column
		case AstralObject.POLYANETS: // type: 0
			// Create a planet
			postData = { row, column, candidateId}
			break;
		case AstralObject.SOLOONS: // type: 1
			if (!req.body.color && req.body.color in SoloonColorEnum) {
				postData = { row, column, candidateId, color: req.body.color }
			} else {
				return res.status(400).send(`Invalid color type for saloon - only ${SoloonColorEnum} are allowed`)
			}
			break;
		case AstralObject.COMETHS: // type: 2
			if (!req.body.direction && req.body.direction in ComethDirectionEnum) {
				postData = { row, column, candidateId, color: req.body.color }
			} else {
				return res.status(400).send(`Invalid color type for saloon - only ${SoloonColorEnum} are allowed`)
			}
			break;
		default:
			return res.status(400).send('Invalid astral object type');
	}

	const r = await postAstralObject(req.params.type, postData)
	return res.status(r.ok ? 200 : 400).json(r)
}

export const postAstralObject = async (type: AstralObjectType, bodyData: PolyanetsParams | SoloonsParams | ComethsParams) => {
	const res = await axios.post(`${API_SERVICE_URL}${type}`, bodyData)

	if (res.status >= 200 && res.status < 300) {
		return {ok: true, msg: "Astral object created"}
	}
	return {ok: false, ...res.data}
}
