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

### Install the dependencies:

### For the frontend:
    git clone https://github.com/barkinkoroglu/todocase1.git
    cd todocase1

### 2. Install the dependencies:

  ### For the frontend:
    cd habit-tracker
    npm install

### For the backend:
    cd habit-backend
    npm install

### 3. Set up the database:

Make sure to configure your database in the prisma/.env file. If you are using PostgreSQL, ensure the connection string is correct.

### 4. Run the Prisma migration to create the database tables:
    npx prisma migrate dev

### 5. Start the backend server:
    cd habit-backend
    node src/index.ts

The backend will run at http://localhost:4000.

### 6.Start the frontend development server:
    cd habit-tracker
    npm start

The frontend will run at http://localhost:3000.

### 7.Access the application:

The frontend will be accessible at http://localhost:3000 and the backend API at http://localhost:4000.


### Homepage
![Homepage](https://github.com/user-attachments/assets/a47c4ace-5a40-4ebc-94e0-4b522bf480de)

### Deleting a Todo
![Delete Todo](https://github.com/user-attachments/assets/09b1a541-0d85-4a02-a22b-d73690d09c2f)

### Adding a New Todo
![Add Todo](https://github.com/user-attachments/assets/129162cc-3ad7-43a8-97d5-bda33af391b5)

![New Todo](https://github.com/user-attachments/assets/d7e5a6f5-d03e-4d87-aadb-d3c5cdd8a844)

![Add Todo Form](https://github.com/user-attachments/assets/be1832b0-7ac0-42c4-b319-47584296a67c)

### Todo Details
![Todo Details](https://github.com/user-attachments/assets/47bb3f4d-e61d-48d2-a24f-1a2212831490)

### Editing a Todo
![Edit Todo](https://github.com/user-attachments/assets/82ec0632-fd5a-4a71-b8c9-0fa8c0cfe2a7)

![Edit Form](https://github.com/user-attachments/assets/cac1f9e4-11f8-4c1a-9327-400830f30360)

### Sorting Todos by Date
![Sort by Date](https://github.com/user-attachments/assets/7f5e8f0b-e6f1-42ca-ab97-8b0c448b0e25)

![Sorted Todos](https://github.com/user-attachments/assets/6234b116-d3a6-409a-a540-033d784889c1)

### Search Functionality – Search by Title or Description
![Search](https://github.com/user-attachments/assets/4dfbc6ec-11b1-4590-b121-ce3cc25587d9)

### Pagination – Todos Displayed in Pages
If there are more than 10 todos, the 11th and beyond will appear on the second page.
![Pagination](https://github.com/user-attachments/assets/1fe96f49-f596-4d5d-b202-9be1bc1fff32)

![Second Page](https://github.com/user-attachments/assets/b7ab833c-dcbc-483d-994d-df037315ea68)










