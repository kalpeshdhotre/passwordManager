import express from "express";
import { z } from "zod";
import { ClientList } from "../db/db";
const router = express.Router();

const clientSchema = z.object({
   phoneNumber: z.string().min(10),
   email: z.string().email(),
   clientName: z.string(),
   companyName: z.string(),
   Address: z.string(),
   panNo: z.string(),
   gstNo: z.string(),
});

router.post("/addclient", async (req, res) => {
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

export { router };
