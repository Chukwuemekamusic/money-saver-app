export const errorCheck = (error) => {
    let message;
    if (error.response) {
        // Invalid Email
        if (
            error.response.data.email &&
            error.response.data.email[0] === "Enter a valid email address."
        ) {
            message = "Enter a valid email address."
        }
        // Handle API error (status code 4xx or 5xx)
        console.error(error.response.data);
        //   if (error.response.data.detail === "Invalid token.") {
        //     handleLogout();
        //   } else if (
        if (
            error.response.data.email &&
            error.response.data.email[0] === "user with this email already exists."
        ) {
            message = ("User with this email already exists.");
        } else if (
            error.response.data.non_field_errors &&
            error.response.data.non_field_errors[0] === "Invalid email or password."
        ) {
            message = "Invalid email or password. Please try again.";
        }else if (error.response.status >= 400 && error.response.status < 500) {
            // Client-side error (4xx) may indicate an incorrect API address
            console.error("Client-side error. Possible incorrect API address.");
            message = "Incorrect API address or resource not found. Please check your configuration.";
        } else {
            console.error("API error:", error.response.data);
            message = "An error occurred. Please try again later.";
        }

    } else if (error.request) {
        // Handle request error (no response received)
        if (error.code === 'ENOTFOUND') {
            // This error code indicates that the API address is incorrect
            console.error("Incorrect API address.");
            message = "Incorrect API address. Please check your configuration.";
        } else {
            // Handle request error (no response received)
            console.error("No response from server.");
            message = (
                "No response from server. Please check your internet connection."
            );
        }
    } else {
        message = "An error occurred. Please try again later.";
    }
    return message
};


// if (error.response.data.email &&
//     error.response.data.email[0] === "user with this email already exists.") {
//     return thunkAPI.rejectWithValue(error.response.data.email[0])
// } else if (error.response && error.response.data.message) {
//     return thunkAPI.rejectWithValue(error.response.data.message)
// } else {
//     return thunkAPI.rejectWithValue(error.message)
// }