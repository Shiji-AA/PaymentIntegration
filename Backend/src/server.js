import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connectDB } from './config/db.js';
import userRoutes from "./Routes/userRoutes/userRoutes.js";
import adminRouter from "./Routes/adminRoutes/adminRoutes.js";
import juspayConfig from "./config/juspayConfig.js"
import juspayRouter from './Routes/juspayRoutes.js';
console.log(juspayConfig.MERCHANT_ID); 

dotenv.config();
connectDB();

const app = express();

// Define __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: ['http://localhost:4000', 'https://courses.arcite.in', 'https://courses.arcite.in', 'http://localhost:3000'],
  methods: "GET, PUT, POST, PATCH, DELETE",
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));

// Define API routes first
app.use("/api/users", userRoutes);
app.use('/api/admin', adminRouter);
app.use('/api/payment', juspayRouter);

// Serving static files for frontend
app.use(express.static(join(__dirname, '../../frontend/dist')));

// Catch all other routes for frontend (React app)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, "../../frontend/dist/index.html"));
});

// Test route for checking server status
app.get('/', (req, res) => res.send("server is ready"));

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log("server started")
);
