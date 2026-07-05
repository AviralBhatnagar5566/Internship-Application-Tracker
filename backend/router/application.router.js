import { Router } from "express";
import { applicationform } from "../controllers/application.controller.js";
import { applications } from "../controllers/applications.controller.js";
import { deleteApplication } from "../controllers/delete.controller.js";
import { applicationsByuid } from "../controllers/applications.controller.js";
import { updateApplication } from "../controllers/update.controller.js";
import { loginUser, logout, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()
router.route("/registerUser").post(registerUser)

router.route("/loginUser").post(loginUser)

router.route("/logout").post(verifyJWT ,logout)

router.route("/applicationform").post(verifyJWT ,applicationform)

router.route("/applications").get(verifyJWT ,applications)
router.route("/applicationsByuid/:id").get(verifyJWT, applicationsByuid)
router.route("/deleteApplication/:id").delete(verifyJWT,deleteApplication)

router.route("/updateApplication/:id").patch(verifyJWT, updateApplication)


export { router }