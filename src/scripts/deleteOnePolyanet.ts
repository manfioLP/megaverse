import {postAstralObject} from "../handlers/astralObject/createAstralObject";
import {AstralObject} from "../types";
import dotenv from "dotenv";
import {deleteAstralObject} from "../handlers/astralObject/deleteAstralObject";

dotenv.config()
const run = async () => {
	const candidateId = process.env.CANDIDATE_ID || ""
	if (!candidateId) {
		throw new Error("Missing CANDIDATE_ID")
	}
	const r = await deleteAstralObject(AstralObject.POLYANETS, {row: 1, column: 1, candidateId})
}

run()
