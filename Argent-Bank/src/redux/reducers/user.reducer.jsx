import { GET_USER, UPDATE_USERNAME } from "@/redux/actions/type.actions";

/* État initial de l'authentification */
const initialState = {
  status: "VOID",
  data: {
    username: ''
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

    default:
      return state;
  }
}
