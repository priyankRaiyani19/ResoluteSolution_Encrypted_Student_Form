# ResoluteSolution: Encrypted Student Form

A full-stack web application for managing student records with secure authentication, encrypted data storage, and a modern UI built with React and Tailwind CSS.

## GitHub Repository

[https://github.com/priyankRaiyani19/ResoluteSolution_Encrypted_Student_Form.git](https://github.com/priyankRaiyani19/ResoluteSolution_Encrypted_Student_Form.git)

## Tech Stack

### Frontend (Client)
- **React 19.2.5**: JavaScript library for building user interfaces
- **TypeScript ~6.0.2**: Typed superset of JavaScript
- **Vite 8.0.10**: Fast build tool and development server
- **Tailwind CSS v4**: Utility-first CSS framework for styling
- **Axios 1.16.0**: HTTP client for API requests
- **Crypto-JS 4.2.0**: Library for client-side encryption/decryption
- **React Icons**: Icon library for UI elements
- **React Hot Toast**: For toast notifications

### Backend (Server)
- **Node.js with Express 5.2.1**: Server framework for API routes
- **TypeScript ~6.0.2**: For type safety
- **MongoDB with Mongoose 9.6.2**: NoSQL database for data persistence
- **bcryptjs**: For password hashing
- **Crypto-JS 4.2.0**: For server-side encryption utilities

### Development Tools
- **ESLint**: Linting for code quality
- **Vite Plugins**: For React and Tailwind integration

## Setup Instructions

### Prerequisites
- Node.js (version 18 or higher)
- MongoDB (local or cloud instance, e.g., MongoDB Atlas)
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/priyankRaiyani19/ResoluteSolution_Encrypted_Student_Form.git
   cd ResoluteSolution_Encrypted_Student_Form
   ```

2. **Install client dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies:**
   ```bash
   cd ../server
   npm install
   ```

4. **Set up environment variables:**
   - In the `server` directory, create a `.env` file with:
     ```
     MONGO_URI=mongodb://localhost:27017/resolute_db  # or your MongoDB connection string
     PORT=5000
     ```

5. **Start the server:**
   ```bash
   cd server
   npm run dev
   ```
   The server will run on `http://localhost:5000`.

6. **Start the client (in a new terminal):**
   ```bash
   cd client
   npm run dev
   ```
   The client will run on `http://localhost:5173` (default Vite port).

7. **Build for production (optional):**
   - Client: `cd client && npm run build`
   - Server: `cd server && npm run build`

### Usage
- Open the client in your browser.
- Register or log in with your credentials.
- Create, view, update, or delete student records.
- Student data is encrypted before storage.

## Encryption Implementation

The application implements end-to-end encryption for sensitive student data to ensure privacy and security.

### Client-Side Encryption
- **Library Used:** Crypto-JS (AES encryption)
- **Process:**
  - Student form data (name, email, phone, course, password) is encrypted on the client before sending to the server.
  - A shared secret key is used for encryption/decryption (stored securely in the client code for this demo; in production, use environment variables or key management).
- **Files:** `client/src/utils/crypto.ts` contains `encryptData` and `decryptData` functions.

### Server-Side Storage
- Encrypted data is stored in MongoDB as-is.
- Passwords for user authentication are hashed using bcryptjs on the server.
- **Files:** `server/src/utils/crypto.ts` for any server-side crypto utilities.

### Security Notes
- This is a demonstration; in a real-world application, implement proper key management, use HTTPS, and follow security best practices.
- Data is decrypted only on the client for display.

## API Endpoints

- `POST /api/register` - Create a new student
- `GET /api/students` - Retrieve all students
- `PUT /api/student/:id` - Update a student by ID
- `DELETE /api/student/:id` - Delete a student by ID
- `POST /api/login` - User login
- `POST /api/signup` - User registration
- `GET /api/courses` - Get list of available courses

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Submit a pull request.

## License

This project is for educational purposes.