import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Layout, Row, Col, Card, Empty } from "antd";

import { getUserOrders } from "../../functions/user";
import Profile from "../../components/profile/Profile";
import UserNav from "../../components/nav/UserNav";
import OrdersList from "../../components/list/OrdersList";

function History() {
  const [loading, setLoading] = React.useState(false);
  const [orders, setOrders] = React.useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  React.useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () => {
    setLoading(true);
    getUserOrders(user.token).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
      setLoading(false);
    });
  };

  return (
    <Layout.Content>
      <Row gutter={[24, 24]} wrap={false}>
        <Col flex="none">
          <Profile />
          <UserNav />
        </Col>
        <Col flex="auto">
          <Card>
            <h1 className="text-demo">User History page</h1>
            {orders.length > 0 ? (
              <OrdersList loading={loading} orders={orders} />
            ) : (
              <Card>
                <Empty
                  description={
                    <span>
                      History is empty now.
                      <b>
                        <Link to="/store">Continue Shopping.</Link>
                      </b>
                    </span>
                  }
                />
              </Card>
            )}
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default History;
