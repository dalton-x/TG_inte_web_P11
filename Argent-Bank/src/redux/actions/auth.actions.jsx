import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from "@/redux/actions/type.actions";

/* Actions d'authentification */

// Action pour la connexion réussie
export const loginSuccess = (token) => {
    return {
        type: LOGIN_SUCCESS,
        payload: token, // Token du serveur par JWT
    }
}
// Action pour la connexion Erronee
export const loginFailed = (error) => {
    return {
        type: LOGIN_FAILED,
        payload: error, //Retour du message d'erreur
    }
}
// Action pour la déconnecxion
export const logout = () => {
    return {
        type: LOGOUT,
        payload: null,
    }
}
