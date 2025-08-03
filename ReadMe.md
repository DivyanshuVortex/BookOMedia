# Project Name

A full-stack web application built with modern technologies for seamless user experience and robust backend functionality.

## 📸 Screenshots

<!-- Add your project screenshots here -->
![Homepage](./screenshots/homepage.png)
![Dashboard](./screenshots/dashboard.png)
![Mobile View](./screenshots/mobile.png)

## 🚀 Tech Stack

### Frontend
- **React** - UI library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework for styling
- **LocalStorage** - Client-side data persistence

### Backend
- **Express.js** - Fast, unopinionated web framework for Node.js
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing library
- **Zod** - TypeScript-first schema validation

### DevOps & Tools
- **Docker** - Containerization platform
- **Docker Compose** - Multi-container Docker applications

## 🛠️ Installation & Setup

### Method 1: Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/DivyanshuVortex/BookOMedia.git
   cd BookOMedia
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

### Method 2: Traditional Setup

#### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

#### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/your-project-name.git
   cd your-project-name
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (see [Environment Variables](#environment-variables))

5. **Start the backend server**
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 🔧 Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=3000

# Database
MONGODB_URI=mongodb://localhost:27017/your-database-name
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/database-name

## 🔑 Key Features

- **User Authentication** - Secure login/signup with JWT tokens
- **Password Security** - Bcrypt hashing for password protection
- **Data Validation** - Zod schema validation for API requests
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Persistent Storage** - LocalStorage for client-side data
- **MongoDB Integration** - Mongoose ODM for database operations
- **Containerized** - Docker support for easy deployment


## 🚀 Future Plans

- [ ] **File Upload System** - Implement image/document upload functionality
- [ ] **Cloud Deployment** - Deploy to AWS/Heroku/Vercel
- [ ] **Email Notifications** - Add email service integration
- [ ] **Advanced Search** - Elasticsearch integration


