import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { supabase } from '../../../utils/supabase'
import { setUser, resetAuth } from '../authSliceNew'
import { SelectIsAuthenticated, SelectUserInfo } from '../authSliceNew'

const useSupabaseAuth = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(SelectIsAuthenticated)
  const userInfo = useSelector(SelectUserInfo)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        dispatch(setUser({
          token: session.access_token,
          user: session.user
        }))
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        
        if (event === 'SIGNED_IN' && session) {
          dispatch(setUser({
            token: session.access_token,
            user: session.user
          }))
        } else if (event === 'SIGNED_OUT') {
          dispatch(resetAuth())
        } else if (event === 'TOKEN_REFRESHED' && session) {
          dispatch(setUser({
            token: session.access_token,
            user: session.user
          }))
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [dispatch])

  return {
    isAuthenticated,
    user: userInfo
  }
}

export default useSupabaseAuth