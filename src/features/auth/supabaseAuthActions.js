import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase, getSupabaseToken } from "../../utils/supabase";
import axios from "axios";
import { syncUserURL, getUserURL, verifyTokenURL, logoutUserURL } from "../../api/axiosUtil";
import getHeaders from "../../api/getHeaders";

// Register user with Supabase
export const registerWithSupabase = createAsyncThunk(
  'auth/registerWithSupabase',
  async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });

      if (error) throw error;

      return {
        user: data.user,
        session: data.session,
        message: 'Registration successful. Please check your email for verification.'
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Login user with Supabase
export const loginWithSupabase = createAsyncThunk(
  'auth/loginWithSupabase',
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Sync user with FastAPI backend
      await dispatch(syncUserWithBackend(data.session.access_token));

      return {
        user: data.user,
        session: data.session,
        token: data.session.access_token
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Google OAuth login/signup with Supabase (handles both automatically)
export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔵 Starting Google OAuth process...');
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });

      if (error) throw error;

      console.log('🔵 Google OAuth initiated successfully');
      return data;
    } catch (error) {
      console.error('🔴 Google OAuth failed:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Handle OAuth callback (works for both login and new signups)
export const handleAuthCallback = createAsyncThunk(
  'auth/handleAuthCallback',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      console.log('🟡 Processing OAuth callback...');
      console.log('🟡 Current URL:', window.location.href);
      console.log('🟡 URL hash:', window.location.hash);
      
      // Wait a bit for Supabase to process the OAuth callback
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if we have tokens in URL hash first (more reliable for OAuth flows)
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const hasOAuthTokens = hashParams.has('access_token') && hashParams.has('refresh_token');
      
      if (hasOAuthTokens) {
        console.log('🟡 Detected OAuth tokens in URL, processing directly...');
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const expiresAt = hashParams.get('expires_at');
        
        console.log('🟡 Setting session from URL tokens...');
        const sessionData = {
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: 3600,
          token_type: 'bearer'
        };
        
        if (expiresAt) {
          sessionData.expires_at = parseInt(expiresAt);
        }
        
        const { data: setSessionData, error: sessionError } = await supabase.auth.setSession(sessionData);
        
        if (sessionError) {
          console.error('🔴 Failed to set session from URL tokens:', sessionError);
          throw sessionError;
        }
        
        if (setSessionData.session) {
          console.log('🟢 Session established from URL tokens');
          console.log('🟢 Session user:', setSessionData.session.user.email);
          
          // Clean up the URL by removing hash
          window.history.replaceState(null, null, window.location.pathname);
          
          // Check if this is a new user
          const isNewUser = setSessionData.session.user.created_at === setSessionData.session.user.last_sign_in_at;
          
          // Always sync user with FastAPI backend
          await dispatch(syncUserWithBackend(setSessionData.session.access_token));
          
          return {
            user: setSessionData.session.user,
            session: setSessionData.session,
            token: setSessionData.session.access_token,
            isNewUser
          };
        }
      }
      
      // Fallback to regular session check
      const { data: authData, error: authError } = await supabase.auth.getSession();
      
      if (authError) {
        console.log('🟠 Session error:', authError.message);
        console.log('🟠 Trying to get user from URL hash...');
        
        // If getting session fails, try to handle the OAuth response from URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const expiresAt = hashParams.get('expires_at');
        
        console.log('🟡 Hash parameters found:');
        console.log('  - access_token:', accessToken ? 'present' : 'missing');
        console.log('  - refresh_token:', refreshToken ? 'present' : 'missing');
        console.log('  - expires_at:', expiresAt);
        
        if (accessToken && refreshToken) {
          console.log('🟡 Found tokens in URL hash, setting session...');
          
          // Construct the session object with expiration
          const sessionData = {
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: 3600, // Default to 1 hour
            token_type: 'bearer'
          };
          
          if (expiresAt) {
            sessionData.expires_at = parseInt(expiresAt);
          }
          
          const { data: setSessionData, error: sessionError } = await supabase.auth.setSession(sessionData);
          
          if (sessionError) {
            console.error('🔴 Failed to set session:', sessionError);
            throw sessionError;
          }
          
          if (setSessionData.session) {
            console.log('🟢 Session established from URL tokens');
            console.log('🟢 Session user:', setSessionData.session.user.email);
            
            // Clean up the URL by removing hash
            window.history.replaceState(null, null, window.location.pathname);
            
            // Always sync user with FastAPI backend
            await dispatch(syncUserWithBackend(setSessionData.session.access_token));
            
            return {
              user: setSessionData.session.user,
              session: setSessionData.session,
              token: setSessionData.session.access_token,
              isNewUser: false // We can't easily determine this from URL flow
            };
          } else {
            console.log('🟠 setSession succeeded but no session returned');
          }
        } else {
          console.log('🟠 Missing required tokens in URL hash');
          console.log('🟠 Available hash parameters:', Array.from(hashParams.keys()));
        }
        
        // Try to wait for auth state to change
        console.log('🟡 Waiting for auth state change...');
        return new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('Auth callback timeout - no session found'));
          }, 10000); // 10 second timeout
          
          const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
              console.log('🟡 Auth state changed:', event);
              
              if (session) {
                clearTimeout(timeout);
                subscription.unsubscribe();
                
                console.log('🟢 Session found via state change');
                try {
                  await dispatch(syncUserWithBackend(session.access_token));
                  resolve({
                    user: session.user,
                    session: session,
                    token: session.access_token,
                    isNewUser: false
                  });
                } catch (syncError) {
                  reject(syncError);
                }
              } else if (event === 'SIGNED_OUT') {
                clearTimeout(timeout);
                subscription.unsubscribe();
                reject(new Error('User was signed out during callback'));
              }
            }
          );
        });
      }
      
      if (authData.session) {
        console.log('🟡 OAuth session found for user:', authData.session.user.email);
        console.log('🟡 User metadata:', authData.session.user.user_metadata);
        
        // Check if this is a new user (first time login via Google)
        const isNewUser = authData.session.user.created_at === authData.session.user.last_sign_in_at;
        
        if (isNewUser) {
          console.log('🟢 New user detected - will sync with backend');
        } else {
          console.log('🟢 Returning user - will sync with backend');
        }
        
        // Always sync user with FastAPI backend (handles both new and existing users)
        await dispatch(syncUserWithBackend(authData.session.access_token));
        
        return {
          user: authData.session.user,
          session: authData.session,
          token: authData.session.access_token,
          isNewUser
        };
      }

      throw new Error('No session found after OAuth callback');
    } catch (error) {
      console.error('🔴 OAuth callback failed:', error);
      return rejectWithValue(error.message || 'OAuth callback failed');
    }
  }
);

// Sync user with FastAPI backend (handles both new signups and existing logins)
export const syncUserWithBackend = createAsyncThunk(
  'auth/syncUserWithBackend',
  async (token, { rejectWithValue }) => {
    try {
      console.log('🟡 Syncing user with FastAPI backend...');
      
      const { data } = await axios.post(
        syncUserURL,
        {}, // Empty body - user data comes from JWT token
        getHeaders(token)
      );
      
      console.log('🟢 User sync successful:', data);
      return data;
    } catch (error) {
      console.error('🟠 Failed to sync user with backend:', error.response?.data || error.message);
      
      // Check if it's a 404/500 (backend issue) vs 401 (auth issue)
      if (error.response?.status === 401) {
        console.error('🔴 Authentication failed during sync - token might be invalid');
        console.error('🔴 Response:', error.response?.data);
        // Don't reject with value - OAuth succeeded, just backend sync failed
        console.log('🟠 OAuth succeeded, continuing without backend sync');
        return null;
      }
      
      // For other errors, don't reject - user can still use the app with Supabase auth
      console.log('🟠 Backend sync failed but continuing - user can still use Supabase auth');
      console.log('🟠 Error details:', error.response?.data || error.message);
      return null;
    }
  }
);

// Get current user profile
export const getCurrentUserProfile = createAsyncThunk(
  'auth/getCurrentUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = await getSupabaseToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      const { data } = await axios.get(getUserURL, getHeaders(token));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || error.message);
    }
  }
);

// Logout user
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Optional: Notify backend (don't fail if this fails)
      try {
        const token = await getSupabaseToken();
        if (token) {
          await axios.post(logoutUserURL, {}, getHeaders(token));
        }
      } catch (backendError) {
        console.log('Backend logout failed (non-critical):', backendError);
      }

      // Clear local storage
      localStorage.removeItem("userToken");
      localStorage.removeItem("user");
      localStorage.removeItem("newPlanId");

      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Reset password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) throw error;

      return { message: 'Password reset email sent successfully' };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update password
export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async ({ newPassword }, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      return { message: 'Password updated successfully' };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);