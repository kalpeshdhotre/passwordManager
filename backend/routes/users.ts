import express from "express";
import { z } from "zod";
import { User } from "../db/db";
const userRouter = express.Router();

const userSchema = z.object({
   emailAsUsername: z.string(),
   password: z.string(),
   role: z.string(),
});

//
userRouter.post("/signup", async (req, res) => {
   const data = req.body;
   try {
      const validateLoginData = userSchema.parse(data);
      if (validateLoginData) {
         await User.create({
            emailAsUsername: data.emailAsUsername,
            password: data.password,
            role: data.role,
         });
         res.send({ message: "User created successfully" });
      } else {
         res.send({ message: "User creation failed" });
      }
   } catch (error) {
      res.status(400).send({ message: "User Creatation unknown error" });
   }
});

userRouter.post("/checkusername", async (req, res) => {
   const { emailAsUsername } = req.body;

   try {
      const existingUser = await User.findOne({ emailAsUsername });
      const isUnique = !existingUser;
      res.json({ isUnique });
   } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
   }
});

// Signin Route is pending

export { userRouter };
