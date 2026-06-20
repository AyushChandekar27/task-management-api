# Task Management Application

A full-stack Task Management application built using Spring Boot, Angular, PostgreSQL, and JWT Authentication.

## Tech Stack

### Backend
- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT Authentication
- Maven

### Frontend
- Angular 17
- TypeScript
- SCSS
- Angular Router
- HttpClient

## Features

- User Login using JWT Authentication
- View all tasks
- Create a new task
- Update existing tasks
- Delete tasks
- Task status management
- Protected routes
- RESTful APIs

## Project Structure

```
TaskManagementApp
│
├── backend
│   ├── src
│   ├── pom.xml
│   └── application.properties
│
├── frontend
│   ├── src
│   ├── package.json
│   └── angular.json
```

## How to Run

### Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

### Frontend

```bash
cd frontend
npm install
ng serve
```

Frontend runs on:

```
http://localhost:4200
```

## Database

- PostgreSQL
- Database Name: `taskdb`

