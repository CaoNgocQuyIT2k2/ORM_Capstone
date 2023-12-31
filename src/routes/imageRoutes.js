import express from 'express';
import { getImage,getImageDetail ,getCommentImage,checkSaveImage,commentImage,searchImage} from '../controllers/imageController.js';
import { verifyToken } from '../config/JWT.js';

const imageRoute = express.Router();

//Api lấy danh sách ảnh theo tên
imageRoute.get('/search-image', searchImage);

//lấy tất cả ảnh ra trang chủ
imageRoute.get("/get-image", getImage);

// lấy thông tin ảnh và người tạo ảnh
imageRoute.get("/get-image-detail/:imageId", getImageDetail);

// lấy thông tin bình luận ảnh theo id
imageRoute.get("/get-comment-image/:imageId", getCommentImage);

// thực hiện chức năng comment vào image
imageRoute.post("/comment-image/:imageId", commentImage);

// lấy thông tin đã lưu hình này hay chưa theo id ảnh
imageRoute.get("/get-save-image/:imageId", checkSaveImage);



export default imageRoute;
