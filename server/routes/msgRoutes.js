import express from "express";

const router = express.Router();
import {isAdmin, userAuth} from "../middelwares/authMiddleware.js";
import { addTeacherController,
     deleteTeacherController,
      editMsgConstroller,
      getConnectedStudentCntrlr,
      getConnectedTeacherCntrlr,
       getStudentsConstroller,
       sendFeedConstroller } from "../controllers/msgController.js";

router.post("/add-teacher",userAuth,addTeacherController)
router.post("/get-connected-students",userAuth,isAdmin,getConnectedStudentCntrlr)
router.get("/get-connected-teacher",userAuth,getConnectedTeacherCntrlr)
router.get("/get-mystudents",userAuth,isAdmin,getStudentsConstroller)
router.delete("/delete-teacher/:id",userAuth,deleteTeacherController)
router.patch("/send-feed/:id", userAuth, sendFeedConstroller);
router.patch("/edit-msg/:id", userAuth,isAdmin, editMsgConstroller);

export default router;