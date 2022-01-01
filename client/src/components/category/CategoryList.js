import React from "react";
import { Row, Col, Tag, Avatar, Space, Button } from "antd";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";

function CategoryList() {
  const [categories, setCategories] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    getCategories().then((c) => {
      setCategories(c.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () =>
    categories.map((c) => (
      <Space key={c._id} direction="vertical" size={0}>
        <Button key={c._id} size="large" shape="square" ghost style={{ height: 60, width: 60, padding: 2 }}>
          <Avatar size={54} shape="square" src={`https://source.unsplash.com/random?setup,${c.slug}`} />
        </Button>
        <div key={c._id} style={{textAlign: "center"}}><Link to={`/category/${c.slug}`}>{c.name}</Link></div>
      </Space>
    ));

  return <Row justify="space-between" style={{padding: "0 32px"}}>{loading ? <h4>Loading...</h4> : showCategories()}</Row>;
}

export default CategoryList;
