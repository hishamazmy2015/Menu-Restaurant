import React from "react";
import { Row, Col, Card, Img, Title, Button, Body } from "react-bootstrap";
import {Link} from "react-router-dom";
function product({ product }) {
  return (
    <div>
      <Card className="my-2 p-3" rounded>
        {/* <Card style={{ width: "18rem" }} className="my-2 p-3" rounded> */}

        <Link to={`/product/${product._id}`}>
          <Card.Img variant="top" src={product.image} />
        </Link>

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
              {/* <Card.Text>{product.name}</Card.Text> */}
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Title>
          </Link>

          <Card.Text as="div">
            <div className="my-2 p-3">
              {product.rating} from {product.numReviews}
            </div>
          </Card.Text>

          <Card.Text as="div">
            ${product.price} 
          </Card.Text>
        
        </Card.Body>
      </Card>
    </div>
  );
}

export default product;
