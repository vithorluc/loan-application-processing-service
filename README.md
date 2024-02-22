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
