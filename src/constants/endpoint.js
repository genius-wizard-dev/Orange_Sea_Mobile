const ENDPOINT = {
    REGISTER_USER:"/api/auth/register",
    VERIFY_OTP:"/api/auth/verify-otp",
    LOGIN_USER : "/api/auth/login",

    FORGOT_PASSWORD: "/api/auth/forgot-password",
    RESET_PASSWORD: "/api/auth/reset-password",
    CHANGE_PASSWORD: (id) => `/api/account/${id}/password`,

    GET_ME:"/api/profile/me",
    PUT_ME:"/api/profile/me"






    
}

export default ENDPOINT
