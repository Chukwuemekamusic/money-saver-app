# MoneySaver App

MoneySaver is a web application designed to help users manage their savings goals and track their financial progress.

**Live Site:** [https://moneysaverapp.netlify.app/](https://moneysaverapp.netlify.app/)

## Project Structure

This project is split into two repositories:

- Frontend: [money-saver-app](https://github.com/Chukwuemekamusic/money-saver-app) (current repository)
- Backend: [backend-money-saver-app](https://github.com/Chukwuemekamusic/backend-money-saver-app)

## Features

- User authentication and account management
- Create and manage multiple savings plans
- Track progress towards savings goals
- Visualize savings data with charts and graphs
- Responsive design for desktop and mobile use
- Google OAuth for authentication

## Technologies Used

- Frontend: React.js
- Backend: Django (Python)
- Database: PostgreSQL
- Authentication: Google OAuth
- Styling: CSS Modules

## Getting Started

### Prerequisites

- Node.js (version X.X.X)
- Python (version X.X.X)
- PostgreSQL (version X.X)

### Installation

1. Clone both repositories:
   ```
   git clone https://github.com/Chukwuemekamusic/money-saver-app.git
   git clone https://github.com/Chukwuemekamusic/backend-money-saver-app.git
   ```

2. Set up the backend and run the server:
   ```
   cd backend-money-saver-app
   python -m venv env
   source env/bin/activate  # On Windows use `env\Scripts\activate`
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

3. Set up the frontend and run the server:
   ```
   cd ../money-saver-app
   npm install
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request to either the frontend or backend repository.

## License

This project is licensed under the [MIT License](LICENSE).
