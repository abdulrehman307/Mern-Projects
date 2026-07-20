import usermodal from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import sessionModel from "../models/session.model.js";
import { sendEmail } from "../services/email.service.js";
import { generateOtp,getOtpHtml } from "../utils/utils.js";
import otpModel from "../models/otp.model.js";

export async function register(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Username, email and password are required."
        });
    }

    try {
        const isalreadyregistered = await usermodal.findOne({
            $or: [{ username }, { email }]
        });

        if (isalreadyregistered) {
            return res.status(409).json({
                message: "The Username or email already exists."
            });
        }

        const hashedpw = crypto.createHash("sha256").update(password).digest("hex");
        const user = new usermodal({
            username,
            email,
            password: hashedpw
        });
        const otp = generateOtp();
        const html = getOtpHtml(otp);
        const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    await otpModel.create({
        email,
        user: user._id,
        otpHash
    })
            await sendEmail(email, "OTP Verification", `Your OTP code is ${otp}`, html)

        await user.save();


        return res.status(201).json({
            message: "User registered successfully",
            user: {
                username: user.username,
                email: user.email,
                verified: user.verified,
            },
        });
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({
            message: "Failed to register user",
            error: error.message
        });
    }

}

export async function login(req, res) {
    const { email, password } = req.body;

    const user = await usermodal.findOne({email})
    if(!user){
        return status(401).json({
            message : "Invalid Email or password"
        })
    }
    if(!user.verified)
    {
        return res.status(401).json({
            message : "Email Not Verified"
        })
    }
    const hashedpassword = crypto.createHash("sha256").update(password).digest("hex");

    const ispasswordvalid = hashedpassword == user.password;

    if(!ispasswordvalid)
    {
        return status(401).json({
            message : "Invalid Email Or Password"
        })
    }
    const refreshToken = jwt.sign({
        id : user._id
    },config.JWT_SECRET,
{
    expiresIn : "7d"
})
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");    
    const session = await sessionModel.create({
        user : user._id,
        refreshTokenHash,
        ip : req.ip,
        userAgent : req.headers["user-agent"]
    })

    const accessToken = jwt.sign({
        id : user._id,
        sessionId : session._id
    },config.JWT_SECRET,
{
    expiresIn : "15m" 
})

        res.cookie("refreshToken", refreshToken,{
            httpOnly: true,
            secure : true,
            sameSite : "strict",
            maxAge : 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({
            message : "Logged in succesfully",
            user : {
                username : user.username,
            email: user.email,},
            accessToken,
        })
}

export async function getme(req, res) {
    try {
        const authHeader = req.headers.authorization || "";
        const accessToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

        if (!accessToken) {
            return res.status(401).json({
                message: "Token Not found"
            });
        }

        const decoded = jwt.verify(accessToken, config.JWT_SECRET);
        const user = await usermodal.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User fetched Successfully.",
            user: {
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Getme error:", error);

        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Invalid or expired token"
            });
        }

        return res.status(500).json({
            message: "Failed to fetch user",
            error: error.message
        });
    }
}
export async function refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            message: "Token Not found"
        });

    }
    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
    const session = await sessionModel.findOne({ refreshTokenHash, revoked: false });
    if(!session)
    {
        return res.status(401).json({
            message : "Invalid Refresh Token"
        });
    }

    const accessToken = jwt.sign({ id: decoded.id }, config.JWT_SECRET, { expiresIn: "15m" })
    const newrefreshToken = jwt.sign({ id: decoded.id }, config.JWT_SECRET, { expiresIn: "7d" })

    const newrefreshTokenHash = crypto.createHash("sha256").update(newrefreshToken).digest("hex");
    session.refreshTokenHash = newrefreshTokenHash;
    await session.save();

    res.cookie("refreshToken", newrefreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return res.status(200).json({
        message: "Access Token refreshed Successfully.",
        accessToken
    });

}

export async function logout(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken)
    {
        return res.status(401).json({
            message : "Token Not found"
        });
    }
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
    const session = await sessionModel.findOne({refreshTokenHash, revoked : false});
    if(!session)
    {
        return res.status(401).json({
            message : "Invalid Token"
        });
    }
    session.revoked = true;
    await session.save();
    res.clearCookie("refreshToken");
    return res.status(200).json({
        message : "Logout Successfully"
    });

    
    }


export async function logoutAll(req, res) {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(400).json({
                message : "Token Not found"
            });
            
        }
        const decoded = jwt.verify(refreshToken, config.JWT_SECRET);
        await sessionModel.updateMany({
            user : decoded.id,
            revoked : false
        },{
            revoked : true
        
        });
        res.clearCookie("refreshToken");
        res.status(200).json({
            message : "Logout from all devices Successfully"
        }) 
    }  

    export async function verifyEmail(req, res) {
    const { otp, email } = req.body

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    const otpDoc = await otpModel.findOne({
        email,
        otpHash
    })

    if (!otpDoc) {
        return res.status(400).json({
            message: "Invalid OTP"
        })
    }

    const user = await userModel.findByIdAndUpdate(otpDoc.user, {
        verified: true
    })

    await otpModel.deleteMany({
        user: otpDoc.user
    })

    return res.status(200).json({
        message: "Email verified successfully",
        user: {
            username: user.username,
            email: user.email,
            verified: user.verified
        }
    })
}