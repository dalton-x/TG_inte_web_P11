import { GET_USER, UPDATE_USERNAME } from "@/redux/actions/type.actions";

/* Actions d'authentification */

export const getUser = (data) => {
    return {
        type: GET_USER,
        payload: data, // donnees de l'utilisateur
    }
}
export const updateUsername = (newUserName) => {
    return {
        type: UPDATE_USERNAME,
        payload: newUserName, // nouveau username de l'utilisateur
    }
}
