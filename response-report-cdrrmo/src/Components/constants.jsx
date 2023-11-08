import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  date: Yup.string().required("Date is required"),
  time: Yup.string().required("Time is required"),
  emergencyType: Yup.string()
    .required("Emergency type is required")
    .oneOf(["medical", "trauma"], "Invalid emergency type"),
  typeOfIncident: Yup.string().required("Type of incident is required"),
  location: Yup.string().required("Location is required"),
  nameOfCaller: Yup.string().required("Name of caller is required"),
  personInvolved: Yup.string().required("No. of person invloved is required"),
  patientInformation: Yup.array().of(
    Yup.object().shape({
      nameOfPatient: Yup.string().required("Name of patient is required"),
      age: Yup.string().required("Age is required"),
      gender: Yup.string().required("Gender is required"),
      condition: Yup.string().required("Condition is required"),
      actionTaken: Yup.string().required("Action taken is required"),
      responders: Yup.string().required("No. of Responders is required"),
    })
  ),
  membersResponded: Yup.object().shape({
    driver: Yup.string().required("Driver is required"),
    members: Yup.array().of(
      Yup.object().shape({
        nameOfMembers:Yup.string().required("Driver is required"),
      })
    ),
    dispatch: Yup.string().required("Driver is required"),
    preparedBy: Yup.string().required("Driver is required"),
  }),
});
