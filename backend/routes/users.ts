import express from "express";
import { z } from "zod";
import { User } from "../db/db";
const userRouter = express.Router();

const userSchema = z.object({
   emailAsUsername: z.string(),
   password: z.string(),
});

// Signup route
userRouter.post("/signup", async (req, res) => {
   const data = req.body;
   try {
      const validateLoginData = userSchema.parse(data);
      if (validateLoginData) {
         await User.create({
            emailAsUsername: data.emailAsUsername,
            password: data.password,
         });
         res.send({ message: "User created successfully" });
      } else {
         res.send({ message: "User creation failed" });
      }
   } catch (error) {
      res.status(400).send({ message: "User Creatation unknown error" });
   }
});

// Check username for uniqueness for signup
userRouter.post("/checkusername", async (req, res) => {
   const userName = req.body.emailAsUsername;
   console.log(userName);

   try {
      const existingUser = await User.findOne({ emailAsUsername: userName });
      const isUnique = !existingUser;

      res.json({ message: "Success", isUnique });
   } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
   }
});

// Signin Route
userRouter.post("/signin", async (req, res) => {
   const data = req.body;
   console.log(data);

   try {
      const signInSucess = await User.findOne({
         emailAsUsername: data.emailAsUsername,
         password: data.password,
      });

      console.log(signInSucess);

      if (signInSucess) {
         res.send({ message: "success" });
      } else {
         res.send({ message: "failed" });
      }
   } catch (error) {
      res.send({ message: "signin error occured" });
   }
});

export { userRouter };
