import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { Form, Layout, Input, Button, Typography, Row, Col, Space, Card, Empty } from "antd";

import { getUserOrders } from "../../functions/user";
import Loader from "../../components/loader/Loader";
import Profile from "../../components/profile/Profile";
import UserNav from "../../components/nav/UserNav";

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
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
      setLoading(false);
    });
  };

  return (
    <Layout.Content>
      {loading ? <Loader /> : ""}
      <Row gutter={[24, 24]}>
        <Col flex="none">
          <Profile />
          <UserNav />
        </Col>
        <Col flex="auto">
          <Card>
            <h1 className="text-demo">User History page</h1>
            {orders.length > 0 ? (
              "User purchase orders"
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
