import express from "express";
import { z } from "zod";
import { ClientList } from "../db/db";
const clientRouter = express.Router();

const clientSchema = z.object({
   phoneNumber: z.string().min(10),
   email: z.string().email(),
   clientName: z.string(),
   companyName: z.string(),
   Address: z.string(),
   panNo: z.string(),
   gstNo: z.string(),
});

clientRouter.post("/addclient", async (req, res) => {
   const data = req.body;
   try {
      const validationRsult = clientSchema.parse(data);

      await ClientList.create({
         phoneNumber: data.phoneNumber,
         email: data.email,
         clientName: data.clientName,
         companyName: data.companyName,
         address: data.Address,
         panNo: data.panNo,
         gstNo: data.gstNo,
      });

      res.send({ message: "Data Verified & added to DB", data: validationRsult });
   } catch (error) {
      res.status(400).send({ message: "Check Data", error });
   }
});

clientRouter.delete("/deleteclient", async (req, res) => {
   const clientToDelete = req.body.clientName;
   try {
      const deletedClient = await ClientList.findOneAndDelete({
         clientName: clientToDelete,
      });
      if (deletedClient) {
         res.status(200).send({ message: "Delete scuessful" });
      } else {
         res.status(404).send({ message: "Client not found" });
      }
   } catch (error) {
      res.status(400).send({ message: "Check Input" });
   }
});

clientRouter.put("/editclient", async (req, res) => {
   const clientToEdit = req.body.clientName;
   const data = req.body;
   try {
      const editedClient = await ClientList.findOneAndUpdate(
         {
            clientName: clientToEdit,
         },
         {
            phoneNumber: data.phoneNumber,
            email: data.email,
            // clientName: data.clientName,
            companyName: data.companyName,
            address: data.Address,
            panNo: data.panNo,
            gstNo: data.gstNo,
         },
         { new: true }
      );
      if (editedClient) {
         res.status(200).send({ message: "Udpate done" });
      } else {
         res.status(404).send({ message: "Check input" });
      }
   } catch (error) {
      res.status(400).send({ message: "Error updating" });
   }
});

export { clientRouter };
