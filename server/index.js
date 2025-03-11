// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");

// dotenv.config();

// const app = express();

// // Middleware
// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });
// app.use(cors({
//   origin: process.env.FRONT_END_URL,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], 
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// }));

// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: false }));


// // Import Routes
// const routes = require('./routes'); // Import the routes

// // Use routes with /api prefix
// app.use('/api', routes);  // All API routes will now be prefixed with /api

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

// ✅ Cấu hình CORS chuẩn
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
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

// ✅ Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Xử lý lỗi cổng bị chiếm (EADDRINUSE)
const PORT = process.env.PORT || 5000;
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

