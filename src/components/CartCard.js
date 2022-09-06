import React from "react";
import { Link } from "react-router-dom";
import { Card, CardTitle } from "react-materialize";
import { Button, Icon } from "react-materialize";
import { useDispatch } from "react-redux";
import {
  addItemQuantity,
  decreaseItemQuantity,
  saveCart,
} from "../redux/actions/cartActions";
import "./CartCard.scss";

import SaveForLater from "./SaveForLater";

const CartCard = (props) => {
  const { id, productName, price, image, quantity } = props.product;
  const dispatch = useDispatch();

  let { setTotal, total } = props;

  const handleIncrement = (e) => {
    e.preventDefault();
    setTotal((total += 1));

    dispatch(addItemQuantity(id));
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    setTotal((total -= 1));

    dispatch(decreaseItemQuantity(id));
  };

  const saveForLater = (e) => {
    e.preventDefault();
    dispatch(saveCart());
  };

  return (
    <Card className="cart">
      <CardTitle image={image} className="product-name">
        <Link to={`/product/${id}`}>
          <h3>{productName}</h3>
        </Link>
      </CardTitle>

      <h5>${price} </h5>
      <h5>Quantity</h5>
      <div className="cart-buttons">
        <Button
          flat
          node="button"
          waves="light"
          icon={<Icon>remove</Icon>}
          onClick={handleDecrement}
        ></Button>
        <p className="cart-cards-quantity">{quantity}</p>
        <Button
          flat
          node="button"
          waves="light"
          icon={<Icon>add</Icon>}
          onClick={handleIncrement}
        ></Button>
      </div>
      <SaveForLater
        key={id}
        product_id={id}
        quantity={quantity}
        text={"Save"}
        onClick={saveForLater}
      />
    </Card>
  );
};

export default CartCard;
