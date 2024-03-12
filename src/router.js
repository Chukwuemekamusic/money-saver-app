import {createBrowserRouter} from 'react-router-dom'
import Home from './components/HomePage'
import LandingPage from './components/LandingPage'
import ErrorPage from './components/ErrorPage'
import LoginForm from './features/users/components/LoginForm'
import CreateUserForm from './features/users/components/CreateUserForm'
import SavingPlanDetail from './features/savings/SavingPlanDetail'
import SavingPlanList from './features/savings/SavingPlanList'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,        
    },
    {
        path: '/landing',
        element: <LandingPage />,
        children: [
            {
                path: '/login',
                element: <LoginForm />,
            },
            {
                path: '/register',
                element: <CreateUserForm />
            },
        ]
    },
    {
        path: '/login',
        element: <LoginForm />,
    },
    {
        path: '/register',
        element: <CreateUserForm />
    },
    {
        path: '/saving_plan',
        element: <SavingPlanList />
    },
    {
        path: '/saving_plan/:id',
        element: <SavingPlanDetail />
    }
])

{/* <Route element={<CreateUserForm />} path="/register" />
        <Route element={<LoginForm />} path="/login" />
        <Route element={<LandingPage />} path="/landing" />
        <Route element={<Home />} path="/" />
        <Route element={<SavingPlanDetail />} path="/saving_plan/" /> */}