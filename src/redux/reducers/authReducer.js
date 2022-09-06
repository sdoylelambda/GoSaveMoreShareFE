import { types } from "../actions/index";

const {
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGOUT_USER,
} = types;

const initialState = {
  user: [],
  error: "",
  isLoading: false,
  isAuth: false,
  isSuccess: false,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_USER_START:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuth: true,
        isSuccess: true,
        isLoading: false,
        error: "",
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        isSuccess: false,
        error: payload,
      };
    case REGISTER_USER_START:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        id: payload.id,
        isSuccess: true,
        isAuth: true,
        isLoading: false,
        error: "",
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        isSuccess: false,
        error: payload,
      };
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
};

export default authReducer;
