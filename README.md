# Task Management System Backend

This is a robust backend for a Task Management System built with Node.js, Express.js, and MySQL (via Sequelize). It features secure authentication, task management, role-based access control, rate limiting, and activity logging.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Tokens)
- **Logging**: Morgan (HTTP), Custom Activity Logger (Database)
- **Documentation**: Swagger UI

## Features

1.  **Authentication & Security**:
    - Email-based registration.
    - JWT-based authentication with secure cookie/header support.
    - Password hashing using `bcryptjs`.
    - Protected routes.

2.  **Task Management**:
    - Create, Read, Update, Delete (CRUD) tasks.
    - User isolation (users can only see their own tasks).

3.  **Middleware**:
    - **Auth**: Verifies JWT tokens.
    - **Rate Limiting**: specific limits for auth routes and general API throttling.
    - **Error Handling**: Centralized error management.
    - **Security Headers**: using `helmet`.
    - **CORS**: Enabled.

4.  **Activity Logging**:
    - Logs critical actions (Login, Register, Task Operations) to the database for auditing.

5.  **Documentation**:
    - API documentation available at `/api-docs`.

## Prerequisites

- Node.js (v14+)
- MySQL installed and running
- Create a database named `task_management_db`

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Environment Variables:
    - `.env`:
    - Update the variables in `.env`.

## Running Locally

1.  Start the development server:
    ```bash
    npm run dev
    ```

2.  The server will start on port 3000 (default).
    - API: `http://localhost:3000/api`
    - Documentation: `http://localhost:3000/api-docs`

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Deployment (Railway)

This project is configured for easy deployment on [Railway](https://railway.app/).
1.  **Environment Variables**: Railway automatically provides `MYSQL_URL`, `MYSQLHOST`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLPORT`, and `MYSQLDATABASE`. You need to manually add these additional variables in the Railway dashboard:
    - `JWT_SECRET`
    - `JWT_REFRESH_SECRET`
    - `JWT_COOKIE_EXPIRE`
    - `EMAIL_USER` 
    - `EMAIL_PASS` 
    - `NODE_ENV` (set to `production`)

## Design Choices

- **Sequelize ORM**: Chosen for its robust schema definition, promise-based queries, and compatibility with multiple SQL databases.
- **Layered Architecture**: Valid separation of concerns (Controllers, Routes, Models, Services, Middleware).
- **Security First**: Implemented Rate Limiting, Helmet, and careful Error Handling to prevent leaking sensitive info.
- **Activity Logging**: Storing logs in the database allows for easy querying and auditing compared to file-based logs.
