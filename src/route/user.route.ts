import {Router} from "express";
import {requireSignIn} from "../middleware/auth.middleware";
import {getUserController} from "../controller/user.controller";

const router = Router();

router.get("/", requireSignIn, getUserController);

export default router;
