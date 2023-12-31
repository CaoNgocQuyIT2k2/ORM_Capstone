import express from "express";
import { getInfo, getUser, updateInfo, createImage ,getSavedImageByUser,getCreatedImageByUser,deleteImageByUser} from "../controllers/userController.js";

const userRoute = express.Router();
// lấy thông tin user
userRoute.get("/get-user", getUser);

// lấy danh sách ảnh đã lưu theo user_id 
userRoute.get("/get-saved-image-by-user", getSavedImageByUser);

// lấy danh sách ảnh đã tạo theo user_id 
userRoute.get("/get-created-image-by-user", getCreatedImageByUser);

// xóa ảnh đã tạo 
userRoute.delete("/delete-image-by-user/:imageId", deleteImageByUser);

//API get info user
userRoute.get("/get-info", getInfo);

// trả về đường dẫn gốc của source
import upload from "../config/upload.js";
//API upload avatar
userRoute.post("/create-image", upload.single("newImage"), createImage);

//API update info user
userRoute.put("/update-info", updateInfo);

export default userRoute;

