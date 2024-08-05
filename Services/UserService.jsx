import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5102/api/";

export const getUserByEmail = async (email) => {
    try {
        const data = await axios.get(api + `account/${email}`);
        return data;
    } catch (error) {
        handleError(error);
    }
}