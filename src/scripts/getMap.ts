import axios from "axios/index";
import {API_SERVICE_URL} from "../constants";

export const run = async () => {
	const res = await axios.get(`${API_SERVICE_URL}map/${process.env.CANDIDATE_ID}`)
	console.log("Current map:", res.data.map.content)
	return res.data.map.content
}

run();
