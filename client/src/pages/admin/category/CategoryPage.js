import React from "react";
import { useSelector } from "react-redux";
import { createCategory, getCategories, removeCategory, getCategory, updateCategory } from "../../../functions/category";

import { toast } from "react-toastify";
import { Form, Layout, Row, Col, Card } from "antd";

import Profile from "../../../components/profile/Profile";
import UserNav from "../../../components/nav/UserNav";
import LocalSearch from "../../../components/form/LocalSearch";
import CategoryForm from "../../../components/form/CategoryForm";
import CategoryTable from "../../../components/table/CategoryTable";

function CategoryPage({ history, match }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [form] = Form.useForm();

  const [category, setCategory] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const slug = match.params.slug;

  React.useEffect(() => {
    loadCategories();
  }, []);

  React.useEffect(() => {
    if (slug) {
      const loadCategory = () => getCategory(slug).then((c) => setCategory(c.data.name));
      loadCategory();
    } else loadCategories();
  }, [slug]);

  const loadCategories = () => getCategories().then((c) => setCategories(c.data));

  const handleCreate = ({ name }) => {
    // console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        toast.success(`"${res.data.name}" is created`);
        form.resetFields();
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // console.log(answer, slug);
    setLoading(true);
    removeCategory(slug, user.token)
      .then((res) => {
        setLoading(false);
        toast.error(`${res.data.name} deleted`);
        history.replace("/admin/category");
        loadCategories();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setLoading(false);
          toast.error(err.response.data);
        }
      });
  };

  const handleEdit = ({ name }) => {
    // console.log(name);
    setLoading(true);
    updateCategory(slug, { name }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        form.resetFields();
        toast.success(`"${res.data.name}" is updated`);
        history.replace("/admin/category");
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const searched = (keyword) => (c) => c.slug.includes(keyword);

  return (
    <Layout.Content>
      <Row gutter={[24, 24]} wrap={false}>
        <Col flex="none">
          <Profile />
          <UserNav />
        </Col>
        <Col flex="auto">
          <CategoryForm loading={loading} slug={slug} category={category} handleEdit={handleEdit} handleCreate={handleCreate} />
          <Card>
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            <CategoryTable data={categories.filter(searched(keyword))} handleRemove={handleRemove} />
          </Card>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default CategoryPage;
