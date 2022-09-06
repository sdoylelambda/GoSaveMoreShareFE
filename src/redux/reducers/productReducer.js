import { types } from '../actions/index'

const {
  GET_INDIVIDUAL_PRODUCT_START,
  GET_INDIVIDUAL_PRODUCT_SUCCESS,
  GET_INDIVIDUAL_PRODUCT_FAIL,
  GET_PRODUCTS_START,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  ADD_PRODUCTS_START,
  ADD_PRODUCTS_SUCCESS,
  ADD_PRODUCTS_FAIL,
  EDIT_PRODUCTS_START,
  EDIT_PRODUCTS_SUCCESS,
  EDIT_PRODUCTS_FAIL,
  REQUEST_PRODUCT_START,
  REQUEST_PRODUCT_SUCCESS,
  REQUEST_PRODUCT_FAIL,
} = types

const initialState = {
  products: [],
  item: [],
  request: [],
  err: '',
  isLoading: false,
}

const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_INDIVIDUAL_PRODUCT_START:
      return {
        ...state,
        isLoading: true,
      }

    case GET_INDIVIDUAL_PRODUCT_SUCCESS:
      return {
        ...state,
        item: payload,
      }
    case GET_INDIVIDUAL_PRODUCT_FAIL:
      return {
        ...state,
        err: payload,
      }
    case GET_PRODUCTS_START:
      return {
        ...state,
        isLoading: true,
      }
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: payload,
      }
    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        isLoading: false,
        err: payload,
      }
    case ADD_PRODUCTS_START:
      return {
        ...state,
        isLoading: true,
      }
    case ADD_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload,
      }
    case ADD_PRODUCTS_FAIL:
      return {
        ...state,
        isLoading: false,
        err: payload,
      }
    case EDIT_PRODUCTS_START:
      return {
        ...state,
        isLoading: true,
      }
    case EDIT_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload,
        isLoading: false,
      }
    case EDIT_PRODUCTS_FAIL:
      return {
        ...state,
        isLoading: false,
        err: payload,
      }
    case REQUEST_PRODUCT_START:
      return {
        ...state,
        isLoading: true,
      }
    case REQUEST_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        request: payload,
      }
    case REQUEST_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: false,
        err: payload,
      }
    default:
      return state
  }
}

export default productReducer
