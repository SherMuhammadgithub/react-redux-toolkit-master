export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  state.itemPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  ); // itemPrice is the total price of all items in the cart

  state.shippingPrice = state.itemPrice > 100 ? 0 : 10; // shippingPrice is the price of shipping

  state.taxPrice = Number((0.15 * state.itemPrice).toFixed(2)); // taxPrice is the tax on the total price of all items in the cart

  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);
  // totalPrice is the total price of all items in the cart including tax and shipping
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
