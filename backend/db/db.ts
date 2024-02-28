import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/passwordManagerDB");

const AdminSchema = new mongoose.Schema({
   username: String,
   password: String,
});

const ClientListSchema = new mongoose.Schema({
   phoneNumber: { type: Number, unique: true },
   email: String,
   clientName: String,
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

const Admin = mongoose.model("Admin", AdminSchema);
const ClientList = mongoose.model("ClientList", ClientListSchema);
const CredentialDB = mongoose.model("CredentialDB", CredentialDBSchema);

export { Admin, ClientList, CredentialDB };
