import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

export default function RangePicker({ size = "large", onChange }) {
  return (
    <DatePicker.RangePicker
      size={size}
      format="DD-MM-YYYY"
      allowClear={false}
      bordered={false}
      disabledDate={(current) => current && current < moment().startOf("year")}
      style={{ backgroundColor: "#fff !important" }}
      ranges={{
        Today: [moment(), moment()],
        "This week": [moment().startOf("week"), moment().endOf("week")],
        "This month": [moment().startOf("month"), moment().endOf("month")],
      }}
      defaultValue={[moment().startOf("week"), moment().endOf("week")]}
      onChange={onChange}
    />
  );
}
