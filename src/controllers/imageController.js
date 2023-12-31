import initModel from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Sequelize } from "sequelize";
import { responseData } from "../config/response.js";
import { decodeToken } from "../config/JWT.js";

let model = initModel(sequelize);
let Op = Sequelize.Op;

export const getImage = async (req, res) => {
  try {
    let data = await model.hinh_anh.findAll();

    responseData(res, "Thành công", data, 200);
  } catch (exception) {
    responseData(res, "Lỗi...", data, 500);
  }
};

export const searchImage = async (req, res) => {
  try {
    let { imageName } = req.query;
    if (!imageName) {
      return responseData(res, 'Tên hình không được trống', null, 400);
    }

    let data = await model.hinh_anh.findAll({
      where: {
        ten_hinh: {
          [Op.like]: `%${imageName}%`, // Tìm kiếm không phân biệt chữ hoa, chữ thường
        },
      },
    });

    responseData(res, 'Thành công', data, 200);
  } catch (error) {
    console.error('Error in searchImage:', error);
    responseData(res, 'Lỗi server', null, 500);
  }
};

export const getImageDetail = async (req, res) => {
  try {
    let { imageId } = req.params;

    let data = await model.hinh_anh.findOne({
      where: {
        hinh_id: imageId,
      },
      include: ["nguoi_dung"],
    });
    responseData(res, "Thành công", data, 200);
  } catch {
    responseData(res, "Lỗi...", data, 500);
  }
};

export const getCommentImage = async (req, res) => {
  try {
    let { imageId } = req.params;
    let data = await model.binh_luan.findAll({
      where: {
        hinh_id: imageId,
      },
      include: ["nguoi_dung"],
      order: [['ngay_binh_luan', 'DESC']],
    });
    responseData(res, "Thành công", data, 200);
  } catch (error) {
    responseData(res, "Lỗi...", data, 500);
  }
};

export const commentImage = async (req, res) => {
  try {
    let { token } = req.headers;
    // giải mã => object giống bên trang jwt.io
    let dToken = decodeToken(token);
    console.log("Decoded Token:", dToken); 
    let { nguoi_dung_id } = dToken.data;
    console.log("🚀 ~ dToken.data;:", dToken.data)
    let { noi_dung } = req.body;
    let { imageId } = req.params;


    let newData = {
      nguoi_dung_id,
      hinh_id: imageId,
      noi_dung,
      ngay_binh_luan: new Date(),
    };

    await model.binh_luan.create(newData);

    let responseDataObj = {
      token,
      nguoi_dung_id,
      hinh_id: imageId,
      noi_dung,
      ngay_binh_luan: new Date(), // Thêm dòng này để định nghĩa ngay_binh_luan
    };
  
      responseData(res, "Thành công", responseDataObj, 200);
  } catch {
    responseData(res, "Lỗi...", "", 500);
  }
};

export const checkSaveImage = async (req, res) => {
  try {
    let { token } = req.headers;
    // giải mã => object giống bên trang jwt.io
    let dToken = decodeToken(token);
    console.log("Decoded Token:", dToken); 
    let { nguoi_dung_id } = dToken.data;
    console.log("🚀 ~ dToken.data;:", dToken.data)
    let { imageId } = req.params;

    const savedImage = await model.luu_anh.findOne({
      where: {
        nguoi_dung_id,
        hinh_id: imageId,
      },
    });

    if (savedImage) {
      return responseData(res, 'Bạn đã lưu ảnh', "", 400);
    } else {
      return responseData(res, 'Bạn chưa lưu ảnh', "", 400);
    }
   } catch (error) {
    console.error(error);
    responseData(res, "Lỗi...", "", 500);
  }
};







