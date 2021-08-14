import React from "react";
import { Row, Col, Card, Img, Title, Button, Body ,Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import Rating from '../../screens/Rating'
function product({ product }) {
  return (
    <div>
      <Card className="my-2 p-3" rounded>
        {/* <Card style={{ width: "18rem" }} className="my-2 p-3" rounded> */}

        <Link to={`/product/${product._id}`}>
          {/* <Card.Img variant="top" src={product.image} /> */}
          <Image  variant="top" src={product.image} alt={product.name} />

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
            <div className="my-3">
             <Rating value={product.rating}  text={`${product.numReviews}  reviews`} color={"#f8e825"} />
             
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
