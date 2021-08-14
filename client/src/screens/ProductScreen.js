import React, { useEffect, useState } from "react";
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
import { listProductDetails } from "../actions/product/productActions";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import products from "../products";
import Review from "./Rating";
function ProductScreen({ match ,history }) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productItem = useSelector((state) => state.productDetails);
  const { loading, error, product } = productItem;

  const onChange = (event) => {
    console.log("object");
  };

  const addToCardHandler = () => {
    console.log('Add to Cart Handler .... ',match.params.id)
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  };

  useEffect(() => dispatch(listProductDetails(match.params.id)), []);
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Link{" "}
      </Link>

      {loading ? (
        Loader
      ) : error ? (
        <Message variant="danger">error</Message>
      ) : (
        product && (
          <div>
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} />
              </Col>
              <Col>
                <ListGroup className="list-group-flush" variant="flush">
                  <ListGroupItem>
                    <h3>{product.name}</h3>
                  </ListGroupItem>

                  <Card.Body>
                    <Card.Title>description</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                  </Card.Body>

                  <ListGroupItem>
                    <Review
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                      color={"#f8e825"}
                    />
                  </ListGroupItem>
                  <ListGroupItem> Price: {product.price}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                  <Card.Link href="#">Card Link</Card.Link>
                  <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
                {/* </Card> */}
              </Col>
              <Col>
                <ListGroup className="list-group-flush" variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col>{product.price}</Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col>Qty:</Col>
                      <Col xs="auto" className="my-1">
                        <Form.Control
                          as="select"
                          onChange={(e) => setQty(e.target.value)}
                          value={qty}
                        >
                          {[...Array(product.countInStock).keys()].map((c) => (
                            <option key={c + 1} value={c + 1}>
                              {" "}
                              {c + 1}{" "}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Button
                        onClick={addToCardHandler}
                        type="button"
                        disabled={product.countInStock == 0}
                        className="btn-block"
                      >
                        Add To Cart
                      </Button>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          </div>
        )
      )}
    </div>
  );
}

export default ProductScreen;
