import { useEffect, useReducer } from "react";

const KEY = "ama-cart-v1";

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { ...state, [action.id]: (state[action.id] || 0) + 1 };
    case "dec": {
      const qty = (state[action.id] || 0) - 1;
      const next = { ...state };
      if (qty <= 0) delete next[action.id];
      else next[action.id] = qty;
      return next;
    }
    case "remove": {
      const next = { ...state };
      delete next[action.id];
      return next;
    }
    case "clear":
      return {};
    default:
      return state;
  }
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

export function useCart() {
  const [cart, dispatch] = useReducer(reducer, undefined, load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(cart));
    } catch {
      /* storage may be blocked; the cart still works in memory */
    }
  }, [cart]);

  return {
    cart,
    add: (id) => dispatch({ type: "add", id }),
    dec: (id) => dispatch({ type: "dec", id }),
    remove: (id) => dispatch({ type: "remove", id }),
    clear: () => dispatch({ type: "clear" }),
  };
}
