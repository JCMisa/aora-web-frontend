import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

const api = "http://localhost:5102/api/";

export const loginAPI = async (username, password) => {
    try {
        const data = await axios.post(api + "account/login", {
            username: username,
            password: password,
        });
        return data;
    } catch (error) {
        handleError(error);
    }
}

export const registerAPI = async (
    email,
    username,
    password
) => {
    try {
        const data = await axios.post(api + "account/register", {
            email: email,
            username: username,
            password: password,
        });
        return data;
    } catch (error) {
        handleError(error);
    }
};