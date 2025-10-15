import {Router} from "express";
import {uploadExcel} from "../middleware/upload";
import {studentOnboardController} from "../controller/onboard.controller";

const router = Router();

router.post("/onboard", uploadExcel.single("file"), studentOnboardController);

export default router;
