import express from 'express';
import {login,signUp, tokenRef} from '../controllers/authController.js' 

const authRoute = express.Router();

//login
authRoute.post("/login",login)

//sign up
authRoute.post("/signup",signUp)

//ref token
authRoute.post("/token-ref",tokenRef)




export default authRoute;   
// mã hóa password
// so sánh dữ liệu thô và dữ liệu mã hóa