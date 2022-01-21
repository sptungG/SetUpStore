import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import { Button, Popconfirm, Typography, Space } from "antd";
import StarRating from "react-star-ratings";

import { BsStar, BsStarFill, BsCheckLg, BsXLg } from "react-icons/bs";
const RatingForm = ({ name, star, onStarClick }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [visible, setVisible] = React.useState(false);

  let history = useHistory();
  let { slug } = useParams();

  const handleModal = () => {
    if (user && user.token) {
      setVisible(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `/product/${slug}` },
      });
    }
  };

  return (
    <>
      <Popconfirm
        title={
          <Space direction="vertical">
            <Typography.Text>Leave your rating</Typography.Text>
            <StarRating
              name={name}
              numberOfStars={5}
              rating={star}
              changeRating={onStarClick}
              isSelectable={true}
              starRatedColor="#fadb14"
              starHoverColor="#fadb1480"
            />
          </Space>
        }
        visible={visible}
        placement="topRight"
        okText={<BsCheckLg />}
        cancelText={<BsXLg />}
        onCancel={() => setVisible(false)}
        onConfirm={() => {
          setVisible(false);
          toast.success("Thanks for your review. It will appear soon");
        }}
      >
        <Button type="link" block size="large" onClick={handleModal} icon={star > 0 ? <BsStarFill /> : <BsStar />}>
          {user ? (star > 0 ? "Rated" : "Leave rating") : "Login to leave rating"}
        </Button>
      </Popconfirm>
    </>
  );
};

export default RatingForm;
