/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `binh_luan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `hinh_id` int DEFAULT NULL,
  `ngay_binh_luan` date DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`binh_luan_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hinh_anh` (
  `hinh_id` int NOT NULL AUTO_INCREMENT,
  `ten_hinh` varchar(255) DEFAULT NULL,
  `duong_dan` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  PRIMARY KEY (`hinh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `hinh_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `luu_anh` (
  `nguoi_dung_id` int NOT NULL,
  `hinh_id` int NOT NULL,
  `ngay_luu` date DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`,`hinh_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `luu_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `luu_anh_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `ho_ten` varchar(255) DEFAULT NULL,
  `tuoi` int DEFAULT NULL,
  `anh_dai_dien` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(1, 1, 1, '2023-12-30', 'Bình luận cho hình 1');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(2, 2, 1, '2023-12-31', 'Bình luận cho hình 1');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(3, 3, 2, '2023-12-31', 'Bình luận cho hình 2');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(4, 4, 3, '2023-12-30', 'Bình luận cho hình 3'),
(5, 5, 4, '2023-12-29', 'Bình luận cho hình 4'),
(6, 6, 5, '2023-12-28', 'Bình luận cho hình 5'),
(7, 7, 6, '2023-12-27', 'Bình luận cho hình 6'),
(8, 8, 7, '2023-12-26', 'Bình luận cho hình 7'),
(9, 9, 8, '2023-12-25', 'Bình luận cho hình 8'),
(10, 10, 9, '2023-12-24', 'Bình luận cho hình 9'),
(11, 12, 1, '2023-12-30', 'đẹp quá luôn'),
(12, 12, 1, '2023-12-30', 'đẹp quá luôn'),
(13, 12, 1, '2023-12-30', 'đẹp quá luôn'),
(14, 12, 1, '2023-12-30', 'đẹp quá luôn'),
(15, 12, 1, '2023-12-31', 'đẹp quá luôn');

INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(1, 'chó con', 'https://cdn.tgdd.vn/Files/2022/03/31/1423196/moi-dieu-can-biet-cho-con-cach-nuoi-cham-soc-va-huan-luyen-202203311033114159.jpg', 'Mô tả hình 1', 11);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(2, 'chó nhỏ', 'https://cdn.tgdd.vn/Files/2022/03/31/1423196/moi-dieu-can-biet-cho-con-cach-nuoi-cham-soc-va-huan-luyen-202203311033114159.jpg', 'Mô tả hình 2', 12);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(3, 'mèo con', 'https://cdn.tgdd.vn/Files/2022/03/31/1423196/moi-dieu-can-biet-cho-con-cach-nuoi-cham-soc-va-huan-luyen-202203311033114159.jpg', 'Mô tả hình 3', 11);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(4, 'mèo to', 'https://cdn.tgdd.vn/Files/2022/03/31/1423196/moi-dieu-can-biet-cho-con-cach-nuoi-cham-soc-va-huan-luyen-202203311033114159.jpg', 'Mô tả hình 4', 11),
(5, 'chó to', 'https://cdn.tgdd.vn/Files/2022/03/31/1423196/moi-dieu-can-biet-cho-con-cach-nuoi-cham-soc-va-huan-luyen-202203311033114159.jpg', 'Mô tả hình 5', 12),
(6, 'cho đen', 'https://cdn.tgdd.vn/Files/2022/03/31/1423196/moi-dieu-can-biet-cho-con-cach-nuoi-cham-soc-va-huan-luyen-202203311033114159.jpg', 'Mô tả hình 6', 11),
(7, 'mèo đen', 'https://cdn.tgdd.vn/Files/2022/03/31/1423196/moi-dieu-can-biet-cho-con-cach-nuoi-cham-soc-va-huan-luyen-202203311033114159.jpg', 'Mô tả hình 7', 12),
(8, 'chó trắng', 'https://cdn.tgdd.vn/Files/2022/03/31/1423196/moi-dieu-can-biet-cho-con-cach-nuoi-cham-soc-va-huan-luyen-202203311033114159.jpg', 'Mô tả hình 8', 12),
(9, 'chó xanh', 'https://cdn.tgdd.vn/Files/2022/03/31/1423196/moi-dieu-can-biet-cho-con-cach-nuoi-cham-soc-va-huan-luyen-202203311033114159.jpg', 'Mô tả hình 9', 12),
(10, 'mèo vàng', 'https://cdn.tgdd.vn/Files/2022/03/31/1423196/moi-dieu-can-biet-cho-con-cach-nuoi-cham-soc-va-huan-luyen-202203311033114159.jpg', 'Mô tả hình 10', 12),
(11, 'chó xanh', 'https://cdn.tgdd.vn/Files/2022/03/31/1423196/moi-dieu-can-biet-cho-con-cach-nuoi-cham-soc-va-huan-luyen-202203311033114159.jpg', 'Mô tả hình 11', 11),
(20, 'naruto ', '/public/img/1704014149685-naruto.png', 'aaa', 11);

INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(1, 1, '2023-12-30');
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(1, 2, '2023-12-31');
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(2, 3, '2023-12-31');
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`) VALUES
(4, 4, '2023-12-24'),
(5, 5, '2023-12-25'),
(6, 6, '2023-12-26'),
(7, 7, '2023-12-27'),
(8, 8, '2023-12-28'),
(9, 9, '2023-12-29'),
(11, 2, '2023-12-30'),
(11, 5, '2023-12-30'),
(11, 6, '2023-12-30'),
(12, 1, '2023-12-30'),
(12, 3, '2023-12-29'),
(12, 10, '2023-12-30');

INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(1, 'nguoidung1@example.com', 'matkhau1', 'Người Dùng 1', 25, 'https://image.sggp.org.vn/w1000/Uploaded/2023/evofjasfzyr/2022_12_19/-large-678.jpeg.webp');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(2, 'nguoidung2@example.com', 'matkhau2', 'Người Dùng 2', 30, 'https://image.sggp.org.vn/w1000/Uploaded/2023/evofjasfzyr/2022_12_19/-large-678.jpeg.webp');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(3, 'nguoidung3@example.com', 'matkhau3', 'Người Dùng 3', 22, 'https://image.sggp.org.vn/w1000/Uploaded/2023/evofjasfzyr/2022_12_19/-large-678.jpeg.webp');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(4, 'nguoidung4@example.com', 'matkhau4', 'Người Dùng 4', 28, 'https://image.sggp.org.vn/w1000/Uploaded/2023/evofjasfzyr/2022_12_19/-large-678.jpeg.webp'),
(5, 'nguoidung5@example.com', 'matkhau5', 'Người Dùng 5', 35, 'https://image.sggp.org.vn/w1000/Uploaded/2023/evofjasfzyr/2022_12_19/-large-678.jpeg.webp'),
(6, 'nguoidung6@example.com', 'matkhau6', 'Người Dùng 6', 27, 'https://image.sggp.org.vn/w1000/Uploaded/2023/evofjasfzyr/2022_12_19/-large-678.jpeg.webp'),
(7, 'nguoidung7@example.com', 'matkhau7', 'Người Dùng 7', 40, 'https://image.sggp.org.vn/w1000/Uploaded/2023/evofjasfzyr/2022_12_19/-large-678.jpeg.webp'),
(8, 'nguoidung8@example.com', 'matkhau8', 'Người Dùng 8', 22, 'https://image.sggp.org.vn/w1000/Uploaded/2023/evofjasfzyr/2022_12_19/-large-678.jpeg.webp'),
(9, 'nguoidung9@example.com', 'matkhau9', 'Người Dùng 9', 33, 'https://image.sggp.org.vn/w1000/Uploaded/2023/evofjasfzyr/2022_12_19/-large-678.jpeg.webp'),
(10, 'nguoidung10@example.com', 'matkhau10', 'Người Dùng 10', 29, 'https://image.sggp.org.vn/w1000/Uploaded/2023/evofjasfzyr/2022_12_19/-large-678.jpeg.webp'),
(11, 'cnq@example.com', '$2b$10$tK9SJaxSepghGk3dtM63huzYvF/qw4nsh2.oHniLMS5VZNMt.qQRi', 'Cao Ngọc Quý', 25, 'https://image.sggp.org.vn/w1000/Uploaded/2023/evofjasfzyr/2022_12_19/-large-678.jpeg.webp'),
(12, 'caoquy@example.com', '123456', 'Cao Ngọc Quý F', 21, 'https://image.sggp.org.vn/w1000/Uploaded/2023/evofjasfzyr/2022_12_19/-large-678.jpeg.webp');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;