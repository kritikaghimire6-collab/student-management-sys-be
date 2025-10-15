import {Request, Express} from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the "public/uploads" directory exists
const uploadDir = path.join(__dirname, "../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {recursive: true});
}

// Function to sanitize/filter images
function sanitizeImage(
  file: Express.Multer.File,
  cb: (error: Error | null, result: boolean) => void
) {
  const fileExtsImg = [".png", ".jpg", ".jpeg", ".gif", ".pdf"];
  const fileExtsVideo = [".mp4", ".mov", ".mkv"];
  const fileExtsBrochure = [".pdf", ".jpg", ".png", ".gif"];
  const fileExts = [".png", ".jpg", ".jpeg", ".gif"];
  const isAllowedExt = fileExts.includes(
    path.extname(file.originalname.toLowerCase())
  );

  const isAllowedExtImg = fileExtsImg.includes(
    path.extname(file.originalname.toLowerCase())
  );
  const isAllowedExtVideo = fileExtsVideo.includes(
    path.extname(file.originalname.toLowerCase())
  );
  const isAllowedExtBrochure = fileExtsBrochure.includes(
    path.extname(file.originalname.toLowerCase())
  );

  const mimeTypeImg = file.mimetype.startsWith("image/");
  const mimeTypeVideo = file.mimetype.startsWith("video/");
  const mimeTypeBrochure =
    file.mimetype.startsWith("application/") ||
    file.mimetype.startsWith("image/");

  if (mimeTypeImg && isAllowedExtImg) {
    return cb(null, true);
  } else if (mimeTypeVideo && isAllowedExtVideo) {
    return cb(null, true);
  } else if (mimeTypeBrochure && isAllowedExtBrochure) {
    return cb(null, true);
  } else {
    cb({message: "File type not allowed!"} as Error, false);
  }
}

// Function to sanitize/filter excel files
function sanitizeExcelFile(
  file: Express.Multer.File,
  cb: (error: Error | null, result: boolean) => void
) {
  const fileExts = [".xlsx", ".csv"];
  const isAllowedExt = fileExts.includes(
    path.extname(file.originalname.toLowerCase())
  );
  if (isAllowedExt) {
    return cb(null, true);
  } else {
    cb({message: "File type not allowed!"} as Error, false);
  }
}

// Local disk storage configuration
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.fieldname}_${file.originalname}`;
    cb(null, fileName);
  },
});

// Image/video/pdf upload middleware
export const uploadMedia = multer({
  storage: diskStorage,
  fileFilter: (req: Request, file, callback) => {
    sanitizeImage(file, callback as any);
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});

// Whatsapp file upload middleware (larger file limit)
export const uploadWhatsappMedia = multer({
  storage: diskStorage,
  fileFilter: (req: Request, file, callback) => {
    sanitizeImage(file, callback as any);
  },
  limits: {
    fileSize: 1024 * 1024 * 20, // 20MB
  },
});

// Memory storage configuration for Excel files
const memoryStorage = multer.memoryStorage();

// Excel upload middleware with memory storage
export const uploadExcel = multer({
  storage: memoryStorage, // Use memory storage instead of disk storage
  fileFilter: (req: Request, file, callback) => {
    sanitizeExcelFile(file, callback as any);
  },
  limits: {
    fileSize: 1024 * 1024 * 10, // 10MB
  },
});
