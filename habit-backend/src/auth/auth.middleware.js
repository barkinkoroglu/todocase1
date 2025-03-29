require("dotenv").config(); // .env dosyasını yükle

const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET; // .env dosyasından SECRET_KEY alıyoruz
const EXPIRES_IN = process.env.JWT_EXPIRES_IN; // .env dosyasından token süresi alıyoruz

// JWT doğrulaması yapan middleware
const auth = (req, res, next) => {
  // Authorization header'ından token'ı al
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // Token yoksa yetkisiz erişim hatası ver
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Token'ı doğrula
    const decoded = jwt.verify(token, SECRET_KEY);

    // Kullanıcı bilgisini request'e ekle
    req.user = decoded;

    // Devam et
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
