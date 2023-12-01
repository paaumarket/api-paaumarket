import {Router} from "express";
import {body} from "express-validator"
import * as waitlist from "../controllers/waitlistController.js"

const router = Router();

// waitlist route
router.post("/waitlist",
            body("email").trim().isEmail().escape(), // Validate req.body data
            waitlist.saveEmail);

export default router;
