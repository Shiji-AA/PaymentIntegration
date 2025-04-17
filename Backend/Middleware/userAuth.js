import User from '../src/Model/UserModel.js'
import jwt from 'jsonwebtoken';

const findUser = async (userId) => {
  let user = await User.findById(userId);
  return user;
};

export const isLogin = async (req, res, next) => {
    try {
      const authorizationHeader = req.headers.authorization;
      console.log("Received Authorization Header-middlewarePage:", authorizationHeader); 
      if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized - No token found" });
      }
      const token = authorizationHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: "Unauthorized - No token found" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await findUser(decoded.user_id);
      if (!user) {
        return res.status(401).json({ error: "Unauthorized - User not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      console.error("Error in isLogin middleware:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  


