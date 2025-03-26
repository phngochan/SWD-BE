const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const setupSwagger = require('./swagger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Cấu hình CORS chuẩn
const allowedOrigins = [
  `http://localhost:${PORT}`,
  `${process.env.API_BASE_URL}`,
  "http://localhost:5173",
  process.env.FRONT_END_URL, // Lấy từ biến môi trường nếu có
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy blocked this request"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ✅ Hỗ trợ preflight requests
app.options("*", cors());

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// ✅ Import Routes
const routes = require("./routes");
app.use("/api", routes);

// Swagger
setupSwagger(app, PORT);

// MongoDB Connection
// ✅ Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Xử lý lỗi cổng bị chiếm (EADDRINUSE)
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Nếu lỗi cổng bị chiếm, thử cổng khác
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is in use. Trying a new port...`);
    const newPort = PORT + 1;
    app.listen(newPort, () => console.log(`✅ Server running on port ${newPort}`));
  } else {
    console.error("❌ Server error:", err);
  }
});
