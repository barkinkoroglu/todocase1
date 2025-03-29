# Todo Application

This is a full-stack Todo application built with React and MUI on the frontend, and Express.js with Prisma on the backend. The application allows users to manage their tasks with complete CRUD functionality, including creating, reading, updating, and deleting todos. Additionally, filtering, sorting, and pagination features have been implemented, along with user authentication using JWT (JSON Web Tokens) on the backend.

## Features

- **Todo Creation**: Users can create new todos with a title and description.
- **Todo List View**: View all todos in a list format, with clear status indicators for each todo.
- **Todo Details**: View detailed information about a specific todo, either in a modal or on a separate page.
- **Todo Update**: Edit the title, description, and status of existing todos.
- **Todo Deletion**: Remove todos from the list permanently.
- **Status Management**: Mark todos as "Complete", "Pending", or "In Progress".
- **Priority Levels**: (Optional) Assign priority levels to todos (High, Medium, Low).
- **Due Dates**: (Optional) Set and display due dates for todos.
- **Search Functionality**: Search todos by title or description.
- **Filtering and Sorting**: Filter and sort todos by date.
- **Pagination**: Paginate todos, showing 10 per page. When a new todo is added, pagination updates accordingly.
- **User Authentication**: (Backend only) Implemented JWT-based user authentication.

## Tech Stack

### Frontend:
- React 19
- MUI (Material UI)
- Axios for data fetching

### Backend:
- Node.js
- Express.js
- Prisma ORM
- JWT for user authentication (backend only)

## Installation

### Prerequisites
Before you begin, ensure you have the following installed:
- Node.js
- npm or yarn
- PostgreSQL or any other database supported by Prisma

Install the dependencies:

For the frontend:
   git clone https://github.com/barkinkoroglu/todocase1.git
   cd todocase1

2. Install the dependencies:

For the frontend:
    cd habit-tracker
    npm install

For the backend:
    cd habit-backend
    npm install

3. Set up the database:

Make sure to configure your database in the prisma/.env file. If you are using PostgreSQL, ensure the connection string is correct.

4. Run the Prisma migration to create the database tables:
    npx prisma migrate dev

5. Start the backend server:

   cd habit-backend
   node src/index.ts

The backend will run at http://localhost:4000.

6.Start the frontend development server:

cd habit-tracker
npm start

The frontend will run at http://localhost:3000.

7.Access the application:

The frontend will be accessible at http://localhost:3000 and the backend API at http://localhost:4000.










