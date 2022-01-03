import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Row, Button, Input, Form } from "antd";
import { FaSearch } from "react-icons/fa";

function Search({ affixed }) {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/store?${text}`);
  };
  return (
    <Row align="middle" justify="center">
      <form name="header-search" style={{ width: "100%", lineHeight: 1.4 }} onSubmit={handleSubmit}>
        <Input
          style={{
            borderRadius: 100,
            padding: "5px 8px 5px 20px",
            backgroundColor: affixed ? "transparent" : "rgba(245, 103, 102, 0.05)",
            borderColor: affixed ? "#d9d9d9" : "transparent",
          }}
          allowClear
          placeholder="Type your product ..."
          value={text}
          onChange={handleChange}
          onPressEnter={handleSubmit}
          suffix={
            <Button type="primary" shape="round" size="large" onClick={handleSubmit}>
              <FaSearch size={18} />
            </Button>
          }
        />
      </form>
    </Row>
  );
}

export default Search;