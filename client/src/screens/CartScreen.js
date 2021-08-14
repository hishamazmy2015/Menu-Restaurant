import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cart/cartAction";
import {
  Row,
  Col,
  Card,
  Img,
  Title,
  Button,
  Body,
  ListGroupItem,
  ListGroup,
  Image,
  Form,
} from "react-bootstrap";

import Loader from "../components/layout/Loader";
import Message from "../components/layout/Message";

function CartScreen({ match, location, history }) {
  const dispatch = useDispatch();

  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  console.log("object qty", qty);
  console.log("object productId", productId);
  useEffect(() => {
    if (productId) dispatch(addToCart(productId, qty));
  }, [dispatch, productId, qty]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  //   cartItems= JSON.parse(cartItems)
  console.log("cartItems");
  console.log(cartItems);
  //   console.log(JSON.parse(cartItems));
  const removeFromCartHandler = (productId) => {
      console.log("object productId",productId)
    dispatch(removeFromCart(productId));
  };
  
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is empty !!! <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col>
                      <Image
                        md={2}
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      />
                    </Col>
                    {/* <Col> {item.name}</Col> */}
                    <Col>
                      <Link to={`/product/${item.product}`} />
                      {item.name}{" "}
                    </Col>
                    <Col md={3}>{item.price}</Col>
                    <Col md={3}>
                      <Form.Control
                        as="select"
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                        value={item.qty}
                      >
                        {[...Array(item.countInStock).keys()].map((c) => (
                          <option key={c + 1} value={c + 1}>
                            {" "}
                            {c + 1}{" "}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col md={1}>
                      <Button
                        type="button"
                        onClick={() => removeFromCartHandler(item.product)}
                        variant="light"
                      >
                        <i className="fas fa-trash" />{" "}
                      </Button>{" "}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
          </ListGroup>
        )}
      </Col>
      <Col>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h2>
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}){" "}
              items{" "}
            </h2>
            <h6>
              Total Price $(
              {cartItems
                .reduce((acc, item) => acc + item.price * item.qty, 0)
                .toFixed(2)}
              ){" "}
            </h6>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Button
                type="button"
                className="btn btn-block"
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                Proceed To Checkout
              </Button>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
}

export default CartScreen;
