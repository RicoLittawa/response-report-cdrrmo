const mongoose = require("mongoose");
const reportsSchema = new mongoose.Schema({
  emergencyType: String,
  date: String,
  time: String,
  typeOfIncident: String,
  location: String,
  nameOfCaller: String,
  personInvolved: String,
  patientInformation: {
    nameOfPatient: String,
    age: String,
    gender: String,
    condition: String,
    actionTaken: String,
    responders: String,
  },
  membersResponded: {
    driver: String,
    dispatch: String,
    members: String,
  },
});

const reportModel = mongoose.model("reports",reportsSchema)
module.exports= reportModel