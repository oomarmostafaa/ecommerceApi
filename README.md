# E-Commerce API

A comprehensive e-commerce API built with Node.js, Express.js, and MongoDB, featuring user authentication, product management, shopping cart, order processing, and payment integration with Stripe.

## 🚀 Features

- **User Authentication & Authorization**: JWT-based authentication with role-based access control (admin/user)
- **User Management**: Profile management, address management, wishlist
- **Product Management**: Categories, subcategories, brands, products with image uploads
- **Shopping Cart**: Add/remove items, apply coupons, calculate totals
- **Order Management**: Create cash/online orders, track orders
- **Reviews System**: Product reviews and ratings
- **Payment Integration**: Stripe payment gateway with webhooks
- **Email Notifications**: Nodemailer for user communications
- **File Uploads**: Multer for image handling
- **Data Validation**: Joi for request validation
- **Security**: Password hashing with bcrypt, CORS support

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Payment**: Stripe API
- **Validation**: Joi
- **File Upload**: Multer
- **Email**: Nodemailer
- **Security**: bcrypt, CORS
- **Other**: dotenv, slugify

## 📚 API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/signin` - User login

### Categories
- `GET /api/v1/category` - Get all categories
- `POST /api/v1/category` - Create category (admin)
- `PATCH /api/v1/category/:id` - Update category (admin)
- `DELETE /api/v1/category/:id` - Delete category (admin)

### Subcategories
- `GET /api/v1/subcategory` - Get all subcategories
- `POST /api/v1/subcategory` - Create subcategory (admin)

### Brands
- `GET /api/v1/brand` - Get all brands
- `POST /api/v1/brand` - Create brand (admin)

### Products
- `GET /api/v1/products` - Get all products
- `POST /api/v1/products` - Create product (admin)
- `PATCH /api/v1/products/:id` - Update product (admin)
- `DELETE /api/v1/products/:id` - Delete product (admin)

### Users
- `GET /api/v1/user` - Get all users (admin)
- `GET /api/v1/user/:id` - Get user by ID
- `PATCH /api/v1/user/:id` - Update user

### Cart
- `GET /api/v1/cart` - Get user cart
- `POST /api/v1/cart` - Add item to cart
- `PATCH /api/v1/cart/:id` - Update cart item quantity
- `DELETE /api/v1/cart/:id` - Remove item from cart
- `PATCH /api/v1/cart/apply` - Apply coupon to cart

### Orders
- `GET /api/v1/order` - Get user orders
- `POST /api/v1/order/:cartId` - Create cash order
- `GET /api/v1/order/all` - Get all orders (admin)
- `POST /api/v1/order/checkout/:cartId` - Create Stripe checkout session

### Reviews
- `GET /api/v1/review` - Get all reviews
- `POST /api/v1/review` - Create review
- `PATCH /api/v1/review/:id` - Update review
- `DELETE /api/v1/review/:id` - Delete review

### Wishlist
- `PATCH /api/v1/wishList` - Add to wishlist
- `PATCH /api/v1/wishList/:id` - Remove from wishlist

### Addresses
- `GET /api/v1/address` - Get user addresses
- `POST /api/v1/address` - Add address
- `DELETE /api/v1/address` - Remove address

### Coupons
- `GET /api/v1/coupon` - Get all coupons (admin)
- `POST /api/v1/coupon` - Create coupon (admin)
- `PATCH /api/v1/coupon/:id` - Update coupon (admin)
- `DELETE /api/v1/coupon/:id` - Delete coupon (admin)

### Webhooks
- `POST /webhook` - Stripe webhook endpoint for payment confirmation

## 🔒 Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 💳 Payment Integration

The API integrates with Stripe for online payments:
- Create checkout sessions for online orders
- Webhook endpoint handles payment confirmation
- Supports both cash and card payments

## 🧪 Test with Postman

To run the API tests immediately with Postman:
1. Open Postman.
2. Import `Ecommerce API.postman_collection.json`.
3. Import `Ecommerce API.postman_environment.json` or create a new environment with the variable `base_url` set to `http://localhost:3001`.
4. Select the imported environment.
5. Run the requests in the collection. The `base_url` variable is already configured in the collection.


## 📁 Project Structure

```
ecommerce-api/
├── db/
│   ├── connection.js
│   └── models/
├── src/
│   ├── middleware/
│   ├── modules/
│   │   ├── address/
│   │   ├── auth/
│   │   ├── brand/
│   │   ├── cart/
│   │   ├── category/
│   │   ├── coupon/
│   │   ├── order/
│   │   ├── product/
│   │   ├── reviews/
│   │   ├── subCategory/
│   │   ├── user/
│   │   ├── wihList/
│   │   └── routes.js
│   └── utils/
├── uploads/
├── .env
├── index.js
├── package.json
└── vercel.json
```

## 👨‍💻 Author

**Omar Mostafa**

---

*Built with ❤️ using Node.js and Express.js*