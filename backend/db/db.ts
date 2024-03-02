import mongoose from "mongoose";
import { string } from "zod";

mongoose.connect("mongodb://localhost:27017/passwordManagerDB");

const UserSchema = new mongoose.Schema({
   username: String,
   password: String,
   role: String,
});

const ClientListSchema = new mongoose.Schema({
   phoneNumber: String,
   email: String,
   clientName: { type: String, unique: true },
   companyName: String,
   address: String,
   panNo: String,
   gstNo: String,
});

const CredentialDBSchema = new mongoose.Schema({
   companyName: String,
   entityType: String,
   keyPerson: {
      designation: String,
      mobileNumber: Number,
   },
   credentialTitle: String,
   loginLink: String,
   userName: String,
   password: String,
   createdOn: Date,
   createdBy: String,
   editedOn: Date,
});

const User = mongoose.model("User", UserSchema);
const ClientList = mongoose.model("ClientList", ClientListSchema);
const CredentialDB = mongoose.model("CredentialDB", CredentialDBSchema);

export { User, ClientList, CredentialDB };
