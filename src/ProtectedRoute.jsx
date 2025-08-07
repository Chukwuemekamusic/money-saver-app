import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { SelectToken, SelectUserInfo, SelectIsAuthenticated, resetAuth } from "./features/auth/authSliceNew";
import useCustomNavigation from "./utils/useCustomNavigation";
import { getUser } from "./features/auth/authActions";
import { Outlet } from "react-router-dom";
import { listSavingPlan } from "./features/savings/savingAction";
import useSupabaseAuth from "./features/auth/utils/useSupabaseAuth";
// import useCheckAuth from "./features/auth/utils/useCheckAuth";

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch()
    const userToken = useSelector(SelectToken)
    const userInfo = useSelector(SelectUserInfo)
    const isAuthenticated = useSelector(SelectIsAuthenticated)
    const { navigateLanding } = useCustomNavigation()
    
    // Initialize Supabase auth
    const { isAuthenticated: supabaseAuth } = useSupabaseAuth()

    useEffect(() => {
        console.log('ProtectedRoute - checking auth state');
        console.log('Token:', !!userToken, 'User:', !!userInfo, 'Authenticated:', isAuthenticated);

        // Check authentication status
        if (!isAuthenticated && !supabaseAuth && !userToken) {
            console.log('Not authenticated - redirecting to landing');
            dispatch(resetAuth())
            navigateLanding()
        } else if ((userToken || supabaseAuth) && !userInfo) {
            console.log('Has token but no user info - fetching user');
            dispatch(getUser())
        }

        // Load user's savings plans if authenticated
        if (isAuthenticated || supabaseAuth || userToken) {
            dispatch(listSavingPlan());
        }
    }, [userToken, userInfo, isAuthenticated, supabaseAuth, dispatch, navigateLanding])

    // Don't render children if not authenticated
    if (!isAuthenticated && !supabaseAuth && !userToken) {
        return null;
    }

    return children ? children : <Outlet />
};

export default ProtectedRoute;
