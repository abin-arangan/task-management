const bcrypt = require("bcrypt");
const { userModel } = require('../model');
const CryptoJS = require('crypto-js');

const registerUserService = async (req) => {
    try {
        let username = req?.name ?? '';
        let email = req?.email ?? '';
        let mobile = req?.phone ?? NaN;
        let encryptedPassword = req?.password ?? '';
        let password;
        const key = 'secret-encrypt-password'; // Shared secret key

        try {
            const decryptedBytes = CryptoJS.AES.decrypt(encryptedPassword, key);
            password = decryptedBytes.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            return {
                rc: 8,
                message: `Password encryption failed.`
            }
        }

        const salt = await bcrypt.genSalt();
        password = password != '' ? await bcrypt.hash(password, salt) : null;
        let userExist = await userModel.findOne({ email: email });
        if (userExist) {
            return {
                rc: 8,
                message: `User already exists`
            }
        } else {
            const user = new userModel({ username, email, password, mobile });
            const response = await user.save();
            try {
                if (response) {
                    let userData = {
                        username: user?.username,
                        email: user?.email
                    };
                    return {
                        rc: 0,
                        message: 'User registered',
                        data: userData
                    }
                }

            } catch (err) {
                console.error('Error in registering user:', err);
                return {
                    rc: 8,
                    message: `User registeration failed ${err}`,
                    data: []
                }
            }

        }

    } catch (err) {
        return {
            rc: 8,
            message: `Error registering user - ${err}`,
            data: []
        }
    }

};

const loginUserService = async (req) => {
    try {
        let email = req?.email ?? '';
        let encryptedPassword = req?.password ?? null;
        const userData = await userModel.findOne({ email: email });
        if (userData) {
            const key = 'secret-encrypt-password'; // Shared secret key

            try {
                const decryptedBytes = CryptoJS.AES.decrypt(encryptedPassword, key);
                userPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);
            } catch (error) {
                return {
                    rc: 8,
                    message: `Password encryption failed.`
                }
            }
            const isvalidPassword = await bcrypt.compare(userPassword, userData?.password);
            if (isvalidPassword) {
                let data = {
                    username: userData?.username,
                    email: userData?.email
                };
                return {
                    rc: 0,
                    message: `User logged in successfully`,
                    data: data
                }
            } else {
                return {
                    rc: 8,
                    message: `User password is invalid`,
                    data: []
                }
            }

        } else {
            return {
                rc: 8,
                message: `User not registered`,
                data: []
            }
        }

    } catch (err) {
        return {
            rc: 8,
            message: `Error logging in user - ${err}`
        }
    }
};

module.exports = {
    registerUserService,
    loginUserService
};
