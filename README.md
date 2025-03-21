
# Ticket Reservation System

A Simple Train Ticket Reservation System using Java Spring Boot & Next.js.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Project Structure](#project-structure)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact](#contact)

## Introduction

The Ticket Reservation System is a web application designed to allow users to book train tickets with ease. The system is built using Java Spring Boot for the backend and Next.js for the frontend.

## Features

- User authentication and authorization
- Browse available train routes and schedules
- Book and cancel tickets
- View booking history
- Admin dashboard to manage routes and schedules

## Technologies

- **Backend:** Java Spring Boot
- **Frontend:** Next.js
- **Database:** MySQL (or specify your database)
- **Other Libraries/Tools:** (List any other technologies or libraries used)

## Project Structure

```plaintext
ticket-reservation-system/
│── backend/
│   ├── src/
│   ├── target/
│   ├── pom.xml                   # Maven configuration
│── frontend/
│   ├── pages/
│   ├── public/
│   ├── styles/
│   ├── next.config.js
│   ├── package.json              # Node.js configuration
│── .gitignore
│── README.md
```

## Installation

### Prerequisites

- Java 11 or higher
- Node.js and npm
- MySQL or your preferred database

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/SambitPruthwiraj/ticket-reservation-system.git
    cd ticket-reservation-system
    ```

2. Navigate to the backend directory and build the project:
    ```bash
    cd backend
    ./mvnw clean install
    ```

3. Run the Spring Boot application:
    ```bash
    ./mvnw spring-boot:run
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Run the Next.js application:
    ```bash
    npm run dev
    ```

## Usage

Access the application at `http://localhost:3000` and start booking train tickets.

### Roles in the System

- **User:** Browse routes, book and cancel tickets, view booking history.
- **Admin:** Manage routes, schedules, and oversee overall system operations.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is for educational purposes. Feel free to use and modify it.



