import React, { useState } from "react";
import Cart from "./Cart";
import Information from "./Information";
import Payment from "./Payment";

const Checkout = () => {
  const [currentScreen, setCurrentScreen] = useState("cart");
  const [quantity, setQuantity] = useState(1);
  const PROPS = {
    productImg:
      "https://grovemade.com/static/thumbnails/shop/variant/walnut-ipad-stand-gridA-A3_400x400_85.jpg?_v=1603835220.37",
    productName: "Wood iPad Stand",
    productPrice: 90,
    shippingFee: 15,
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  return (
    <>
      {currentScreen === "cart" && (
        <Cart setCurrentScreen={setCurrentScreen} quantity={quantity} handleQuantityChange={handleQuantityChange} productData={PROPS}/>
      )}

      {currentScreen === "info" && (
        <Information setCurrentScreen={setCurrentScreen} productData={PROPS}/>
      )}

      {currentScreen === "payment" && (
        <Payment setCurrentScreen={setCurrentScreen} productData={PROPS}/>
      )}
    </>
  );
};

export default Checkout;
