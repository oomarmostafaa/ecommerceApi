# Postman API Reference for E-Commerce API

## Environment Variables

Use this environment in Postman before إرسال الطلبات:
- `base_url`: `http://localhost:3001`
- `token`: JWT token after تسجيل الدخول
- `user_id`: User ID from signup أو signin response
- `category_id`, `subcategory_id`, `brand_id`, `product_id`, `coupon_id`, `review_id`, `cart_id`, `cart_item_id`: IDs من الطلبات السابقين
- `brand_image`, `category_image`, `subcategory_image`, `product_cover_image`, `product_image`: local file path للصور
- `stripe_signature`: قيمة Stripe signature للـ webhook إذا تحتاج اختبار

---

## 1. Auth Endpoints

### Sign Up
- Method: `POST`
- URL: `{{base_url}}/api/v1/auth/signup`
- Body: `application/json`
  ```json
  {
    "name": "Omar Mostafa",
    "email": "omar@example.com",
    "password": "A1234",
    "rePassword": "A1234",
    "phone": "01001234567"
  }
  ```
- Response: `token`, `user` object

### Sign In
- Method: `POST`
- URL: `{{base_url}}/api/v1/auth/signin`
- Body: `application/json`
  ```json
  {
    "email": "omar@example.com",
    "password": "A1234"
  }
  ```
- Response: `token`, `user` object

### Change Password
- Method: `PATCH`
- URL: `{{base_url}}/api/v1/auth/changePassword/{{user_id}}`
- Headers: `Authorization: Bearer {{token}}`
- Body: `application/json`
  ```json
  {
    "password": "A1234",
    "newPassword": "B1234"
  }
  ```

---

## 2. Users

### Create User
- Method: `POST`
- URL: `{{base_url}}/api/v1/user`
- Body: `application/json`
  ```json
  {
    "name": "Test User",
    "email": "testuser@example.com",
    "password": "A1234",
    "rePassword": "A1234",
    "phone": "01001234567",
    "role": "user"
  }
  ```

### Get All Users
- Method: `GET`
- URL: `{{base_url}}/api/v1/user`
- Headers: `Authorization: Bearer {{token}}`

### Get User By ID
- Method: `GET`
- URL: `{{base_url}}/api/v1/user/{{user_id}}`
- Headers: `Authorization: Bearer {{token}}`

### Update User
- Method: `PATCH`
- URL: `{{base_url}}/api/v1/user/{{user_id}}`
- Headers: `Authorization: Bearer {{token}}`
- Body: `application/json`
  ```json
  {
    "name": "Updated User",
    "phone": "01009876543"
  }
  ```

### Delete User
- Method: `DELETE`
- URL: `{{base_url}}/api/v1/user/{{user_id}}`
- Headers: `Authorization: Bearer {{token}}`

---

## 3. Brands

### Create Brand
- Method: `POST`
- URL: `{{base_url}}/api/v1/brand`
- Body: `form-data`
  - `title` = `Example Brand`
  - `image` = file `{{brand_image}}`

### Get All Brands
- Method: `GET`
- URL: `{{base_url}}/api/v1/brand`

### Get Brand By ID
- Method: `GET`
- URL: `{{base_url}}/api/v1/brand/{{brand_id}}`

### Update Brand
- Method: `PATCH`
- URL: `{{base_url}}/api/v1/brand/{{brand_id}}`
- Body: `form-data`
  - `title` = `Updated Brand`
  - `image` = file `{{brand_image}}`

### Delete Brand
- Method: `DELETE`
- URL: `{{base_url}}/api/v1/brand/{{brand_id}}`

---

## 4. Categories

### Create Category
- Method: `POST`
- URL: `{{base_url}}/api/v1/category`
- Headers: `Authorization: Bearer {{token}}`
- Body: `form-data`
  - `title` = `Example Category`
  - `image` = file `{{category_image}}`

### Get All Categories
- Method: `GET`
- URL: `{{base_url}}/api/v1/category`

### Get Category By ID
- Method: `GET`
- URL: `{{base_url}}/api/v1/category/{{category_id}}`

### Update Category
- Method: `PATCH`
- URL: `{{base_url}}/api/v1/category/{{category_id}}`
- Headers: `Authorization: Bearer {{token}}`
- Body: `form-data`
  - `title` = `Updated Category`
  - `image` = file `{{category_image}}`

### Delete Category
- Method: `DELETE`
- URL: `{{base_url}}/api/v1/category/{{category_id}}`
- Headers: `Authorization: Bearer {{token}}`

---

## 5. Subcategories

### Create Subcategory
- Method: `POST`
- URL: `{{base_url}}/api/v1/category/{{category_id}}/subCategory`
- Headers: `Authorization: Bearer {{token}}`
- Body: `form-data`
  - `title` = `Example Subcategory`
  - `category` = `{{category_id}}`
  - `image` = file `{{subcategory_image}}`

### Get All Subcategories
- Method: `GET`
- URL: `{{base_url}}/api/v1/subcategory`

### Get Subcategory By ID
- Method: `GET`
- URL: `{{base_url}}/api/v1/subcategory/{{subcategory_id}}`

### Update Subcategory
- Method: `PATCH`
- URL: `{{base_url}}/api/v1/subcategory/{{subcategory_id}}`
- Headers: `Authorization: Bearer {{token}}`
- Body: `form-data`
  - `title` = `Updated Subcategory`
  - `category` = `{{category_id}}`
  - `image` = file `{{subcategory_image}}`

### Delete Subcategory
- Method: `DELETE`
- URL: `{{base_url}}/api/v1/subcategory/{{subcategory_id}}`
- Headers: `Authorization: Bearer {{token}}`

---

## 6. Products

### Create Product
- Method: `POST`
- URL: `{{base_url}}/api/v1/products`
- Headers: `Authorization: Bearer {{token}}`
- Body: `application/json`
  ```json
  {
    "title": "Example Product",
    "description": "A sample product description.",
    "price": 150,
    "priceAfterDiscount": 120,
    "quantity": 30,
    "category": "{{category_id}}",
    "subCategory": "{{subcategory_id}}",
    "brand": "{{brand_id}}",
    "createdBy": "{{user_id}}",
    "imageCover": [
      {
        "fieldname": "imageCover",
        "originalname": "cover.jpg",
        "encoding": "7bit",
        "mimetype": "image/jpeg",
        "destination": "uploads/",
        "filename": "cover.jpg",
        "path": "uploads/cover.jpg",
        "size": 200000
      }
    ],
    "images": [
      {
        "fieldname": "images",
        "originalname": "image1.jpg",
        "encoding": "7bit",
        "mimetype": "image/jpeg",
        "destination": "uploads/",
        "filename": "image1.jpg",
        "path": "uploads/image1.jpg",
        "size": 150000
      }
    ]
  }
  ```

### Get All Products
- Method: `GET`
- URL: `{{base_url}}/api/v1/products`

### Get Product By ID
- Method: `GET`
- URL: `{{base_url}}/api/v1/products/{{product_id}}`

### Update Product
- Method: `PATCH`
- URL: `{{base_url}}/api/v1/products/{{product_id}}`
- Headers: `Authorization: Bearer {{token}}`
- Body: `form-data` (or JSON if server accepts it)
  - `title`, `description`, `price`, `priceAfterDiscount`, `quantity`, `category`, `subCategory`, `brand`
  - `imageCover` = file `{{product_cover_image}}`
  - `images` = file `{{product_image}}`

### Delete Product
- Method: `DELETE`
- URL: `{{base_url}}/api/v1/products/{{product_id}}`
- Headers: `Authorization: Bearer {{token}}`

---

## 7. Coupons

### Create Coupon
- Method: `POST`
- URL: `{{base_url}}/api/v1/coupon`
- Headers: `Authorization: Bearer {{token}}`
- Body: `application/json`
  ```json
  {
    "code": "SAVE20",
    "discount": 20,
    "expires": "2026-12-31T00:00:00.000Z"
  }
  ```

### Get All Coupons
- Method: `GET`
- URL: `{{base_url}}/api/v1/coupon`

### Get Coupon By ID
- Method: `GET`
- URL: `{{base_url}}/api/v1/coupon/{{coupon_id}}`

### Update Coupon
- Method: `PATCH`
- URL: `{{base_url}}/api/v1/coupon/{{coupon_id}}`
- Headers: `Authorization: Bearer {{token}}`
- Body: `application/json`
  ```json
  {
    "code": "SAVE30",
    "discount": 30
  }
  ```

### Delete Coupon
- Method: `DELETE`
- URL: `{{base_url}}/api/v1/coupon/{{coupon_id}}`
- Headers: `Authorization: Bearer {{token}}`

---

## 8. Reviews

### Add Review
- Method: `POST`
- URL: `{{base_url}}/api/v1/review`
- Headers: `Authorization: Bearer {{token}}`
- Body: `application/json`
  ```json
  {
    "text": "This product is excellent.",
    "rating": 5,
    "product": "{{product_id}}"
  }
  ```

### Get All Reviews
- Method: `GET`
- URL: `{{base_url}}/api/v1/review`

### Get Review By ID
- Method: `GET`
- URL: `{{base_url}}/api/v1/review/{{review_id}}`

### Update Review
- Method: `PATCH`
- URL: `{{base_url}}/api/v1/review/{{review_id}}`
- Headers: `Authorization: Bearer {{token}}`
- Body: `application/json`
  ```json
  {
    "text": "Review text updated.",
    "rating": 4
  }
  ```

### Delete Review
- Method: `DELETE`
- URL: `{{base_url}}/api/v1/review/{{review_id}}`
- Headers: `Authorization: Bearer {{token}}`

---

## 9. Address

### Add Address
- Method: `PATCH`
- URL: `{{base_url}}/api/v1/address`
- Headers: `Authorization: Bearer {{token}}`
- Body: `application/json`
  ```json
  {
    "street": "123 Example St",
    "phone": "01001234567",
    "city": "Cairo"
  }
  ```

---

## 10. Wishlist

### Add To Wishlist
- Method: `PATCH`
- URL: `{{base_url}}/api/v1/wishList`
- Headers: `Authorization: Bearer {{token}}`
- Body: `application/json`
  ```json
  {
    "product": "{{product_id}}"
  }
  ```

### Remove From Wishlist
- Method: `PATCH`
- URL: `{{base_url}}/api/v1/wishList/{{product_id}}`
- Headers: `Authorization: Bearer {{token}}`

---

## 11. Cart

### Add To Cart
- Method: `POST`
- URL: `{{base_url}}/api/v1/cart`
- Headers: `Authorization: Bearer {{token}}`
- Body: `application/json`
  ```json
  {
    "product": "{{product_id}}",
    "quantity": 2
  }
  ```

### Get Logged-in Cart
- Method: `GET`
- URL: `{{base_url}}/api/v1/cart`
- Headers: `Authorization: Bearer {{token}}`

### Update Cart Quantity
- Method: `PATCH`
- URL: `{{base_url}}/api/v1/cart`
- Headers: `Authorization: Bearer {{token}}`
- Body: `application/json`
  ```json
  {
    "product": "{{product_id}}",
    "quantity": 3
  }
  ```

### Remove Cart Item
- Method: `PATCH`
- URL: `{{base_url}}/api/v1/cart/{{cart_item_id}}`
- Headers: `Authorization: Bearer {{token}}`

### Apply Coupon
- Method: `POST`
- URL: `{{base_url}}/api/v1/cart/apply`
- Headers: `Authorization: Bearer {{token}}`
- Body: `application/json`
  ```json
  {
    "coupon": "SAVE20"
  }
  ```

---

## 12. Orders

### Create Cash Order
- Method: `POST`
- URL: `{{base_url}}/api/v1/order/{{cart_id}}`
- Headers: `Authorization: Bearer {{token}}`
- Body: `application/json`
  ```json
  {
    "shippingAddress": {
      "street": "123 Example St",
      "city": "Cairo",
      "phone": "01001234567"
    }
  }
  ```

### Get User Orders
- Method: `GET`
- URL: `{{base_url}}/api/v1/order`
- Headers: `Authorization: Bearer {{token}}`

### Get All Orders (Admin)
- Method: `GET`
- URL: `{{base_url}}/api/v1/order/all`
- Headers: `Authorization: Bearer {{token}}`

### Create Stripe Checkout Session
- Method: `POST`
- URL: `{{base_url}}/api/v1/order/checkout/{{cart_id}}`
- Headers: `Authorization: Bearer {{token}}`
- Body: `application/json`
  ```json
  {
    "shippingAddress": {
      "street": "123 Example St",
      "city": "Cairo",
      "phone": "01001234567"
    }
  }
  ```

---

## 13. Stripe Webhook

### Webhook Listener
- Method: `POST`
- URL: `{{base_url}}/webhook`
- Header: `Stripe-Signature: {{stripe_signature}}`
- Body: raw JSON from Stripe webhook event

> ملاحظة: اختبار الـ webhook في Postman يحتاج قيمة توقيع Stripe صحيحة أو يمكن تجاوز التحقق في الكود مؤقتاً.

---

## Notes

- تأكد أن تستخدم `Authorization: Bearer {{token}}` في الطلبات المحمية.
- خذ قيمة `{{token}}` من response بعد `signin` أو `signup`.
- خذ قيم IDs من response بعد إنشاء كل كيان لتستخدمها في الطلبات التالية.
- إذا كان endpoint يتطلب تحميل ملف، حدد `Body` كـ `form-data` ثم اختر `file` في الحقل المناسب.
