import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, addItemQuantity } from "../redux/actions/cartActions";
import { Card, CardTitle, Button } from "react-materialize";
import "./ProductCard.scss";

const ProductCard = (props) => {
  const dispatch = useDispatch();
  let product = props.product;

  const { productName, price, image } = props.product;
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    dispatch(addToCart(product));
    dispatch(addItemQuantity());
    setIsDisabled(true);
  };

  return (
    <Card className="product">
      <CardTitle image={image} className="product-name">
        <Link to={`/product/${product.id}`}>
          <h3>{product.productName}</h3>
        </Link>
      </CardTitle>
      <p>${price}</p>
      <Button
        waves="light"
        onClick={handleClick}
        className="product-button string"
        disabled={isDisabled}
      >
        {isDisabled ? <span>Added</span> : <span>Add</span>}
      </Button>
    </Card>
  );
};

export default ProductCard;
