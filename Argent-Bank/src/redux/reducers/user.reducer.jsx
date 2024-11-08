import { GET_USER, UPDATE_USERNAME, DESTROY_USER, RECONNECT_USER } from "@/redux/actions/type.actions";

/* État initial de l'authentification */
const initialState = {
  status: "VOID",
  data: {
    username: null
  }
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        status: "GET_USER",
        data: action.payload,
      }

    case UPDATE_USERNAME:
      return {
        ...state,
        status: "UPDATE_USERNAME",
        data: {
          ...state.data,
          userName: action.payload
        }
      }
    case RECONNECT_USER:
        return {
          ...state,
          status: "RECONNECT_USER",
          data : {
            status : action.payload.data.status,
            email: action.payload.data.email,
            firstName: action.payload.data.firstName,
            lastName: action.payload.data.lastName,
            userName: action.payload.data.userName,
            id: action.payload.data.id,
          }
        }

    case DESTROY_USER:
      return initialState

    default:
      return state;
  }
}
