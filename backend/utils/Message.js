function otpMessage(name, otp) {
    return `Hi ${name},

Thank you for registering with ShopNest!

To complete your sign-up and verify your email address, please enter the following 6-digit verification code:

${otp}
(This code is valid for 10 minutes and should not be shared with anyone.)

If you didn't create an account with ShopNest, you can safely ignore this email.

Best regards,

The ShopNest Team`
}

function orderPlacedMessage(name, totalAmount, orderId) {
    return `Hi ${name},

Thank you for shopping with ShopNest!

We're excited to let you know that your order #${orderId} has been successfully placed.

Order Summary:
- Total Amount: $${totalAmount}

We are preparing your items for shipment and will send you another update as soon as your package is on its way.

If you have any questions about your order, feel free to contact our support team.

Best regards,

The ShopNest Team`;
}

module.exports = {
    otpMessage,
    orderPlacedMessage
};