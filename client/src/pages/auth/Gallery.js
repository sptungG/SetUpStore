import React from "react";
import { Row, Col, Image, Space } from "antd";
import axios from "axios";

function Gallery() {
  const [photos, setPhotos] = React.useState([]);
  const accessKey = "uCQCPXNFMbJKFb4xJjlnd8Yiuz03HBIoGMGhK1SCZ8c";
  const getPhotos = async () => await axios.get(`https://api.unsplash.com/photos/random?client_id=${accessKey}&orientation=landscape&query=setup%20desk&count=9`);

  React.useEffect(() => {
    const loadPhotos = () => getPhotos().then((p) => setPhotos(p.data));
    loadPhotos();
  }, []);

  const renderGalleryColumn = (list) => {
    return (
      <Col span={8}>
        <Space direction="vertical" size={24}>
          {list.map((item) => (
            <Image key={item.id} width={"100%"} height={"100%"} src={item.urls.regular} alt="Login" />
          ))}
        </Space>
      </Col>
    );
  };

  return (
    <Row id="gallery" gutter={[24, 24]}>
      <Image.PreviewGroup>
        {renderGalleryColumn(photos.slice(0, 3))}
        {renderGalleryColumn(photos.slice(3, 6))}
        {renderGalleryColumn(photos.slice(6, 9))}
      </Image.PreviewGroup>
    </Row>
  );
}

export default Gallery;
