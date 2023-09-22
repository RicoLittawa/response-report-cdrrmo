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
    nameOfPatient: Yup.string().required("Name of patient is required"),
    age: Yup.string().required("Age is required"),
    gender: Yup.string()
      .required("Gender is required")
      .oneOf(["Male", "Female"], "Invalid gender type"),
    condition: Yup.string().required("Injury/Condition is required"),
    actionTaken: Yup.string().required("Action taken is required"),
    responders: Yup.string().required("Responders is required"),
    driver: Yup.string().required("Driver is required"),
    dispatch: Yup.string().required("Dispatch is required"),
    members: Yup.string().required("Members is required"),
    preparedBy: Yup.string().required("Prepared by is required"),
  });

  export const genderArray = ["Male", "Female"];
