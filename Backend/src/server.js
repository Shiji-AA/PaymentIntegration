
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import userRoutes from "./Routes/userRoutes/userRoutes.js";
// import adminRouter from "./Routes/adminRoutes/adminRoutes.js";
import userRoutes from "./Routes/userRoutes";
import adminRouter from "./Routes/adminRoutes";

import { connectDB } from "./config/db.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';



dotenv.config();
connectDB();

const app = express();
// Define __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: ['http://localhost:4000', 'https://courses.arcite.in', 'https://www.courses.arcite.in', 'http://localhost:3000'],
  methods: "GET, PUT, POST, PATCH, DELETE",
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));


app.use("/api/users", userRoutes);
app.use('/api/admin', adminRouter);

app.use(express.static(join(__dirname, '../../frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, "../../frontend/dist/index.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
