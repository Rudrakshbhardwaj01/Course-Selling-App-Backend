# Course Selling App Backend

## Description

This project provides the backend for an online course selling website. It manages user and admin authentication, course creation and management, purchase workflow, and exposes RESTful APIs for integration with a frontend or external services. The system is built using Node.js, Express, and MongoDB, ensuring scalability and security for an e-commerce learning platform.

## Features

- **User Authentication:** Signup/signin with secure password hashing and JWT-based sessions.
- **Admin Authentication:** Separate admin login, registration, and authorization.
- **Course Management:** Admins can create, update, and list courses.
- **Course Preview:** Users can browse available courses.
- **Purchase Workflow:** Users can purchase courses; purchases are tracked.
- **Purchased Courses View:** Users can view their purchased courses.
- **Role-based Access Control:** Endpoints protected for users and admins.

## Technologies Used

- **Languages:** JavaScript (Node.js)
- **Frameworks:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT (jsonwebtoken), bcrypt
- **Environment Management:** dotenv

## Usage

### API Endpoints

#### User Routes

- `POST /user/signup`
  - Request: `{ "email": "...", "password": "...", "name": "..." }`
  - Response: `{ "message": "You've signed up" }`

- `POST /user/signin`
  - Request: `{ "email": "...", "password": "..." }`
  - Response: `{ "token": "...", "message": "You are signed in" }`

- `GET /user/purchases` *(Requires User Auth Token)*
  - Header: `{ token: <JWT> }`
  - Response: `{ purchases: [...], coursesData: [...] }`

#### Course Routes

- `GET /course/preview`
  - Response: `{ courses: [...] }`

- `POST /course/purchase` *(Requires User Auth Token)*
  - Request: `{ "courseId": "..." }`
  - Header: `{ token: <JWT> }`
  - Response: `{ "message": "You have successfully bought the course" }`

#### Admin Routes

- `POST /admin/signup`
  - Request: `{ "email": "...", "password": "...", "name": "..." }`
  - Response: `{ "message": "You've signed up" }`

- `POST /admin/signin`
  - Request: `{ "email": "...", "password": "..." }`
  - Response: `{ "token": "...", "message": "You're signed in" }`

- `POST /admin/course` *(Requires Admin Auth Token)*
  - Request: `{ title, description, imageUrl, price, courseId }`
  - Header: `{ token: <JWT> }`
  - Response: `{ message: "Course created", courseId: "..." }`

- `PUT /admin/course` *(Requires Admin Auth Token)*
  - Request: `{ title, description, imageUrl, price, courseId }`
  - Header: `{ token: <JWT> }`
  - Response: `{ message: "Course updated", courseId: "..." }`

- `GET /admin/course/bulk` *(Requires Admin Auth Token)*
  - Response: `{ message: "Course updated", courses: [...] }`

### Authentication

- Users and admins receive JWT tokens on successful signin.
- Tokens must be provided in the `token` header for protected endpoints.

## Database

The application uses MongoDB, with the following main models inferred:

- **User Model**
  - `email`: String
  - `password`: Hashed String
  - `name`: String

- **Admin Model**
  - `email`: String
  - `password`: Hashed String
  - `name`: String

- **Course Model**
  - `title`: String
  - `description`: String
  - `imageUrl`: String
  - `price`: Number
  - `creatorId`: Admin Reference

- **Purchase Model**
  - `userId`: User Reference
  - `courseId`: Course Reference

## Environment Variables

The following keys should be set in your `.env` file:

- `PORT`: Port number for the server (e.g., `3000`)
- `MONGO_URL`: MongoDB connection URI
- `JWT_SECRET_USER`: Secret key for signing user JWTs
- `JWT_SECRET_ADMIN`: Secret key for signing admin JWTs

## Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request.

Please ensure code follows the existing style and conventions. For major changes, open an issue first to discuss what you’d like to change.

## License

This project is not explicitly licensed. Please contact the repository owner for licensing details.

## Contact / Author

- **Author:** Rudraksh Bhardwaj
- **GitHub:** [Rudrakshbhardwaj01](https://github.com/Rudrakshbhardwaj01)
