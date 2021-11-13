# SetUpStore

Team Members: **Lê Minh Hoàng**, **Bùi Xuân Hiếu**, **Ngô Việt Tùng**

## Stack

<p align="left">
  <img src="https://img.shields.io/badge/React-61abcb?style=flat-square&logo=React&logoColor=ebebeb" height="24" />&nbsp
  <img src="https://img.shields.io/badge/Redux-764abc?style=flat-square&logo=Redux&logoColor=ebebeb" height="24" />&nbsp
  <img src="https://img.shields.io/badge/Scss-CC6699?style=flat-square&logo=Sass&logoColor=ebebeb" height="24" />&nbsp
  <!-- <img src="https://img.shields.io/badge/Ant%20Design-ebebeb?style=flat-square&logo=AntDesign&logoColor=0170FE" height="24" />&nbsp -->
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=ebebeb" height="24" />&nbsp
  <img src="https://img.shields.io/badge/Express-323330?style=flat-square&logo=Express&logoColor=ebebeb" height="24" />&nbsp
  <img src="https://img.shields.io/badge/Firebase-049ae6?style=flat-square&logo=Firebase&logoColor=ffca28" height="24" />&nbsp
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=ebebeb" height="24" />
</p>

- ReactJS để làm giao diện
- Redux để quản lý state dùng chung
- Scss để style giao diện
- MongoDB để làm cơ sở dữ liệu
- ExpressJS để tạo web app
- Firebase để quản lý authentication, dữ liệu user vẫn đc lưu vào DB
- Nodejs để làm backend

## User Story

- Là khách, tôi muốn vào trang web và xem các sản phẩm
- Là khách, tôi muốn click vào sản phẩm là xem đc các thông tin chi tiết
  - Tên(title),
  - Đánh giá trung bình(rating),
  - Danh mục chính (category),
  - danh mục phụ (subs),
  - sản phẩm có thể ship hay ko (shipping),
  - màu sắc (color),
  - hãng (brand),
  - số lượng sản phẩm hiện tại (quantity),
  - số lượng sản phẩm đã bán (sold),
  - Mô tả sản phẩm (description)
  - Các nút với chức năng Thêm vào giỏ hàng, Thêm vào yêu thích, Đánh giá
  - Các sản phẩm khác liên quan
- Là khách, tôi muốn đăng nhập để có thể thêm đánh giá
- Là khách, tôi muốn thêm sản phẩm vào giỏ hàng
- Là khách, tôi muốn vào giỏ hàng để xem thông tin sản phẩm, thêm, bớt, xóa sản phẩm, hiển thị tổng giá tiền.
- Là khách, tôi muốn khi vào giỏ hàng để checkout thì cần đăng nhập (Login to checkout).
- Là khách, tôi muốn sau khi click vào Login to checkout thì dẫn đến trang đăng nhập
- Là khách, tôi muốn đăng nhập, đăng kí để trở thành người dùng (nếu là đăng kí thì dùng firebase để gửi email xác thực, kèm đường link để dẫn đến trang đăng nhập)
- Là khách, tối muốn khi trong giỏ hàng có order thì sau khi đăng nhập sẽ hiển thị phần giỏ hàng (Login to checkout -> Proceed to checkout)

---

- Là người dùng, tôi muốn đánh giá sản phẩm thì sẽ hiển thị đánh giá trung bình tại thời điểm đó
- Là người dùng, tôi muốn đánh giá sản phẩm lần nữa thì sẽ hiển thị đánh giá trước đó và có thể thay đổi đánh giá
- Là người dùng, tôi muốn thêm sản phẩm vào yêu thích thì sẽ hiển thị sản phẩm đó ở Dashboard/Wishlist
- Là người dùng, tôi muốn khi checkout sẽ hiển thị form điền thông tin để nhận được sản phẩm
  - Địa chỉ người dùng
  - Coupon Code (optional)
  - Hiển thị tổng giá tiền trước và sau khi áp dụng coupon code (nếu có)
  - Các nút chức năng Place Order, Empty Cart
- Là người dùng, tôi muốn khi click Place Order thì sẽ hiển trị form điền thông tin thẻ để thanh toán, và lưu sản phẩm đó vào History với trạng thái Not Processed.

## Data schema (7)

- UserSchema
- ProductSchema
- CategorySchema
- SubSchema
- OrderSchema
- CartSchema
- CouponSchema
```js
// UserSchema
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    wishlist: [{ type: ObjectId, ref: "Product" }],
  },
  { timestamps: true }
```

```js
// ProductSchema
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subs: [
      {
        type: ObjectId,
        ref: "Sub",
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    color: {
      type: String,
      enum: ["Black", "Brown", "Silver", "White", "Blue", ...],
    },
    brand: {
      type: String,
      enum: ["Apple", "Xiaomi", "Keychron", ...],
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
```

```js
// CategorySchema
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [2, "Too short"],
      maxlength: [32, "Too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true }
```

```js
// SubSchema
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [2, "Too short"],
      maxlength: [32, "Too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: { type: ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
```

```js
// OrderSchema
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Cash On Delivery",
        "processing",
        "Dispatched",
        "Cancelled",
        "Completed",
      ],
    },
    orderedBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
```

```js
// CartSchema
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
        price: Number,
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderedBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
```

```js
// CouponSchema
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: "Name is required",
      minlength: [6, "Too short"],
      maxlength: [12, "Too long"],
    },
    expiry: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
```

