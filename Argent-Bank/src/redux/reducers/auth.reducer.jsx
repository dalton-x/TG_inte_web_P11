import { LOGIN_SUCCESS, LOGOUT, RECONNECT_AUTH } from "@/redux/actions/type.actions";

/* État initial de l'authentification */
const initialState = {
    status: "VOID",
    isConnected: false,
    token: null,
    error: null
}

// Changement de l'etat de l'authentification
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                status: "SUCCEEDED",
                isConnected: true,
                token: action.payload,
                error: null
            }
        case RECONNECT_AUTH:
            return {
                ...state,
                status: action.payload.status,
                isConnected: action.payload.isConnected,
                token: action.payload.token,
                error: action.payload.error
            }
        case LOGOUT:
            return initialState // remise a l'etat initial du state

        default:            
            return state
    }
}
