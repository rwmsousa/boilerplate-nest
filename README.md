# REST API

This is an API project developed with NestJS and provides functionalities to manage users and clients.

## Features

- User authentication and authorization
- User CRUD
- Client CRUD
- API documentation with Swagger
- Initial data seeding

## Functionalities

### Users

- Register new users (admin only)
- User login (any user)
- List all users (admin only)
- Get user details by ID (authenticated user or admin)
- Update user data (authenticated user or admin)
- Delete a user (admin only)

### Clients

- Register new clients (any user, no authentication required)
- List all clients (admin only)
- Get client details by ID (admin only)
- Update client data (admin only)
- Delete a client (admin only)

## Routes

The complete route documentation can be accessed via Swagger at `http://localhost:3001/api`.

## Installation

1. Clone the repository:

   ```shell
   git clone git@github.com:rwmsousa/boilerplate-nest.git
   cd boilerplate-nest
   ```

2. Install the dependencies:

   ```shell
   npm install
   ```

3. Configure the environment variables:

   Create a `.env` file at the root of the project and add the following variables:

   ```env
   NODE_ENV=
   PORT=
   ADMIN_API_KEY=
   JWT_SECRET=
   COMPANY_NAME=
   DATABASE_HOST=
   DATABASE_PORT=
   DATABASE_USER=
   DATABASE_PASSWORD=
   DATABASE_NAME=
   DATABASE_LOGGING=
   DATABASE_SYNCHRONIZE=
   ```

4. Run the database migrations:

   ```shell
   npm run migration:run
   ```

5. Start the API:

   ```shell
   npm run start:dev
   ```

## Usage

1. Start the server:

   ```shell
   npm run start:dev
   ```

2. Build the project:

   ```shell
   npm run build
   ```

3. Access the API documentation in the browser:

   ```text
   http://localhost:3001/api
   ```

4. Use the API routes as described in the Routes section.

## Tests

To run the tests, use the command:

```shell
npm run test
```

## Contribution

Contributions are welcome! Feel free to open issues and pull requests.

## License

This project is licensed under the MIT license.
