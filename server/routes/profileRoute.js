import express from "express";
import {
  studentProfileController,
  getProfileController,
  aplicantProfilCntrolr,
  adminProfileController,
  getAdminProfileController,
  getYourTeacherProfilCntrler,
  getStudentProfilCntrler
} from "../controllers/profileController.js";
import {isAdmin, userAuth} from "../middelwares/authMiddleware.js";

//router object
const router = express.Router();

//routes

router.post("/student-profile", userAuth, studentProfileController);
router.post("/admin-profile", userAuth,isAdmin, adminProfileController);

router.get("/get-profile", userAuth, getProfileController);
router.get("/get-student-profile/:id", userAuth,isAdmin, getStudentProfilCntrler);
router.get("/get-admin-profile", userAuth,isAdmin, getAdminProfileController);
router.get("/get-yourteacher-profile", userAuth, getYourTeacherProfilCntrler);
router.get("/applicant-profile/:id", userAuth,isAdmin, aplicantProfilCntrolr);


export default router;
