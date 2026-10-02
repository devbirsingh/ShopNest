function message(name,otp){
    return `Hi ${name},

Thank you for registering with ShopNest!

To complete your sign-up and verify your email address, please enter the following 6-digit verification code:

${otp}
(This code is valid for 10 minutes and should not be shared with anyone.)

If you didn't create an account with ShopNest, you can safely ignore this email.

Best regards,

The ShopNest Team`
}

module.exports = message;