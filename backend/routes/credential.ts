import express from "express";
import { z } from "zod";
import { CredentialDB } from "../db/db";
const credentialRouter = express.Router();

const credentialSchema = z.object({
   companyName: z.string(),
   entityType: z.string(),
   keyPerson: z.object({
      name: z.string(),
      designation: z.string(),
      mobileNumber: z.number(),
   }),
   credentialTitle: z.string(),
   loginLink: z.string(),
   userName: z.string(),
   password: z.string(),
   createdOn: z.coerce.date(),
   createdBy: z.string(),
   editedOn: z.coerce.date(),
});

// Add Route to add new credential details
credentialRouter.post("/add", async (req, res) => {
   const data = req.body;

   try {
      const validatedData = credentialSchema.parse(data);
      await CredentialDB.create({
         companyName: validatedData.companyName,
         entityType: validatedData.entityType,
         keyPerson: {
            name: validatedData.keyPerson.name,
            designation: validatedData.keyPerson.designation,
            mobileNumber: validatedData.keyPerson.mobileNumber,
         },
         credentialTitle: validatedData.credentialTitle,
         loginLink: validatedData.loginLink,
         userName: validatedData.userName,
         password: validatedData.password,
         createdOn: validatedData.createdOn,
         createdBy: validatedData.createdBy,
         editedOn: validatedData.editedOn,
      });

      res.send({ message: "Record added succesfully" });
   } catch (error) {
      console.log(error);

      res.status(400).send({ message: "Check Data sent" });
   }
});

// get Route to fetch all credential details
credentialRouter.get("/get", async (req, res) => {
   const { companyName } = req.body;
   try {
      const allRecords = await CredentialDB.find({
         companyName,
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
               entityType: data.entityType,
               keyPerson: {
                  name: data.keyPerson.name,
                  designation: data.keyPerson.designation,
                  mobileNumber: data.keyPerson.mobileNumber,
               },
               credentialTitle: data.credentialTitle,
               loginLink: data.loginLink,
               userName: data.userName,
               password: data.password,
               createdOn: data.createdOn,
               createdBy: data.createdBy,
               editedOn: data.editedOn,
            },
         },
         { upsert: false, returnOriginal: false }
      )) as { value: any };

      if (result && result.value) {
         res.send({ message: "Record Updated" });
      } else {
         res.send({ message: "Record Not Found" });
      }
   } catch (error) {
      res.send({ message: "Error updating data" });
   }
});
export { credentialRouter };
