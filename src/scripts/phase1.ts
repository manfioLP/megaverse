// import {run as getMap} from "./getMap";
import {run as getGoalMap} from "./getGoalMap";
import {postAstralObject} from "../handlers/astralObject/createAstralObject";
import {deleteAstralObject} from "../handlers/astralObject/deleteAstralObject";
import {AstralObject} from "../types";
import dotenv from "dotenv";

dotenv.config()
const getTypeFromGoal = (type: string) => {
	switch (type) {
		case "SPACE":
			return "space"
		case "POLYANET":
			return AstralObject.POLYANETS
		default:
			throw new Error(`Invalid astral object type ${type}`)
	}
}
const run = async () => {
	// const currentMap = await getMap();
	const goalMap = await getGoalMap();

	const candidateId = process.env.CANDIDATE_ID || ""

	// Compare the two maps
	// ...
	const promises = []
	for (let i = 0; i < goalMap.length; i++) {
		for (let j = 0; j < goalMap[i].length; j++) {
			const type = getTypeFromGoal(goalMap[i][j])
			if (type === "space") {
				promises.push(deleteAstralObject("space", {row: i, column: j, candidateId}))
			} else {
				promises.push(postAstralObject(type, {row: i, column: j, candidateId}))
			}
		}
	}
}

run()
