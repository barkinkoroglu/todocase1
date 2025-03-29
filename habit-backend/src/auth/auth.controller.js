require("dotenv").config(); // .env dosyasını yükle

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET; // .env dosyasından SECRET_KEY alıyoruz
const EXPIRES_IN = process.env.JWT_EXPIRES_IN; // .env dosyasından token süresi alıyoruz

// (Register) kısmı
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //kullanıcı zaten var mı?
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    // şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Kullanıcı Girişi (Login)
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // kullanıcı var mı?
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    //şifre doğru mu?
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // JWT Token oluştur
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: EXPIRES_IN, // .env dosyasından alınan süresi
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { register, login };
