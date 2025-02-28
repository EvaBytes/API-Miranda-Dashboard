# API-Miranda-Dashboard
This project is a simple Express-based API for managing hotel operations, including room bookings, user registration, and contact management, along with user authentication via JWT. The API serves various functionalities, such as retrieving booking information, handling room details, and enabling contact message management. The project includes Swagger documentation for API endpoints, which can be accessed via the /doc endpoint for easy exploration.

**Key Features:**
- Authentication: JWT-based login system for user authentication.
- Bookings: Endpoints to get all bookings, retrieve bookings by reservation number, and create new bookings.
- Rooms: Allows users to get information about available rooms.
- Contacts: Supports creating new contact messages and deleting them based on room numbers.
- Users: Employers relevant information.

**API Endpoints:**
- /api/v1/bookings: Get all bookings.
- /api/v1/bookings/{reservationNumber}: Get a booking by reservation number.
- /api/v1/rooms: Get available room information.
- /api/v1/contact: Create a new contact message.
- /api/v1/contact/{roomNumber}: Delete a contact message.
- /api/v1/users: Register a new user.
- /api/v1/login: Login endpoint to authenticate users and generate JWT tokens.


**Setup:**
1. Clone the repository.
2. Install dependencies using npm install.
3. Configure environment variables using a .env file (including SECRET_KEY).
4. Run the server using npm start (defaults to port 3000).

**Tools Used:**
- Express: Web framework for Node.js.
- JWT: For handling user authentication and token generation.
- Swagger UI & Swagger JSDoc: For API documentation and testing.
