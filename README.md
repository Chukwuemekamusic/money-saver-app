# Money Saver App

A modern React frontend for a personal finance application that helps users create and track saving plans with automated weekly reminders.

**Live Site:** [https://moneysaverapp.netlify.app/](https://moneysaverapp.netlify.app/)

## Project Structure

This project consists of two main components:

- **Frontend**: [money-saver-app](https://github.com/Chukwuemekamusic/money-saver-app) (current repository)
- **Backend API**: [fastapi-money-saver](https://github.com/Chukwuemekamusic/money-saver-api) (FastAPI backend)

> **Note**: The previous Django backend ([backend-money-saver-app](https://github.com/Chukwuemekamusic/backend-money-saver-app)) has been replaced with a modern FastAPI implementation.

## ✨ Features

- **User Authentication** - Supabase Auth integration with Google OAuth
- **Savings Management** - Create, update, and track multiple saving plans
- **Progress Tracking** - Real-time statistics and completion tracking
- **Weekly Reminders** - Automated email notifications to stay motivated
- **Responsive Design** - Optimized for desktop and mobile devices
- **Modern UI** - Clean interface with Tailwind CSS styling

## 🛠️ Technologies Used

- **Frontend**: React 18, Redux Toolkit, React Router
- **Backend**: FastAPI with PostgreSQL (Supabase)
- **Authentication**: Supabase Auth + Google OAuth
- **Styling**: Tailwind CSS, CSS Modules
- **State Management**: Redux Toolkit
- **Forms**: React Hook Form with Yup validation
- **HTTP Client**: Axios

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16.0.0 or higher)
- **Python** (v3.11 or higher) - for backend setup
- **Supabase Account** - for database and authentication

### Frontend Setup

1. **Clone the frontend repository:**

   ```bash
   git clone https://github.com/Chukwuemekamusic/money-saver-app.git
   cd money-saver-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory:

   ```env
   REACT_APP_SUPABASE_URL=https://your-project.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your_anon_key
   REACT_APP_BACKEND_URL=http://localhost:8000
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. **Start the development server:**

   ```bash
   npm start
   ```

5. **Open your browser and navigate to** `http://localhost:3000`

### Backend Setup (Optional for Development)

If you want to run the backend locally:

1. **Clone the backend repository:**

   ```bash
   git clone https://github.com/Chukwuemekamusic/money-saver-api.git
   cd fastapi-money-saver
   ```

2. **Set up Python environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Configure environment variables** (see backend repository for details)

4. **Run database migrations:**

   ```bash
   alembic upgrade head
   ```

5. **Start the FastAPI server:**

   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

The API will be available at `http://localhost:8000` with documentation at `http://localhost:8000/docs`

## 📁 Project Structure

```
money-saver-app/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable React components
│   ├── features/         # Feature-based modules
│   │   ├── auth/        # Authentication logic
│   │   ├── savings/     # Savings management
│   │   └── users/       # User management
│   ├── api/             # API utilities and configurations
│   ├── app/             # Redux store configuration
│   ├── contexts/        # React contexts
│   ├── utils/           # Utility functions
│   └── assets/          # Images and icons
├── package.json
└── README.md
```

## 🚀 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🔐 Environment Variables

The following environment variables are required:

| Variable                      | Description                 | Example                            |
| ----------------------------- | --------------------------- | ---------------------------------- |
| `REACT_APP_SUPABASE_URL`      | Your Supabase project URL   | `https://xxxxx.supabase.co`        |
| `REACT_APP_SUPABASE_ANON_KEY` | Your Supabase anonymous key | `eyJhbGciOiJIUzI1NiI...`           |
| `REACT_APP_BACKEND_URL`       | FastAPI backend URL         | `http://localhost:8000`            |
| `REACT_APP_GOOGLE_CLIENT_ID`  | Google OAuth client ID      | `xxxxx.apps.googleusercontent.com` |

## 🔄 API Integration

This frontend integrates with the FastAPI backend through:

- **Authentication**: Supabase Auth with JWT tokens
- **Data Fetching**: Axios HTTP client with interceptors
- **State Management**: Redux Toolkit for global state
- **Error Handling**: Centralized error boundary components

Key API endpoints used:

- `POST /api/v1/auth/sync-user` - User authentication
- `GET /api/v1/savings/plans` - Fetch savings plans
- `POST /api/v1/savings/plans` - Create new saving plan
- `PUT /api/v1/savings/plans/{id}` - Update existing plan

## 🧪 Testing

Run the test suite:

```bash
npm test
```

The app includes tests for:

- Component rendering
- User interactions
- API integration
- State management

## 📦 Building for Production

1. **Build the application:**

   ```bash
   npm run build
   ```

2. **Deploy to Netlify** (recommended):
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Configure environment variables

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes and test thoroughly**
4. **Follow the existing code style and conventions**
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to your branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Guidelines

- Use meaningful component and function names
- Follow React best practices and hooks patterns
- Maintain consistent styling with Tailwind CSS
- Write tests for new features
- Update documentation as needed

## 📞 Support & Documentation

- **Live App**: [https://moneysaverapp.netlify.app/](https://moneysaverapp.netlify.app/)
- **Backend API**: [FastAPI Money Saver](https://github.com/Chukwuemekamusic/money-saver-api)
- **Issues**: Create a GitHub issue for bug reports or feature requests

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

**Built with ❤️ using React and FastAPI**
