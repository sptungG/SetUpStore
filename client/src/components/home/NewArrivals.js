import React from "react";

import { Row, Pagination, Typography } from "antd";

import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";

function NewArrivals() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [productsCount, setProductsCount] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("createdAt", "desc", currentPage).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };
  
  React.useEffect(() => {
    loadAllProducts();
  }, [currentPage]);

  React.useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  return (
    <>
      <Row justify="space-between" align="bottom" style={{ margin: "16px 0" }}>
        <Typography.Title level={3} style={{ marginBottom: 8 }}>
          New Arrivals
        </Typography.Title>
        <Pagination current={currentPage} total={(productsCount / 4) * 10} onChange={(page) => setCurrentPage(page)} />
      </Row>
      {loading ? (
        <LoadingCard count={4} />
      ) : (
        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Row>
      )}
    </>
  );
}
export default NewArrivals;
