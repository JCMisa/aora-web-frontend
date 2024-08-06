import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5102/api/";

export const getAllVideos = async (email) => {
    try {
        const data = await axios.get(api + `videos`);
        return data;
    } catch (error) {
        handleError(error);
    }
}