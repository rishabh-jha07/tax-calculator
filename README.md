# Tax Calculator

A modern, responsive, full-stack Tax Calculator web application built with Node.js, Express, and Vanilla JavaScript. 
The application provides instant client-side validation, server-side verification, robust error handling, and features a sleek glassmorphism design.

## Screenshots

<!-- Replace these placeholders with actual paths to your screenshots -->
<div align="center">
  <img src="https://via.placeholder.com/800x450.png?text=Main+Application+UI" alt="Main UI Screenshot Placeholder" width="45%" />
  &nbsp;
  <img src="https://via.placeholder.com/800x450.png?text=Calculation+Result" alt="Calculation Result Screenshot Placeholder" width="45%" />
</div>

## Features
- **Modern UI**: Dark mode, gradient backgrounds, and responsive card layout using Vanilla CSS.
- **Robust Validation**: Dual client-side and server-side validation logic.
- **RESTful API**: Clean MVC architecture separated into Models, Views, and Controllers.
- **Automated Testing**: Complete Jasmine test suite for boundary and edge cases.
- **Dockerized**: Production-ready Docker environment for smooth deployments.

## Folder Structure

```text
Tax_Calculator/
├── src/               # Application Source Code
│   ├── app.js         # Express app configuration
│   ├── controllers/   # Handles API requests and routes them to models
│   │   └── tax.controller.js
│   ├── models/        # Core business logic and validation rules
│   │   └── tax.model.js
│   └── routes/        # Express route definitions
│       └── tax.routes.js
├── public/            # Static assets served to the client
│   ├── css/
│   │   └── style.css  # Modern UI styles
│   └── js/
│       └── main.js    # Client-side API interactions and DOM manipulation
├── tests/             # Jasmine unit tests
│   └── tax.model.spec.js
├── kubernetes/        # Kubernetes manifests
├── tekton/            # CI/CD pipelines
├── views/             # Frontend HTML structure
│   └── index.html
├── Dockerfile         # Production image build instructions
├── docker-compose.yml # Docker orchestration configuration
├── package.json       # Project metadata and npm scripts
└── server.js          # Express app entry point
```

## Installation Guide

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/tax-calculator.git
   cd tax-calculator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run Unit Tests:**
   ```bash
   npm test
   ```

## Run Guide

To start the application in development mode (which automatically restarts on file changes):
```bash
npm run dev
```

To run the application in production mode:
```bash
npm start
```

The application will now be running at `http://localhost:3000`.

## Docker Guide

This project is fully containerized. To spin up the application seamlessly using Docker:

1. Make sure [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) are installed.
2. Build and start the container in detached mode:
   ```bash
   docker-compose up -d --build
   ```
3. Access the application at `http://localhost:3000`.
4. To stop the container gracefully:
   ```bash
   docker-compose down
   ```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
