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
   yarn install
   ```

3. Configure the environment variables:
   Create a `.env` file at the root of the project and add the following variables:
   ```env
   NODE_ENV=
   PORT=
   DOCKER_IMAGE_NAME=
   ADMIN_API_KEY=
   JWT_SECRET=
   COMPANY_NAME=
   DATABASE_HOST=
   DATABASE_PORT=
   DATABASE_USER=
   DATABASE_PASSWORD=
   DATABASE_NAME=
   DATABASE_SCHEMA=
   DATABASE_LOGGING=
   DATABASE_SYNCHRONIZE=
   ```

4. Run the database migrations:
   ```shell
   yarn migration:run
   ```

5. Run the initial data seed:
   ```shell
   yarn start:dev
   ```

## Usage

1. Start the server:
   ```shell
   yarn start:dev
   ```

2. Build the project:
   ```shell
   yarn build
   ```

3. Access the API documentation in the browser:
   ```
   http://localhost:3001/api
   ```

3. Use the API routes as described in the Routes section.

## Tests

To run the tests, use the command:
```shell
yarn test
```

## Docker

To run the project using Docker, follow the steps below:

1. Build the Docker image:
   ```shell
   make build
   ```

2. Run the container:
   ```shell
   make up
   ```

3. To stop the container, use the command:
   ```shell
   make down
   ```

4. To run tests inside the container, use the command:
   ```shell
   make test
   ```
   
5. To run the database migrations inside the container, use the command:
   ```shell
   make migration
   ```

## Contribution

Contributions are welcome! Feel free to open issues and pull requests.

## License

This project is licensed under the MIT license. See the LICENSE file for more details.

```
MIT License

Copyright (c) 2023 <Your Name>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```