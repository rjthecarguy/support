User = require("../models/userModel")
asyncHandler = require("express-async-handler")
jwt = require("jsonwebtoken")

const protect = asyncHandler(async (req,res,next) => {

    // Define token
    let token

    // Check if token and correct format
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {


        try {
            // Split array to get token
            token = req.headers.authorization.split(' ')[1]

            // Decode
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Lookup user and insert into req of header
            req.user = await User.findById(decoded.id).select("-password")

            next()


        } catch (error) {  // Error out
            console.log(error)
            res.status(401)
            throw new Error("Not authorized")
                
        }

    }

    // No token or wrong format
    if(!token) {
        res.status(401)
        throw new Error("Not authorized")
    }
})

module.exports = {protect}