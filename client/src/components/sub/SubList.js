import React from "react";
import { Link } from "react-router-dom";

import { Row, Col, Tag, Avatar, Space, Skeleton, Button } from "antd";
import { getSubs } from "../../functions/sub";

function SubList({type = "image"}) {
  const [subs, setSubs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs.map((s) => (
      <Space key={s._id} direction="vertical" size={0}>
        <Button key={s._id} size="large" shape="square" ghost style={{ height: 60, width: 60, padding: 2 }}>
          <Avatar size={54} shape="square" src={`https://source.unsplash.com/random?setup,${s.slug}`} />
        </Button>
        <div key={s._id} style={{ textAlign: "center" }}>
          <Link to={`/sub/${s.slug}`}>{s.name}</Link>
        </div>
      </Space>
    ));

  const showSubsTag = () =>
    subs.map((s) => (
      <Link key={s._id} to={`/sub/${s.slug}`}>
        <Button ghost type="primary">
        {s.name}
        </Button>
      </Link>
    ));

  return (
    <Row justify="space-between" style={{ padding: "0 32px" }}>
      {loading ? <h4>Loading...</h4> : type === "image" ? showSubs() : showSubsTag()}
    </Row>
  );
}

export default SubList;
