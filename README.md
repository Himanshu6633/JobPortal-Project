# JobPortal

A full-stack job portal application with separate frontend and backend workspaces.

## Tech Stack

- Frontend: React, Vite, Redux Toolkit, Tailwind CSS, Radix UI
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, Multer, Cloudinary

## Project Structure

```text
JobPortal/
  Backend/
  Frontend/
```

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB database (local or cloud)
- Cloudinary account (for image/file uploads)

## Setup

### 1. Clone and Install Dependencies

Install backend dependencies:

```bash
cd Backend
npm install
```

Install frontend dependencies:

```bash
cd ../Frontend
npm install
```

### 2. Backend Environment Variables

Create a `.env` file inside `Backend/` and set values like:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
```

Note: Variable names should match what your backend code expects.

## Run the App

### Start Backend

From `Backend/`:

```bash
npm run dev
```

(Production mode)

```bash
npm start
```

### Start Frontend

From `Frontend/`:

```bash
npm run dev
```

The frontend will run on Vite default URL (usually `http://localhost:5173`).

## Available Scripts

### Backend

- `npm run dev` - Start backend with nodemon
- `npm start` - Start backend with node

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Notes

- Backend and frontend run as separate services.
- Ensure CORS settings in backend allow your frontend origin.
- If uploads are used, verify Cloudinary credentials are valid.
