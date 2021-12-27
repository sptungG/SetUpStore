import React from "react";
import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";

import { createProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { uploadImage, removeImage } from "../../../functions/cloudinary";

import { toast } from "react-toastify";
import { Form, Layout, Row, Col, Card, Typography, Button, Input, InputNumber, Select, Radio, Upload } from "antd";

import Loader from "../../../components/loader/Loader";
import Profile from "../../../components/profile/Profile";
import UserNav from "../../../components/nav/UserNav";
import { AiOutlineInbox } from "react-icons/ai";

function ProductCreate() {
  const { user } = useSelector((state) => ({ ...state }));
  const [form] = Form.useForm();
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];

  const [categories, setCategories] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [subOptions, setSubOptions] = React.useState([]);
  const [showSub, setShowSub] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const loadCategories = () => getCategories().then((c) => setCategories(c.data));
    loadCategories();
  }, []);

  const handleCreate = (values) => {
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        toast.success(`"${res.data.name}" is created`);
        form.resetFields();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const fileUploadAndResize = ({ file, fileList }) => {
    if (file.status !== "removed") {
      let allUploadedFiles = images;
      if (fileList.length > 0) {
        Resizer.imageFileResizer(
          file,
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            setLoading(true);
            uploadImage(uri, user ? user.token : "")
              .then((res) => {
                // console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data);
                setImages(allUploadedFiles.map((item) => ({ public_id: item.public_id, uid: item.public_id, url: item.url, thumbUrl: item.url })));
                form.setFieldsValue({ images: allUploadedFiles });
                toast.success("Uploaded successfully");
              })
              .catch((err) => {
                setLoading(false);
                // console.log("CLOUDINARY UPLOAD ERR", err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    // console.log("remove image", public_id);
    removeImage(public_id, user ? user.token : "")
      .then((res) => {
        setLoading(false);
        let filteredImages = images.filter((item) => item.public_id !== public_id);
        setImages(filteredImages);
        form.setFieldsValue({ images: filteredImages });
        toast.error("Removed successfully");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleCategoryChange = (value) => {
    getCategorySubs(value).then((res) => {
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  const renderForm = () => {
    return (
      <Form form={form} onFinish={handleCreate} layout="vertical" requiredMark={false} size="large">
        <Form.Item>
          <Typography.Title level={4}>{"Create new product"}</Typography.Title>
        </Form.Item>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input placeholder="Enter product name..." autoFocus />
        </Form.Item>
        <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
          <Input placeholder="Enter brand..." />
        </Form.Item>
        <Form.Item name="desc" label="Description" rules={[{ required: true }]}>
          <Input.TextArea showCount maxLength={250} placeholder="Enter description..." />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <InputNumber placeholder="Enter price..." style={{ width: "50%" }} />
        </Form.Item>
        <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
          <InputNumber placeholder="Enter quantity..." style={{ width: "50%" }} />
        </Form.Item>
        <Form.Item name="shipping" label="Shipping" rules={[{ required: true }]} style={{ flexDirection: "row", columnGap: 20 }}>
          <Radio.Group>
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="color" label="Color" rules={[{ required: true }]}>
          <Select placeholder="Please select color...">
            {colors.length > 0 &&
              colors.map((c) => (
                <Select.Option key={c} value={c}>
                  {c}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Select placeholder="Select category..." onChange={handleCategoryChange}>
            {categories.length > 0 &&
              categories.map((c) => (
                <Select.Option key={c._id} value={c._id}>
                  {c.name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        {showSub && (
          <Form.Item name="subs" label="Sub-category" rules={[{ required: true }]}>
            <Select mode="multiple" placeholder="Select sub-category...">
              {subOptions.length &&
                subOptions.map((s) => (
                  <Select.Option key={s._id} value={s._id}>
                    {s.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        )}
        <Form.Item label="Image">
          <Form.Item name="images" noStyle>
            <Upload.Dragger
              multiple={true}
              maxCount={4}
              fileList={[...images]}
              listType="picture-card"
              beforeUpload={() => false}
              onChange={fileUploadAndResize}
              onRemove={({ public_id }) => handleImageRemove(public_id)}
            >
              <p className="ant-upload-drag-icon">
                <AiOutlineInbox size={45} />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            {"Create"}
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Layout.Content>
      {loading ? <Loader /> : ""}
      <Row gutter={[24, 24]} wrap={false}>
        <Col flex="none">
          <Profile />
          <UserNav />
        </Col>
        <Col flex="auto">
          <Card>
            {renderForm()}
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default ProductCreate;
