# E-Commerce API Endpoints

Base URL: `{{base_url}}`

---

## Auth

- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/signin`
- `PATCH /api/v1/auth/changePassword/{{user_id}}`

---

## Users

- `POST /api/v1/user`
- `GET /api/v1/user`
- `GET /api/v1/user/{{user_id}}`
- `PATCH /api/v1/user/{{user_id}}`
- `DELETE /api/v1/user/{{user_id}}`

---

## Brands

- `POST /api/v1/brand`
- `GET /api/v1/brand`
- `GET /api/v1/brand/{{brand_id}}`
- `PATCH /api/v1/brand/{{brand_id}}`
- `DELETE /api/v1/brand/{{brand_id}}`

---

## Categories

- `POST /api/v1/category`
- `GET /api/v1/category`
- `GET /api/v1/category/{{category_id}}`
- `PATCH /api/v1/category/{{category_id}}`
- `DELETE /api/v1/category/{{category_id}}`

---

## Subcategories

- `POST /api/v1/category/{{category_id}}/subCategory`
- `GET /api/v1/subcategory`
- `GET /api/v1/subcategory/{{subcategory_id}}`
- `PATCH /api/v1/subcategory/{{subcategory_id}}`
- `DELETE /api/v1/subcategory/{{subcategory_id}}`

---

## Products

- `POST /api/v1/products`
- `GET /api/v1/products`
- `GET /api/v1/products/{{product_id}}`
- `PATCH /api/v1/products/{{product_id}}`
- `DELETE /api/v1/products/{{product_id}}`

---

## Reviews

- `POST /api/v1/review`
- `GET /api/v1/review`
- `GET /api/v1/review/{{review_id}}`
- `PATCH /api/v1/review/{{review_id}}`
- `DELETE /api/v1/review/{{review_id}}`

---

## Wishlist

- `PATCH /api/v1/wishList`
- `PATCH /api/v1/wishList/{{product_id}}`

---

## Address

- `PATCH /api/v1/address`

---

## Coupons

- `POST /api/v1/coupon`
- `GET /api/v1/coupon`
- `GET /api/v1/coupon/{{coupon_id}}`
- `PATCH /api/v1/coupon/{{coupon_id}}`
- `DELETE /api/v1/coupon/{{coupon_id}}`

---

## Cart

- `POST /api/v1/cart`
- `GET /api/v1/cart`
- `PATCH /api/v1/cart`
- `PATCH /api/v1/cart/apply`
- `PATCH /api/v1/cart/{{cart_item_id}}`

---

## Orders

- `POST /api/v1/order/{{cart_id}}`
- `GET /api/v1/order`
- `GET /api/v1/order/all`
- `POST /api/v1/order/checkout/{{cart_id}}`

---

## Webhook

- `POST /webhook`

---

## Notes

- استخدم `{{user_id}}`, `{{brand_id}}`, `{{category_id}}`, `{{subcategory_id}}`, `{{product_id}}`, `{{review_id}}`, `{{coupon_id}}`, `{{cart_id}}` في مكان القيم الحقيقية.
- ضَع `{{base_url}}` في البيئة على قيمة `http://localhost:3001`.
- في Postman استخدم `{{base_url}}` مع المسار فقط.
