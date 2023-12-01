import { validationResult } from "express-validator";
import Waitlist from "../models/waitlist.js";

async function saveEmail(req, res){
    try{
        const {email} = req.body;

        if(!email){
            throw new Error("Field is required")
        }

        const validateErrors = validationResult(req).errors;

    validateErrors.forEach((error) => {
      if (error.path == "email") {
        throw new Error("Invalid email address.");
      }
    });


        const existingEmail = await Waitlist.findOne({email})

        if(existingEmail){
            throw new Error("Your email is already on our waitlist.")
        }

        const newEmail = Waitlist({email});

        const savedEmail = newEmail.save();

        res.status(200).send({message: "Successfully saved!"})
    }catch(error){
        res.status(500).send({message: error.message})
    }
}

export { saveEmail };
