import express from "express";
import { z } from "zod";
import { ClientList } from "../db/db";
const clientRouter = express.Router();

const clientSchema = z.object({
   companyName: z.string(),
   phoneNumber: z.string().min(10),
   email: z.string().email(),
   clientName: z.string(),
   Address: z.string(),
   gstNo: z.string(),
   panNo: z.string(),
   tanNo: z.string(),
});

clientRouter.post("/addclient", async (req, res) => {
   const data = req.body;
   try {
      const validationRsult = clientSchema.parse(data);

      await ClientList.create({
         companyName: data.companyName,
         phoneNumber: data.phoneNumber,
         email: data.email,
         clientName: data.clientName,
         address: data.Address,
         gstNo: data.gstNo,
         panNo: data.panNo,
         tanNo: data.tanNo,
      });

      res.send({ message: "Data Verified & added to DB", data: validationRsult });
   } catch (error) {
      res.status(400).send({ message: "Check Data", error });
   }
});

// modify below route to delete client with id as identifier
clientRouter.delete("/deleteclient", async (req, res) => {
   const idToDelete = req.body.id;

   try {
      const deletedClient = await ClientList.findOneAndDelete({
         _id: idToDelete,
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
   const idToEdit = req.body.id;
   const data = req.body;
   try {
      const editedClient = await ClientList.findOneAndUpdate(
         {
            _id: idToEdit,
         },
         {
            phoneNumber: data.phoneNumber,
            email: data.email,
            clientName: data.clientName,
            companyName: data.companyName,
            address: data.Address,
            panNo: data.panNo,
            gstNo: data.gstNo,
            tanNo: data.tanNo,
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

clientRouter.get("/getall", async (req, res) => {
   try {
      const allClient = await ClientList.find();
      res.send({ message: "All Clients", data: allClient });
      // res.send({ allClient });
   } catch (error) {
      res.send({ message: "Error fetching records!" });
   }
});
export { clientRouter };
