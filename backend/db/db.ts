import mongoose from "mongoose";
import { string } from "zod";

mongoose.connect("mongodb://localhost:27017/passwordManagerDB");

const UserSchema = new mongoose.Schema({
   emailAsUsername: String,
   password: String,
});

const ClientListSchema = new mongoose.Schema({
   companyName: String,
   phoneNumber: String,
   email: String,
   clientName: String,
   address: String,
   gstNo: String,
   panNo: String,
   tanNo: String,
});

const CredentialDBSchema = new mongoose.Schema({
   clientID: String,
   personName: String,
   personDesignation: String,
   personMobileNumber: String,
   credentialTitle: String,
   credentialRegNumber: String,
   loginLink: String,
   userName: String,
   password: String,
});

const User = mongoose.model("User", UserSchema);
const ClientList = mongoose.model("ClientList", ClientListSchema);
const CredentialDB = mongoose.model("CredentialDB", CredentialDBSchema);

export { User, ClientList, CredentialDB };
