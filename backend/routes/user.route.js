const express = require("express");
const { userSignUp, userLogin, getUserDetails } = require("../controller/user.controller");
const { signupValidator } = require("../middlewares/signup.validator");
const { loginValidator } = require("../middlewares/login.validator");
const { authenticateUser } = require("../middlewares/authenticateUser");


const userRoute = express.Router();


userRoute.post("/signup",signupValidator,userSignUp);

userRoute.post("/login",userLogin);

userRoute.get("/",authenticateUser,getUserDetails)  ;


module.exports ={
    userRoute
}



