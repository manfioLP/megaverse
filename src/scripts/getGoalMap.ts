import axios from "axios/index";
import {API_SERVICE_URL} from "../constants";
import dotenv from "dotenv";

dotenv.config()
export const run = async () => {
	const res = await axios.get(`${API_SERVICE_URL}map/${process.env.CANDIDATE_ID}/goal`)
	console.log("Desired map:", res.data.goal)
	return res.data.goal
}

run();
