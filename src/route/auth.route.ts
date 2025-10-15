import express from "express";
import {
  forgetPasswordHandler,
  loginController,
  registerController,
  resetPasswordHandler,
} from "../controller/auth.controller";
import {requireSignIn} from "../middleware/auth.middleware";
import {getUserController} from "../controller/user.controller";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forget-password", forgetPasswordHandler);
router.post("/reset-password", resetPasswordHandler);

router.get("/me", requireSignIn, getUserController);

export default router;
