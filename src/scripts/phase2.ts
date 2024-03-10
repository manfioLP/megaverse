import {run as getMap} from "./getMap";
import {run as getGoalMap} from "./getGoalMap";
import {postAstralObject} from "../handlers/astralObject/createAstralObject";
import {deleteAstralObject} from "../handlers/astralObject/deleteAstralObject";
import {
	AstralObject,
	AstralObjectType,
	ComethDirectionEnum,
	ComethDirectionType,
	SoloonColorEnum,
	SoloonsColorsType
} from "../types";
import dotenv from "dotenv";

dotenv.config()

const getCurrentType = (type: 0 | 1 | 2 | null) => {
	switch (type) {
		case null:
			return "SPACE"
		case 0:
			return "POLYANETS"
		case 1:
			return "SOLOONS"
		case 2:
			return "COMETHS"
	}
}

const goalIsSatisfied = (goal: {type: string, color?: string, direction?: string}, current: {type: 0 | 1 | 2, direction?: string, color?: string}) => {
	const currentType = current ? getCurrentType(current.type) : "SPACE"
	switch (currentType) {
		case "SPACE":
			return goal.type.toUpperCase() === "SPACE"
		case "POLYANETS":
			return goal.type.toUpperCase() === "POLYANET"
		case "SOLOONS":
			return goal.type.toUpperCase() === "SOLOONS" && goal.color === current.color
		case "COMETHS":
			return goal.type.toUpperCase() === "COMETHS" && goal.direction === current.direction
	}
}
const getTypeFromGoal = (goal: string) => {
	switch (goal) {
		case "SPACE":
			return {type: "space"}
		case "POLYANET":
			return {type: AstralObject.POLYANETS}
		default:
			if (!goal.includes("_")) throw new Error(`Invalid astral object goal ${goal}`)

			const [param, type] = goal.split("_")
			if (type === "SOLOON" && param in SoloonColorEnum) {
				if (param in SoloonColorEnum) {
					return {type: AstralObject.SOLOONS, color: param.toLowerCase()}
				} else {
					throw new Error(`Invalid color for soloons ${param}`)
				}
			}

			if (type === "COMETH") {
				if (param in ComethDirectionEnum) {
					return {type: AstralObject.COMETHS, direction: param.toLowerCase()}
				} else {
					throw new Error(`Invalid direction for comeths ${param}`)
				}
			}

			throw new Error(`Invalid astral object type ${type}`)
	}
}
const run = async () => {
	const currentMap = await getMap();
	const goalMap = await getGoalMap();

	const candidateId = process.env.CANDIDATE_ID || ""

	const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

	// Compare the two maps
	// ...
	for (let i = 0; i < goalMap.length; i++) {
		for (let j = 0; j < goalMap[i].length; j++) {
			const goal = getTypeFromGoal(goalMap[i][j])
			if (goalIsSatisfied(goal,currentMap[i][j])) {
				console.log(`skipping position ${i} ${j} because goal is satisfied already!`)
				continue
			}

			const {type, ...params} = goal;
			await delay(900)
			if (type === "space") {
				await deleteAstralObject("space", {row: i, column: j, candidateId})
			} else {
				await postAstralObject(type as AstralObjectType, {row: i, column: j, candidateId, ...params})
			}
		}
	}
}

run()
