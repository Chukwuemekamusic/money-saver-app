# Frontend Integration Testing Guide

## 🧪 Testing the FastAPI Integration

### Prerequisites

1. **Backend Running**: Ensure your FastAPI backend is running at `http://localhost:8000`
2. **Environment Variables**: Create `.env` file in your React app root:

```bash
# Create .env file
cp .env.example .env

# Edit .env with your Supabase credentials
REACT_APP_SUPABASE_URL=https://vbvfacqokpymbiytmqhr.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-actual-supabase-anon-key
REACT_APP_API_URL=http://localhost:8000/api/v1
```

### Testing Steps

#### 1. Start the Development Server
```bash
cd money-saver-app
npm start
```

#### 2. Test Authentication Flow

**A. Registration:**
- Navigate to registration page
- Fill out form with valid email/password
- Verify email verification message appears
- Check your email for verification link

**B. Login:**
- Use the new Supabase login form
- Test email/password login
- Test "Forgot Password" functionality
- Test Google OAuth login

**C. Authentication Persistence:**
- Login and refresh the page
- Verify you stay logged in
- Test logout functionality

#### 3. Test Savings CRUD Operations

**A. Create Savings Plan:**
- Login successfully
- Navigate to create savings plan
- Fill out form and submit
- Verify plan appears in list

**B. List Savings Plans:**
- Verify all your plans are displayed
- Check pagination if you have many plans
- Verify plan details show correctly

**C. View Plan Details:**
- Click on a specific plan
- Verify all weekly amounts display
- Test selecting/deselecting weeks
- Verify progress calculations

**D. Update Operations:**
- Edit a savings plan
- Update weekly amounts
- Verify changes persist after refresh

**E. Delete Operations:**
- Delete a savings plan
- Verify it's removed from the list
- Confirm soft delete (data preserved in backend)

#### 4. Test Error Handling

**A. Network Errors:**
- Turn off backend server
- Try API operations
- Verify user-friendly error messages

**B. Authentication Errors:**
- Try accessing protected routes without login
- Test with invalid credentials
- Verify proper redirects to login

**C. Validation Errors:**
- Submit forms with invalid data
- Verify validation messages appear
- Test edge cases (empty fields, invalid emails)

#### 5. Test Cross-Browser Compatibility

- Test in Chrome, Firefox, Safari
- Verify responsive design on mobile
- Check all authentication flows work

### Expected Results

✅ **Authentication:**
- Supabase login/register works
- Google OAuth redirects properly
- JWT tokens are stored and used
- Users stay logged in after refresh

✅ **API Integration:**
- All CRUD operations work
- Proper error handling
- Loading states show
- Data persists correctly

✅ **User Experience:**
- Smooth navigation
- No console errors
- Responsive design
- Clear feedback messages

### Common Issues & Solutions

**Issue**: "Network Error" on API calls
- **Solution**: Verify backend is running on `http://localhost:8000`
- **Check**: CORS settings allow frontend origin

**Issue**: Authentication not working
- **Solution**: Verify `.env` file has correct Supabase keys
- **Check**: Supabase project settings and redirect URLs

**Issue**: "Invalid JWT token" errors
- **Solution**: Logout and login again to get fresh token
- **Check**: Token expiration and refresh logic

**Issue**: Google OAuth not working
- **Solution**: Verify Google OAuth is configured in Supabase
- **Check**: Redirect URLs match exactly

### Success Criteria

- [ ] User can register and verify email
- [ ] User can login with email/password
- [ ] Google OAuth login works
- [ ] User stays logged in after page refresh
- [ ] All savings CRUD operations work
- [ ] Error messages are user-friendly
- [ ] No JavaScript console errors
- [ ] Mobile responsive design works
- [ ] Cross-browser compatibility confirmed

### Next Steps After Testing

If testing is successful, you're ready for:
- **Step 7**: End-to-End Testing & Validation
- **Step 8**: Production Deployment
- **Step 9**: Performance Optimization
- **Step 10**: Enhanced Features

### Reporting Issues

If you encounter issues during testing:
1. Check browser console for errors
2. Verify backend logs for API errors
3. Confirm environment variables are set correctly
4. Test with network tab open to see API requests

The integration should work seamlessly with your existing FastAPI backend!