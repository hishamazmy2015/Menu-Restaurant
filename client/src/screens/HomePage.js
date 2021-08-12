import React from "react";
import { Row, Col, Cart } from "react-bootstrap";
import products from "../products";
import Product from '../components/product/Product'

function HomePage() {
  return (
    <div>
      <h1>Latest Products</h1>
      <br/>
      <Row>
        {products.map((prod) => (
          <Col key={prod._id} sm={12} md={6} lg={4} >
          {/* {prod.name} */}
          <Product product={prod}/>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomePage;
