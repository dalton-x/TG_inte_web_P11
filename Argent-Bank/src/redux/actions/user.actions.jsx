import { GET_USER, UPDATE_USERNAME } from "@/redux/actions/type.actions";

/* Actions d'authentification */

export const getUser = (data) => {
    return {
        type: GET_USER,
        payload: data, // donnees de l'utilisateur
    }
}
export const updateUsername = (data) => {
    return {
        type: UPDATE_USERNAME,
        payload: data, // nouveau username de l utilisateur
    }
}
