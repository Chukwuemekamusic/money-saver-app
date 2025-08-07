# 🚀 Frontend Migration Guide - Django to FastAPI + Supabase

## 📋 Overview

This guide documents the changes made during the migration from Django backend to FastAPI + Supabase authentication system.

---

## 🔄 **Major Changes Made**

### **1. API Endpoints Updated**

**Old Django URLs → New FastAPI URLs**

```javascript
// Before (Django)
POST   /api/user/register-auth/           → Registration  
POST   /api/user/login/                   → Login
GET    /api/user/get/                     → Get user profile
POST   /api/user/logout-now/              → Logout
POST   /api/user/savingplan/create/       → Create plan
GET    /api/user/savingplan/              → List plans
GET    /api/user/savingplan/{id}/         → Plan details
PATCH  /api/weeklyamount/update/{id}/     → Update amounts

// After (FastAPI)
POST   /api/v1/auth/sync-user             → Sync user with backend
GET    /api/v1/auth/me                    → Get user profile  
POST   /api/v1/auth/logout                → Logout
POST   /api/v1/savings/plans              → Create plan
GET    /api/v1/savings/plans              → List plans
GET    /api/v1/savings/plans/{id}         → Plan details
PUT    /api/v1/savings/weekly-amounts/{id} → Update amounts
POST   /api/v1/savings/weekly-amounts/{id}/select → Quick select
GET    /api/v1/savings/stats              → User statistics
```

### **2. Authentication System Overhaul**

**Before: Custom Django Authentication**
- Custom user registration endpoints
- Token-based authentication (`Token xyz123`)
- Manual email verification system
- Custom Google OAuth implementation

**After: Supabase Authentication**
- Supabase handles all authentication
- JWT Bearer tokens (`Bearer eyJhbGciOi...`)
- Built-in email verification
- Native Google OAuth support

### **3. New Auth Components**

**New Components Created:**
```
src/features/auth/
├── supabaseAuthActions.js          # New Supabase auth actions
├── authSliceNew.js                 # Enhanced auth state management
└── utils/
    ├── useSupabaseAuth.js          # Auth state hook
    └── useHandleLogout.jsx         # Updated logout handler

src/features/users/components/
├── SupabaseLoginForm.jsx           # Modern login form
├── SupabaseRegisterForm.jsx        # Registration with verification
└── AuthCallback.jsx                # OAuth callback handler

src/utils/
└── supabase.js                     # Supabase client configuration
```

### **4. Component Updates**

**Updated for New Auth System:**
- `ProtectedRoute.jsx` - Enhanced auth checking
- `Navbar.jsx` - Updated auth state detection
- `Verification.jsx` - Supabase email verification
- `App.js` - Uses new auth slice
- All auth-related components

### **5. Environment Variables**

**New Environment Variables Required:**
```bash
# .env file
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
REACT_APP_API_URL=http://localhost:8000/api/v1
```

---

## ⚡ **Breaking Changes**

### **1. Auth State Structure**

**Before:**
```javascript
const userInfo = useSelector(SelectUserInfo)
const userToken = useSelector(SelectToken)
```

**After (Enhanced):**
```javascript
import { SelectUserInfo, SelectToken, SelectIsAuthenticated } from '../features/auth/authSliceNew'

const userInfo = useSelector(SelectUserInfo)
const userToken = useSelector(SelectToken)
const isAuthenticated = useSelector(SelectIsAuthenticated) // New!
```

### **2. Auth Actions**

**Before:**
```javascript
import { loginUser, registerUser } from '../features/auth/authActions'

dispatch(loginUser({ email, password }))
dispatch(registerUser({ email, password, first_name, last_name }))
```

**After:**
```javascript
import { loginWithSupabase, registerWithSupabase } from '../features/auth/supabaseAuthActions'

dispatch(loginWithSupabase({ email, password }))
dispatch(registerWithSupabase({ email, password, firstName, lastName }))
```

### **3. Token Handling**

**Before:**
```javascript
// Manual token from localStorage
const token = JSON.parse(localStorage.getItem('userToken'))
```

**After:**
```javascript
// Automatic Supabase token
import { getSupabaseToken } from '../utils/supabase'

const token = await getSupabaseToken()
```

---

## 🔧 **Backward Compatibility**

The migration maintains backward compatibility by:

1. **Dual Auth Support**: New auth slice supports both old and new auth methods
2. **Legacy URL Mapping**: Old URLs are mapped to new endpoints where possible  
3. **Gradual Migration**: Components can be updated individually
4. **Fallback Mechanisms**: Token handling falls back to localStorage if Supabase fails

---

## 🧪 **Testing the Migration**

### **Automated Checks**

The migration includes these safety measures:

1. **Import fixes applied automatically** to all components
2. **Enhanced error handling** for auth failures  
3. **Fallback token system** for transition period
4. **Console logging** for debugging auth issues

### **Manual Testing Required**

1. **User Registration Flow**
   - Sign up with email/password
   - Verify email verification works
   - Test login after verification

2. **Authentication Persistence** 
   - Login and refresh page
   - Verify user stays logged in
   - Test logout clears all state

3. **API Operations**
   - Create savings plans
   - List existing plans
   - Update weekly amounts
   - Delete plans (soft delete)

4. **Google OAuth**
   - Test Google sign-in flow
   - Verify redirect callback works
   - Check user info populates correctly

---

## 🚨 **Common Issues & Solutions**

### **Issue: "Cannot read property of undefined" in auth components**

**Cause**: Component still using old auth slice selectors

**Solution**: 
```javascript
// Replace old import
import { SelectUserInfo } from '../features/auth/authSlice'
// With new import  
import { SelectUserInfo } from '../features/auth/authSliceNew'
```

### **Issue: "Network Error" on API calls**

**Cause**: Backend not running or wrong URL

**Solution**:
1. Start FastAPI backend: `cd fastapi-money-saver && uvicorn app.main:app --reload`
2. Check `REACT_APP_API_URL` in `.env` file

### **Issue: "Invalid JWT token" errors**

**Cause**: Token expiration or format mismatch

**Solution**:
1. Logout and login again to get fresh token
2. Check token format (should be JWT, not simple token)

### **Issue: Email verification not working**

**Cause**: Supabase email settings or redirect URLs

**Solution**:
1. Check Supabase project email templates are enabled
2. Verify redirect URLs match exactly in Supabase dashboard

### **Issue: Google OAuth redirect fails**

**Cause**: OAuth settings mismatch

**Solution**:
1. Verify Google OAuth client ID in Supabase
2. Check redirect URLs in both Google Console and Supabase
3. Ensure `AuthCallback` component is properly routed

---

## 📈 **Performance Improvements**

The migration provides these performance benefits:

1. **Reduced Auth Complexity**: Supabase handles auth infrastructure
2. **Better Token Management**: JWT tokens with automatic refresh
3. **Improved Error Handling**: More granular error states
4. **Enhanced Security**: Built-in security best practices via Supabase
5. **Modern Auth UX**: Better user experience with email verification

---

## 🎯 **Next Steps After Migration**

1. **Remove Legacy Code**: After thorough testing, remove old auth components
2. **Update Documentation**: Update API documentation for new endpoints  
3. **Production Deployment**: Deploy both frontend and backend to production
4. **Monitor Usage**: Track auth success rates and user feedback
5. **Add Enhanced Features**: Implement additional features like social logins

---

## 📞 **Support**

If you encounter issues during the migration:

1. **Check Console Logs**: Browser dev tools often show specific error details
2. **Review Network Tab**: Verify API requests are going to correct endpoints
3. **Test Backend Directly**: Use tools like Postman to test FastAPI endpoints
4. **Verify Environment**: Ensure all environment variables are set correctly

The migration maintains full backward compatibility while providing a path to modern authentication infrastructure.