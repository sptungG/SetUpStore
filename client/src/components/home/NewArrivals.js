import React from "react";

import { Row } from "antd";

import { getSortedProducts } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";

function NewArrivals() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getSortedProducts("createdAt", "desc", 4).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };
  return (
    <>
      {loading ? (
        <LoadingCard count={4} />
      ) : (
        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </Row>
      )}
    </>
  );
}
export default NewArrivals;
