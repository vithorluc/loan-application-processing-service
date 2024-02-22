# Loan Application Service

## Project Structure

The loan application service project is structured as follows:

```
loan-application-service/
│
├── src/
│   ├── application/               # Application layer
│   │   ├── controllers/          # Controllers for handling HTTP requests
│   │   │   └── ApplicationController.ts
│   │   ├── dtos/                 # Data transfer objects
│   │   │   └── LoanApplicationDto.ts
│   │   ├── interfaces/           # Interfaces and types
│   │   │   ├── ApplicationService.ts
│   │   │   ├── UserRepository.ts
│   │   │   └── RoleRepository.ts
│   │   ├── services/             # Business logic services
│   │   │   ├── ApplicationService.ts
│   │   │   ├── UserService.ts
│   │   │   └── RoleService.ts
│   │   └── ApplicationModule.ts  # Application module (for NestJS)
│   │
│   ├── domain/                   # Domain layer
│   │   ├── entities/             # Domain entities
│   │   │   ├── User.ts
│   │   │   ├── Role.ts
│   │   │   └── Application.ts
│   │   └── repositories/         # Interfaces for repositories
│   │       ├── UserRepository.ts
│   │       └── RoleRepository.ts
│   │
│   ├── infrastructure/           # Infrastructure layer
│   │   ├── database/             # Database related code
│   │   │   ├── migrations/       # Database migrations
│   │   │   │   └── 20240221120000_create_tables.ts
│   │   │   └── repositories/     # Implementations of repositories
│   │   │       ├── UserRepositoryImpl.ts
│   │   │       └── RoleRepositoryImpl.ts
│   │   ├── middleware/           # Middleware for NestJS
│   │   │   └── logging.middleware.ts
│   │   └── config/                # Configuration files
│   │       └── database.config.ts
│   │
│   └── presentation/             # Presentation layer (HTTP)
│       ├── auth/                 # Authentication controllers
│       │   ├── AuthController.ts
│       ├── middleware/           # Middleware for authentication, etc.
│       │   └── AuthMiddleware.ts
│       ├── app.module.ts         # Main module (for NestJS)
│       └── main.ts               # Entry point
│
├── test/                         # Unit and integration tests
├── .dockerignore                 # Docker ignore file
├── Dockerfile                    # Dockerfile for the application
├── docker-compose.yml            # Docker Compose file
├── tsconfig.json                 # TypeScript configuration file
└── package.json                  # Node.js dependencies and scripts
```

## Description

The loan application service project is designed to manage loan applications. It follows a modular structure, separating concerns into different layers:

- **Application Layer**: Handles HTTP requests and responses, including controllers, DTOs (Data Transfer Objects), interfaces, services, and modules.
- **Domain Layer**: Contains domain entities and interfaces for repositories, defining the business logic and rules.
- **Infrastructure Layer**: Manages external dependencies, such as database-related code, migrations, repositories implementations, middleware, and configuration files.
- **Presentation Layer**: Responsible for the presentation layer, including authentication controllers, middleware, the main application module, and the entry point.

To run the project using Docker and Docker Compose, follow these steps:

1. Make sure you have Docker and Docker Compose installed on your system.
2. Clone the repository to your local machine.
3. Navigate to the project directory.
4. Create a `.env` file in the root directory of the project with the necessary environment variables. For example:

```
DB_HOST=db
DB_PORT=5432
DB_USERNAME=myusername
DB_PASSWORD=mypassword
DB_DATABASE=mydatabase
JWT_SECRET=mysecret
```

5. Run the following command to build and start the Docker containers:

```
docker-compose up --build
```

This command will build the Docker images for the application and database services defined in the `docker-compose.yml` file, and then start the containers.

6. Once the containers are running, you can access the application at the specified port (e.g., `http://localhost:3000`).

That's it! Your application should now be up and running using Docker and Docker Compose. Any changes you make to the code will automatically be reflected in the running containers.

## Routes 

| Route                        | Method | Description                                   | Authenticated |
|------------------------------|--------|-----------------------------------------------|---------------|
| /auth/register               | POST   | Register a new user account.                  | No            |
| /auth/login                  | POST   | Login to receive a JWT token.                 | No            |
| /applications                | POST   | Submit a new loan application.                | Yes           |
| /applications/:id            | GET    | Retrieve the status of a specific application.| Yes           |
| /applications                | GET    | Retrieve all loan applications.                | Yes           |

## Database

```markdown
Table roles {
  id int [pk]
  name varchar(50) [not null]
}

Table users {
  id int [pk]
  username varchar(50) [not null, unique]
  password varchar(255) [not null]
  role_id int [not null]
}

Table applications {
  id int [pk]
  applicant_id int [not null]
  status varchar(20) [not null]
  submission_date timestamp [default: `CURRENT_TIMESTAMP`]
}

users.role_id -> roles.id: Role
applications.applicant_id -> users.id: Applicant
```

### Description:

This document provides examples and descriptions of how to interact with the authentication endpoints of the Loan Application Service using cURL commands. The service allows users to register new accounts, login, and receive JWT tokens for authentication.

### Registration:

Registers a new user account with the Loan Application Service.

#### cURL Example:

```bash
curl -X POST localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{
    "email": "vithorvarela.academico@gmail.com",
    "password": "12345678",
    "username": "Vithor Varela"
}'
```

#### Response:

```json
{
    "username": "Vithor Varela",
    "email": "vithorvarela.academico@gmail.com",
    "id": "f31363ca-5df1-47e8-b0bf-c8bc32113dde"
}
```

### Login:

Logs in an existing user and retrieves a JWT token for authentication.

#### cURL Example:

```bash
curl -X POST localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
    "email": "vithorvarela.academico@gmail.com",
    "password": "12345678"
}'
```

#### Response:

```json
{
    "user": {
        "id": "f31363ca-5df1-47e8-b0bf-c8bc32113dde",
        "username": "Vithor Varela",
        "email": "vithorvarela.academico@gmail.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlZpdGhvciBWYXJlbGEiLCJzdWIiOiJmMzEzNjNjYS01ZGYxLTQ3ZTgtYjBiZi1jOGJjMzIxMTNkZGUiLCJpYXQiOjE3MDg2MTkyMzN9.sps5C3f--WqmDDiZ-XNIPvkcWoFNuFwESAxs9ZtcUHQ"
}
```

### Description:

This document provides examples and descriptions of how to interact with the loan application endpoints of the Loan Application Service using cURL commands. These endpoints allow users to submit new loan applications, retrieve specific applications by ID, and retrieve all applications.

### Submit Application:

Submits a new loan application to the Loan Application Service.

#### cURL Example:

```bash
curl -X POST localhost:3000/applications \
-H "Authorization: Bearer <JWT_TOKEN>" \
-H "Content-Type: application/json" \
-d '{}'
```

#### Response:

```json
{
    "id": 1,
    "applicantId": "f31363ca-5df1-47e8-b0bf-c8bc32113dde",
    "status": "pending",
    "submissionDate": "2024-02-22T12:00:00.000Z"
}
```

### Get Application by ID:

Retrieves a specific loan application by its ID from the Loan Application Service.

#### cURL Example:

```bash
curl -X GET localhost:3000/applications/1 \
-H "Authorization: Bearer <JWT_TOKEN>"
```

#### Response:

```json
{
    "id": 1,
    "applicantId": "f31363ca-5df1-47e8-b0bf-c8bc32113dde",
    "status": "pending",
    "submissionDate": "2024-02-22T12:00:00.000Z"
}
```

### Get All Applications:

Retrieves all loan applications from the Loan Application Service.

#### cURL Example:

```bash
curl -X GET localhost:3000/applications \
-H "Authorization: Bearer <JWT_TOKEN>"
```

#### Response:

```json
[
    {
        "id": 1,
        "applicantId": "f31363ca-5df1-47e8-b0bf-c8bc32113dde",
        "status": "pending",
        "submissionDate": "2024-02-22T12:00:00.000Z"
    },
    {
        "id": 2,
        "applicantId": "f31363ca-5df1-47e8-b0bf-c8bc32113dde",
        "status": "approved",
        "submissionDate": "2024-02-22T13:00:00.000Z"
    }
]
```

### Note:

- Replace `localhost:3000` with the appropriate URL of the Loan Application Service.
- Ensure the request body is properly formatted JSON.
- The JWT token received upon successful login should be included in subsequent requests for authentication.