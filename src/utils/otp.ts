
export const generateOTP = async () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
}

export const generateRef = async () => {
    const ref = Math.random().toString(36).substring(2, 8).toUpperCase();
    return ref;
}