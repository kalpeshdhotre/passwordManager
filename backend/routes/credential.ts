import express from "express";
import { z } from "zod";
import { CredentialDB } from "../db/db";
const credentialRouter = express.Router();

const credentialSchema = z.object({
   clientID: z.string(),
   personName: z.string(),
   personDesignation: z.string(),
   personMobileNumber: z.string(),
   credentialTitle: z.string(),
   credentialRegNumber: z.string(),
   loginLink: z.string(),
   userName: z.string(),
   password: z.string(),
});

// Add Route to add new credential details
credentialRouter.post("/add", async (req, res) => {
   const data = req.body;

   try {
      const validatedData = credentialSchema.parse(data);
      await CredentialDB.create({
         clientID: validatedData.clientID,
         personName: validatedData.personName,
         personDesignation: validatedData.personDesignation,
         personMobileNumber: validatedData.personMobileNumber,
         credentialTitle: validatedData.credentialTitle,
         credentialRegNumber: validatedData.credentialRegNumber,
         loginLink: validatedData.loginLink,
         userName: validatedData.userName,
         password: validatedData.password,
      });
      res.send({ message: "Record added succesfully" });
   } catch (error) {
      console.log(error);
      res.status(400).send({ message: "Check Data sent" });
   }
});

// get Route to fetch all credential details
credentialRouter.get("/get", async (req, res) => {
   const id = req.body.id;
   try {
      const allRecords = await CredentialDB.find({
         clientID: id,
      });
      res.send(allRecords);
   } catch (error) {
      res.status(404).send({ message: "Error occured" });
   }
});

// edit router
credentialRouter.put("/edit", async (req, res) => {
   const data = req.body;
   try {
      const result = (await CredentialDB.findOneAndUpdate(
         {
            _id: data.id,
            // credentialTitle: data.credentialTitle,
         },
         {
            $set: {
               personName: data.personName,
               personDesignation: data.personDesignation,
               personMobileNumber: data.personMobileNumber,
               credentialTitle: data.credentialTitle,
               credentialRegNumber: data.credentialRegNumber,
               loginLink: data.loginLink,
               userName: data.userName,
               password: data.password,
            },
         },
         { upsert: false, returnOriginal: false }
      )) as { value: any };

      if (result) {
         res.send({ message: "Record Updated" });
      } else {
         res.send({ message: "Record Not Found" });
      }
   } catch (error) {
      res.send({ message: "Error updating data" });
   }
});
export { credentialRouter };

// Delete router
credentialRouter.delete("/delete", async (req, res) => {
   const id = req.body.id;

   try {
      await CredentialDB.findOneAndDelete({ _id: id });
      res.send({ message: "Delete Success" });
   } catch (error) {
      res.send({ message: "Error" });
   }
});
