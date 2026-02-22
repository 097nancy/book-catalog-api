# book-catalog-api
A secure RESTful API for managing a bookstore inventory, built with Node.js, Express, and MongoDB Atlas. It features full CRUD operations and robust user authentication using JWTs and bcrypt. Public users can browse books, but only authenticated users can modify the catalog. Includes Postman testing files.
# The Digital Book Catalog API

Welcome to the engine room of my digital library! 

This project is a fully functional backend system designed to manage a bookstore or library. I built this to not only handle inventory (adding, updating, and viewing books) but to do it *securely*. It features a complete user authentication system, meaning anyone can browse the catalog, but only users with a "VIP pass" (a secure token) are allowed to make changes to the shelves.



##  How It Works (The Story)

I built this API with three main characters in mind:

1. **The Vault (MongoDB & Mongoose):** Instead of saving data locally, this app connects to a live cloud database (MongoDB Atlas). Every user that registers and every book that gets added is permanently and safely stored in the cloud. Before a user's password goes into the vault, it gets heavily scrambled using `bcrypt` so that even if the database were compromised, the passwords remain unreadable.

2. **The VIP Pass (User Authentication & JWT):**
   When a user registers and successfully logs in, the server doesn't just say "welcome." It generates a unique JSON Web Token (JWT). Think of this as a digital VIP wristband. The user holds onto this token and shows it to the server whenever they want to do something restricted.

3. **The Bouncer (Custom Auth Middleware):**
   While anyone can view the list of books, I didn't want just anyone deleting or changing prices! I wrote a custom middleware script that acts like a bouncer at a club. Whenever a request comes in to Create, Update, or Delete a book, the bouncer steps in and asks, *"Where is your JWT wristband?"* If the token is missing or invalid, the request is blocked (`401 Unauthorized`). 

##  The Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB Atlas (Cloud)
* **Security:** `bcrypt` (password hashing) & `jsonwebtoken` (auth tokens)
* **Testing:** Postman

## How to Run It Yourself

Want to start up the engine on your own machine? It's easy:

1. **Clone this project** to your computer.
2. Open your terminal and run `npm install` to gather all the necessary tools (like Express and Mongoose).
3. Create a hidden file called `.env` in the root folder. You'll need to provide your own database link and secret keys like this:
   ```text
   PORT=5000
   MONGO_URI=your_mongodb_atlas_link_here
   JWT_SECRET=make_up_a_super_secret_password_here
