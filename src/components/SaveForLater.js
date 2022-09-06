import React from "react";
import { Button } from "react-materialize";
import { useSelector, useDispatch } from "react-redux";
import { saveCart } from "../redux/actions/cartActions";
import { useHistory } from "react-router-dom";

const SaveForLater = ({ product_id, quantity, text }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSave = () => {
    let data = {
      user_id: auth.user.id,
      product_id: product_id,
      savedForLater: true,
      quantity: quantity,
    };

    if (!auth.isAuth) {
      history.push("/login");
    } else {
      dispatch(saveCart(data));
    }
  };

  return (
    <>
      <Button onClick={handleSave}>{text}</Button>
    </>
  );
};

export default SaveForLater;
