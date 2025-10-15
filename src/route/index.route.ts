import {Router} from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import onboardRoute from "./onboard.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/student", onboardRoute);

export default router;
