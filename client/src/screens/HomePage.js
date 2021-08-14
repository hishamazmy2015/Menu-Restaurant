import React, { useEffect, useState } from "react";
import { Row, Col, Cart } from "react-bootstrap";
import products from "../products";
import Product from "../components/product/Product";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { listProducts } from "../actions/product/productActions";
import Loader from "../components/layout/Loader";
import Message from "../components/layout/Message";

function HomePage() {
  // const [products, setProducts] = useState([]);
  // const products=[]

  const dispatch = useDispatch();

  const ListProducts = useSelector((state) => state.productList);
  const { error, products, loading } = ListProducts;

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <div>
      <h1>Latest Products</h1>
      <br />
      {loading ? (
        <Loader />
      ) 
        : error ? <Message variant='danger'>{error.message}</Message>
         : (
        <Row>
          {products.map((prod) => (
            <Col key={prod._id} sm={12} md={6} lg={4}>
              {/* {prod.name} */}
              <Product product={prod} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomePage;
