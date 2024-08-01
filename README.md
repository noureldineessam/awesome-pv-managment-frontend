# 🚀 Awesome PV Management Frontend

Welcome to the **Awesome PV Management Frontend**! This application is designed to provide a user-friendly interface for managing photovoltaic (PV) facilities. With comprehensive dashboards, user management, and detailed reporting, it's your one-stop solution for all things PV management.

## 🗂 Project Structure

Here's an in-depth look at the project's directory structure and the purpose of each file:

```
awesome-pv-management-frontend
├─ .env               # Environment variables, including API endpoints and secrets.
├─ .gitignore         # Specifies which files and directories to ignore in Git.
├─ README.md          # This file! A comprehensive guide to the project.
├─ components         # Reusable React components.
│  ├─ Chart.jsx       # Displays charts for visual data representation.
│  ├─ FacilityDetailView.jsx # Detailed view of a single facility's data.
│  └─ common          # Common UI components shared across the application.
│     ├─ CustomHead.jsx # Custom <head> component for managing meta tags.
│     ├─ FacilityForm.jsx # Form for creating and editing facility data.
│     ├─ FacilityList.jsx # Displays a list of facilities.
│     ├─ LoginForm.jsx # User login form.
│     ├─ LogoutButton.jsx # Button component for logging out users.
│     └─ SignupForm.jsx # User registration form.
├─ graphql            # GraphQL queries and mutations organized by feature.
│  ├─ facilities      # Facility-related GraphQL operations.
│  │  ├─ mutations.js # Mutations for creating, updating, deleting facilities.
│  │  └─ queries.js   # Queries for fetching facility data.
│  ├─ index.js        # Central export file for all GraphQL operations.
│  ├─ reports         # Report-related GraphQL operations.
│  │  ├─ mutations.js # Mutations for creating, deleting reports.
│  │  └─ queries.js   # Queries for fetching report data.
│  └─ users           # User-related GraphQL operations.
│     ├─ mutations.js # Mutations for user management (create, update, delete).
│     └─ queries.js   # Queries for fetching user data.
├─ hoc                # Higher-Order Components for additional functionality.
│  └─ ProtectedRoute.jsx # HOC for route protection based on authentication.
├─ hooks              # Custom React hooks for shared logic.
│  └─ useAuth.jsx     # Custom hook for handling authentication logic.
├─ jsconfig.json      # Configuration for JavaScript/TypeScript support.
├─ lib                # Utility libraries and helpers.
│  └─ graphqlClient.js # Apollo Client setup for GraphQL.
├─ next.config.mjs    # Next.js configuration file.
├─ package-lock.json  # Lockfile for package versions.
├─ package.json       # Project's dependencies and scripts.
├─ pages              # Next.js page components, map to routes.
│  ├─ _app.jsx        # Custom App component for global configuration.
│  ├─ dashboard       # Dashboard pages for displaying facility data.
│  │  ├─ facility
│  │  │  └─ [id].jsx  # Dynamic route for individual facility pages.
│  │  └─ index.jsx    # Main dashboard view.
│  ├─ index.jsx       # Landing page of the application.
│  └─ signup          # User registration page.
│     └─ index.jsx
├─ public             # Public assets like images and static files.
│  ├─ favicon.ico     # Favicon for the application.
│  ├─ next.svg        # Next.js logo.
│  └─ vercel.svg      # Vercel logo.
└─ styles             # Styling files, possibly CSS or styled-components.
   └─ theme.js        # Theming configuration for consistent styling.
```

## 🚀 Getting Started

To set up and run this project locally, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/noureldineessam/awesome-pv-management-frontend.git
   cd awesome-pv-management-frontend
   ```

2. **Install dependencies:**

   Ensure you have Node.js and npm installed. Then run:

   ```sh
   npm install
   ```

3. **Environment Variables:**

   Create a `.env` file in the root directory and populate it with the necessary environment variables. For example:

   ```sh
   NEXT_PUBLIC_API_URL=http://localhost:4000/graphql
   ```

4. **Start the development server:**

   ```sh
   npm run dev
   ```

   This will start the server on [http://localhost:3000](http://localhost:3000).

5. **Build for production:**

   To build the project for production, run:

   ```sh
   npm run build
   ```

   And to start the production server:

   ```sh
   npm start
   ```

   For development you can run:
   ```sh
   npm run dev
   ```

## 📦 GraphQL Queries and Mutations

The application uses GraphQL for data fetching and manipulation. Below are the key queries and mutations categorized by entities.

### **User Queries and Mutations**

- **Queries**
  - `GET_USER`: Fetch a user by ID. Example:
    ```graphql
    query GetUser($id: ID!) {
      user(id: $id) {
        id
        name
        email
      }
    }
    ```
  - `USER_FACILITIES`: Fetch all facilities associated with the authenticated user.

- **Mutations**
  - `CREATE_USER`: Register a new user. Example:
    ```graphql
    mutation CreateUser($input: CreateUserInput!) {
      createUser(input: $input) {
        user {
          id
          name
          email
        }
        token
      }
    }
    ```
  - `LOGIN_USER`: Authenticate a user and obtain a JWT token.

### **Facility Queries and Mutations**

- **Queries**
  - `GET_FACILITY`: Fetch detailed information about a specific facility. Example:
    ```graphql
    query GetFacility($id: ID!) {
      facility(id: $id) {
        id
        name
        location
        capacity
      }
    }
    ```
  - `USER_FACILITIES`: Fetch a list of facilities for the logged-in user.

- **Mutations**
  - `CREATE_FACILITY`: Add a new facility to the system. Example:
    ```graphql
    mutation CreateFacility($input: CreateFacilityInput!) {
      createFacility(input: $input) {
        facility {
          id
          name
        }
      }
    }
    ```
  - `UPDATE_FACILITY`: Update an existing facility's details.
  - `DELETE_FACILITY`: Remove a facility from the system.

### **Report Queries and Mutations**

- **Queries**
  - `GET_REPORT`: Retrieve a specific report. Example:
    ```graphql
    query GetReport($id: ID!) {
      report(id: $id) {
        id
        date
        data
      }
    }
    ```
  - `FACILITY_REPORTS`: Get all reports for a particular facility.

- **Mutations**
  - `CREATE_REPORT`: Add a new report. Example:
    ```graphql
    mutation CreateReport($input: CreateReportInput!) {
      createReport(input: $input) {
        report {
          id
          date
          data
        }
      }
    }
    ```
  - `DELETE_REPORT`: Delete a specific report.

## 🛠️ Built With

- **Next.js**: For building the user interface.
- **Apollo Client**: For GraphQL state management and data fetching.
- **Material-UI**: For pre-built React components with a sleek design.
- **React Hook Form**: For form handling.


Certainly! Here's an additional section for improvements and potential enhancements that can be made to the `awesome-pv-management-frontend` project.

---

## 🚀 Future Improvements and Enhancements

There are several areas where we can improve functionality and user experience. Here are some proposed enhancements:

### 1. **Single Sign-On (SSO) with Auth0 and User Managment Module**

Integrating **Auth0** for authentication can simplify user login, provide secure access, and support multiple authentication methods (like Google, Facebook, etc.). This can improve security and user convenience.

  - Set up Auth0 account and configure the application.
  - Replace current authentication logic with Auth0's SDK.
  - Implement roles and permissions management.

### 2. **Server-Side Rendering (SSR) and Static Site Generation (SSG)**

Leveraging Next.js features like **Server-Side Rendering (SSR)** can enhance performance.

- **Server-Side Rendering (SSR):**
  - Use `getServerSideProps` for pages requiring real-time data fetching, such as dashboards and detailed views.
  - This will ensure that data is fetched server-side before rendering, improving load times.

### 3. **Enhanced Error Handling and Reporting**

Implement comprehensive error handling to ensure a smooth user experience and easier debugging.

  - Create global error handling for catching and displaying user-friendly error messages.
  - Implement error boundaries in React to catch errors in the component tree.
  - Log errors and monitor them using services like Sentry or LogRocket for proactive maintenance.

### 4. **Internationalization (i18n)**

Adding support for multiple languages can make the application accessible to a broader audience.

  - Set up Next.js i18n routing and localize all user-facing text.
  - Support language selection and dynamic content loading based on the user's preferences or locale.

### 5. **Performance Optimization**

Optimize application performance to ensure fast load times and a responsive user experience.

  - Implement lazy loading for heavy components and resources.
  - Use Next.js API routes or a separate microservice for heavy computations or data processing to offload the client.

### 6. **Improved Testing Coverage**

Expand automated testing to cover more parts of the application, ensuring robustness and reliability.

  - Implement unit test coverage, especially for critical components and business logic.
  - Implement end-to-end testing with tools like Cypress to test user flows.
