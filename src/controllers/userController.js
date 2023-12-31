import compress_images from 'compress-images'
import initModels from "../models/init-models.js";
import { responseData } from "../config/response.js";
import sequelize from "../models/connect.js";
import bcrypt from "bcrypt";
import { decodeToken } from "../config/JWT.js";
let model = initModels(sequelize);

export const getUser = async (req, res) => {
  try {
    let data = await model.nguoi_dung.findAll();
    responseData(res, "Thành công", data, 200);
  } catch {
    responseData(res, "lỗi ...", "", 400);
  }
};

export const getSavedImageByUser = async (req, res) => {
  try {
    let { token } = req.headers;
    let dToken = decodeToken(token);
    console.log("Decoded Token:", dToken);
    let { nguoi_dung_id } = dToken.data;
    console.log("🚀 ~ dToken.data;:", dToken.data);

    let data = await model.luu_anh.findAll({
      where: {
        nguoi_dung_id,
      },
      include: [
        {
          model: model.hinh_anh,
          as: 'hinh',
        },
      ],
    });

    console.log(data); // Kiểm tra dữ liệu bạn nhận được từ cơ sở dữ liệu
    let luuAnhList = data.map(luuAnh => luuAnh.dataValues);

    console.log(luuAnhList);

    return responseData(res, 'Những ảnh bạn đã lưu', luuAnhList, 200);
  } catch (error) {
    console.error(error);
    return responseData(res, "Lỗi...", "", 500);
  }
};

export const getCreatedImageByUser = async (req, res) => {
  try {
    let { token } = req.headers;
    let dToken = decodeToken(token);
    console.log("Decoded Token:", dToken);
    let { nguoi_dung_id } = dToken.data;
    console.log("🚀 ~ dToken.data;:", dToken.data);

    let data = await model.hinh_anh.findAll({
      where: {
        nguoi_dung_id,
      },
    });


    return responseData(res, 'Những ảnh bạn đã tạo', data, 200);
  } catch (error) {
    console.error(error);
    return responseData(res, "Lỗi...", "", 500);
  }
};

export const deleteImageByUser = async (req, res) => {
  try {
    let { token } = req.headers;
    let dToken = decodeToken(token);
    console.log("Decoded Token:", dToken);
    let { nguoi_dung_id } = dToken.data;
    console.log("🚀 ~ dToken.data;:", dToken.data);
    let { imageId } = req.params;

    // Kiểm tra sự tồn tại của ảnh trước khi xóa
    let imageToDelete = await model.hinh_anh.findOne({
      where: {
        nguoi_dung_id,
        hinh_id: imageId,
      },
    });

    if (!imageToDelete) {
      return responseData(res, 'Không tìm thấy ảnh để xóa', '', 404);
    }

    // Thực hiện xóa ảnh
    await model.hinh_anh.destroy({
      where: {
        nguoi_dung_id,
        hinh_id: imageId,
      },
    });

    return responseData(res, 'Ảnh đã được xóa thành công', '', 200);
  } catch (error) {
    console.error(error);
    return responseData(res, 'Lỗi...', '', 500);
  }
};

export const getInfo = async (req, res) => {
  try {
    let { token } = req.headers;
    let accessToken = decodeToken(token);

    let getUser = await model.nguoi_dung.findOne({
      where: {
        nguoi_dung_id: accessToken.data.nguoi_dung_id,
      },
    });

    if (!getUser) {
      responseData(res, "User không tồn tại", "", 404);
      return;
    }

    responseData(res, "success", getUser, 200);
  } catch {
    responseData(res, "lỗi ...", "", 500);
  }
};

export const createImage = async (req, res) => {
  try {
    let { file } = req;

    // Lấy thông tin người dùng từ token
    let { token } = req.headers;
    let accessToken = decodeToken(token);
    let user_id = accessToken.data.nguoi_dung_id;
console.log("user id creat image", user_id);

    console.log("user id creat image", user_id)
    // Lấy thông tin từ form-data
    let mo_ta = req.body.mo_ta || "Mô tả tùy ý";
    let ten_hinh = req.body.ten_hinh
    let duong_dan = "/public/img/" + file.filename;

    // Lưu thông tin vào bảng hinh_anh
    let createdImage = await model.hinh_anh.create({
      ten_hinh: ten_hinh,
      duong_dan: duong_dan,
      mo_ta: mo_ta,
      nguoi_dung_id: user_id,
    });
    console.log("createdImage:",createdImage)
    // Trả về kết quả
    responseData(res, "Thêm ảnh thành công", createdImage, 200);
    return;
  } catch (error) {
    console.error(error);
    responseData(res, "Lỗi...", "", 500);
  }
};

export const updateInfo = async (req, res) => {
  try {
    let { ho_ten, mat_khau, tuoi } = req.body;
    let { token } = req.headers;
    let dToken = decodeToken(token);
    console.log("Decoded Token:", dToken);
    let { nguoi_dung_id } = dToken.data;

    let getUser = await model.nguoi_dung.findOne({
      where: {
        nguoi_dung_id: nguoi_dung_id,
      },
    });
    // Kiểm tra mật khẩu trống trước khi hash
    if (mat_khau) {
      getUser.mat_khau = bcrypt.hashSync(mat_khau, 10);
    }

    // Kiểm tra thông tin người dùng trống trước khi cập nhật
    if (ho_ten) {
      getUser.ho_ten = ho_ten;
    }

    if (tuoi) {
      getUser.tuoi = tuoi;
    }
    console.log("Data before update:", getUser.dataValues);
    console.log("id user", getUser.dataValues.nguoi_dung_id);

    // Thực hiện câu lệnh UPDATE
    const result = await model.nguoi_dung.update(
      { ho_ten, mat_khau, tuoi },
      {
        where: {
          nguoi_dung_id: nguoi_dung_id,
        },
      }
    );
    console.log("Update result:", result);
    responseData(res, "Update thành công", "", 200);
  } catch (error) {
    console.error(error);
    responseData(res, "Lỗi khi cập nhật thông tin", "", 500);
  }
};