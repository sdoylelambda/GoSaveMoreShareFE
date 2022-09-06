import SaveForLater from "../../components/SaveForLater";
import { types } from "../actions/index";
const {
  ADD_TO_CART,
  INCREMENT_ITEM_QUANTITY,
  DECREMENT_ITEM_QUANTITY,
  RESET_ITEM_QUANTITY,
  CART_SAVE_ITEM_START,
  CART_SAVE_ITEM_SUCCESS,
  CART_SAVE_ITEM_FAIL,
  GET_CART_START,
  GET_CART_SUCCESS,
  GET_CART_FAIL,
} = types;
const initialState = {
  items: [],
  isLoading: false,
  err: "",
  totalItems: 0,
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      // if cart is empty add to cart
      let data = {
        ...payload,
        quantity: 1,
      };

      if (state.items.length === 0) {
        return {
          ...state,
          items: state.items.concat(data),
          totalItems: 1,
        };
      }
      // if not equal then add item to cart
      // if cart item id is equal to payload id just add quantity
      let availableItem = state.items.find((item) => item.id === payload.id);
      if (!availableItem) {
        return {
          ...state,
          items: state.items.concat(data),
          totalItems: (state.totalItems += 1),
        };
      } else {
        state.items.filter((item) => {
          if (item.id === payload.id) {
            item.quantity += 1;
          }
        });

        return {
          ...state,
          totalItems: (state.totalItems += 1),
        };
      }

    case CART_SAVE_ITEM_START:
      return {
        ...state,
        isLoading: true,
      };
    case CART_SAVE_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case CART_SAVE_ITEM_FAIL:
      return {
        ...state,
        err: payload,
      };

    case GET_CART_START:
      return {
        ...state,
        isLoading: true,
      };

    case GET_CART_SUCCESS:
      // update the payload, if the payload is not in the cart items then push it to the items
      // if not then just increase the quantity in the store.
      let tallyTotalItems = 0;
      payload.map((item) => (tallyTotalItems += item.quantity));

      return {
        ...state,
        isLoading: false,
        items: [...state.items, ...payload],
        totalItems: tallyTotalItems,
      };

    case GET_CART_FAIL:
      return {
        ...state,
        err: payload,
      };

    case INCREMENT_ITEM_QUANTITY:
      for (let item of state.items) {
        if (item.id === payload) {
          item.quantity += 1;
          state.totalItems += 1;
        }
      }
      return state;

    case DECREMENT_ITEM_QUANTITY:
      for (let item of state.items) {
        if (item.id === payload) {
          item.quantity -= 1;
          state.totalItems -= 1;
        }

        if (item.quantity === 0) {
          return {
            ...state,
            items: state.items.filter((x) => x.id !== payload),
          };
        }
      }
      return state;

    case RESET_ITEM_QUANTITY:
      return {
        items: [],
        isLoading: false,
        err: "",
        totalItems: 0,
      };

    default:
      return state;
  }
};

export default cartReducer;
