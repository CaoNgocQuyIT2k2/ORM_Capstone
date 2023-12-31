import { response } from "express";
import initModels from "../models/init-models.js";
import { responseData } from "../config/response.js";
import sequelize from "../models/connect.js";
import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import {
  checkRefToken,
  checkToken,
  createRefToken,
  createToken,
  decodeToken,
} from "../config/JWT.js";

let model = initModels(sequelize);

export const login = async (req, res) => {
  try {
  let { email, mat_khau } = req.body;
  console.log('Dữ liệu yêu cầu:', req.body);

  //check email và password == table user
  let checkUser = await model.nguoi_dung.findOne({
    where: {
      email: email,
    },
  });
  // tồn tại => login thành công
  if (checkUser) {
    console.log('Mật khẩu từ người dùng:', mat_khau);
console.log('Mật khẩu từ cơ sở dữ liệu:', checkUser.mat_khau);

    if (bcrypt.compareSync(mat_khau, checkUser.mat_khau)) {
      let key = new Date().getTime();
      let token = createToken({
        nguoi_dung_id: checkUser.nguoi_dung_id,
        key,
      });
      let refToken = createRefToken({
        nguoi_dung_id: checkUser.nguoi_dung_id,
        key,
      });
      // lưu refresh token vào tab
      await model.nguoi_dung.update(
        { ...checkUser.dataValues, refresh_token: refToken }, {
          where: {
            nguoi_dung_id: checkUser.nguoi_dung_id,
          },
        });
      responseData(res, "Đăng nhập thành công", token, 200);
    } else {
      responseData(res, "Mật khẩu không đúng", "", 404);
    }
  } else {
    responseData(res, "Email không đúng", "", 404);
  }

  // ko tồn tại => sai email hoặc passs
  } catch {
    responseData(res, "Lỗi...", "", 500);
  }
};

export const signUp = async (req, res) => {
  try {
    let { ho_ten, email, mat_khau,tuoi } = req.body;

    let checkUser = await model.nguoi_dung.findOne({
      where: {
        email,
      },
    });

    // check trùng mail:
    if (checkUser) {
      return responseData(res, "Email đã tồn tại", "", 400);
    }

    let newData = {
      email: email,
      mat_khau: bcrypt.hashSync(mat_khau, 10),
      ho_ten: ho_ten,
      tuoi: tuoi,
      anh_dai_dien: "",

    };
    //insert data
    model.nguoi_dung.create(newData);
    responseData(res, "Đăng kí thành công", "", 200);
  } catch (error) {
    responseData(res, "Lỗi...", "", 500);
  }
};

export const tokenRef = async (req, res) => {
  try {
    let { token } = req.headers;

    // Check token
    let check = checkToken(token);
    // Token không hợp lệ
    if (check != null && check.name != "TokenExpiredError") {
      return responseData(res, check.name, "", 401);
    }

    let accessToken = decodeToken(token);

    // Lấy thông tin user trong database
    let getUser = await model.users.findOne({
      where: {
        user_id: accessToken.data.user_id,
      },
    });

    // Check refresh token
    let checkRef = checkRefToken(getUser.refresh_token);
    // Refresh token không hợp lệ
    if (checkRef != null) {
      return responseData(res, checkRef.name, "", 401);
    }

    // Check code
    let refToken = decodeToken(getUser.refresh_token);
    if (accessToken.data.key != refToken.data.key) {
      return responseData(res, "Invalid token", "", 401);
    }

    // Tạo mới access token
    let newToken = createToken({
      user_id: getUser.user_id,
      key: refToken.data.key,
    });

    return responseData(res, "", newToken, 200);
  } catch (error) {
    console.error("Error in tokenRef:", error);
    return responseData(res, "Internal Server Error", "", 500);
  }
};

