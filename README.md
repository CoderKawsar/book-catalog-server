### Live Link: https://book-catalog-server-one-neon.vercel.app/

### Application Routes:

### Books

- api/v1/books/create-book (POST)
- api/v1/books (GET) - Get all books
- api/v1/books/filter (GET) - Get all books with filter and searching
- api/v1/books/651d5e14085718d82d05cdc9 (GET) - Get single book by id
- api/v1/books/651d5e14085718d82d05cdc9 (PATCH) - Edit single book
- api/v1/books/651d5e14085718d82d05cdc9 (DELETE) - Delete single book

#### User

- api/v1/users/signup (POST) - create new user
- api/v1/users/test@user.com (POST) - Get user by email
- api/v1/users/add-book-to-wishlist (PATCH)
  </br><b>req.body data example:</b></br>
  {
  "userEmail": "k@k.com",
  "bookId": "64b27f920eaf53a0de2b27e5"
  }
  </br><b>response example:</b></br>
  {
  "statusCode": 200,
  "success": true,
  "message": "Currently reading this book!",
  "data": {
  "success": false,
  "message": "Currently reading this book!"
  }
  }
- api/v1/users/add-book-to-reading (PATCH)
- api/v1/users/add-book-to-finished-reading (PATCH)
