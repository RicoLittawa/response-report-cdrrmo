import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Radio,
  Typography,
  Input,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";

export const genderArray = ["Male", "Female"];
const currDate = new Date();
const formattedDate = currDate.toISOString().split("T")[0];
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

export default function Form() {
  const formik = useFormik({
    initialValues: {
      emergencyType: "",
      date: formattedDate,
      time: "",
      typeOfIncident: "",
      location: "",
      nameOfCaller: "",
      personInvolved: "",
      nameOfPatient: "",
      age: "",
      gender: "",
      condition: "",
      actionTaken: "",
      responders: "",
      driver: "",
      dispatch: "",
      members: "",
      preparedBy: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const reportData = {
        emergencyType: values.emergencyType,
        date: values.date,
        time: values.time,
        typeOfIncident: values.typeOfIncident,
        location: values.location,
        nameOfCaller: values.nameOfCaller,
        personInvolved: values.personInvolved,
        patientInformation: {
          nameOfPatient: values.nameOfPatient,
          age: values.age,
          gender: values.gender,
          condition: values.condition,
          actionTaken: values.actionTaken,
          responders: values.responders,
        },
        membersResponded: {
          driver: values.driver,
          dispatch: values.dispatch,
          members: values.members,
          preparedBy: values.preparedBy,
        },
      };
      axios
        .post("http://localhost:3000/", { reports: reportData })
        .then((result) => {
          console.log(result);
          resetForm();
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div className="w-full">
      <form
        className="bg-white px-8 pt-6 pb-8 mb-4"
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h4" className="text-gray-700">
          Report Information
        </Typography>
        <div className="grid grid-cols-2">
          <div id="emergencyType" className="px-3 mb-2">
            <Typography variant="small" className="text-gray-700">
              Type of Emergency
            </Typography>
            {formik.touched.emergencyType && formik.errors.emergencyType ? (
              <Typography variant="small" className="text-red-500">
                <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
                {formik.errors.emergencyType}
              </Typography>
            ) : null}
            <div>
              <Radio
                name="emergencyType"
                label="Medical"
                color="green"
                checked={formik.values.emergencyType === "medical"}
                onChange={formik.handleChange}
                value="medical"
              />
              <Radio
                name="emergencyType"
                label="Trauma"
                color="green"
                checked={formik.values.emergencyType === "trauma"}
                onChange={formik.handleChange}
                value="trauma"
              />
            </div>
          </div>
          <div className="place-self-end">
            <div className="pb-3">
              {formik.touched.date && formik.errors.date ? (
                <Typography variant="small" className="text-red-500">
                  <FontAwesomeIcon
                    className="pr-1"
                    icon={faCircleExclamation}
                  />
                  {formik.errors.date}
                </Typography>
              ) : null}
              <Input
                type="date"
                name="date"
                label="Date"
                onChange={formik.handleChange}
                value={formik.values.date}
                onBlur={formik.handleBlur}
                error={formik.touched.date && formik.errors.date ? true : false}
              />
            </div>
            <div>
              {formik.touched.time && formik.errors.time ? (
                <span className="text-red-500 text-sm">
                  <FontAwesomeIcon
                    className="pr-1"
                    icon={faCircleExclamation}
                  />
                  {formik.errors.time}
                </span>
              ) : null}
              <Input
                type="time"
                name="time"
                label="Time"
                onChange={formik.handleChange}
                value={formik.values.time}
                onBlur={formik.handleBlur}
                error={formik.touched.time && formik.errors.time ? true : false}
              />
            </div>
          </div>
        </div>
        <div className="py-3">
          {formik.touched.typeOfIncident && formik.errors.typeOfIncident ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.typeOfIncident}
            </Typography>
          ) : null}
          <Input
            type="text"
            name="typeOfIncident"
            label="Type of Incident"
            onChange={formik.handleChange}
            value={formik.values.typeOfIncident}
            onBlur={formik.handleBlur}
            error={
              formik.touched.typeOfIncident && formik.errors.typeOfIncident
                ? true
                : false
            }
          />
        </div>
        <div className="py-3">
          {formik.touched.location && formik.errors.location ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.location}
            </Typography>
          ) : null}
          <Input
            type="text"
            name="location"
            label="Location"
            onChange={formik.handleChange}
            value={formik.values.location}
            onBlur={formik.handleBlur}
            error={
              formik.touched.location && formik.errors.location ? true : false
            }
          />
        </div>
        <div className="py-3">
          {formik.touched.nameOfCaller && formik.errors.nameOfCaller ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.nameOfCaller}
            </Typography>
          ) : null}
          <Input
            type="text"
            name="nameOfCaller"
            label="Name of Caller"
            onChange={formik.handleChange}
            value={formik.values.nameOfCaller}
            onBlur={formik.handleBlur}
            error={
              formik.touched.nameOfCaller && formik.errors.nameOfCaller
                ? true
                : false
            }
          />
        </div>
        <div className="py-3">
          {formik.touched.personInvolved && formik.errors.personInvolved ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.personInvolved}
            </Typography>
          ) : null}
          <Input
            type="number"
            name="personInvolved"
            label="No. of Person Involved"
            onChange={formik.handleChange}
            value={formik.values.personInvolved}
            onBlur={formik.handleBlur}
            error={
              formik.touched.personInvolved && formik.errors.personInvolved
                ? true
                : false
            }
          />
        </div>
        <Typography variant="h4" className="text-gray-700 py-3">
          Patient Information
        </Typography>
        <div className="py-3">
          {formik.touched.nameOfPatient && formik.errors.nameOfPatient ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.nameOfPatient}
            </Typography>
          ) : null}
          <Input
            type="text"
            name="nameOfPatient"
            label="Name of Patient"
            onChange={formik.handleChange}
            value={formik.values.nameOfPatient}
            onBlur={formik.handleBlur}
            error={
              formik.touched.nameOfPatient && formik.errors.nameOfPatient
                ? true
                : false
            }
          />
        </div>
        <div className="py-3">
          {formik.touched.age && formik.errors.age ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.age}
            </Typography>
          ) : null}
          <Input
            type="number"
            name="age"
            label="Age"
            onChange={formik.handleChange}
            value={formik.values.age}
            onBlur={formik.handleBlur}
            error={formik.touched.age && formik.errors.age ? true : false}
          />
        </div>
        <div className="py-3">
          {formik.touched.gender && formik.errors.gender ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.gender}
            </Typography>
          ) : null}
          <Select
            label="Select Gender"
            name="gender"
            onChange={(e) => {
              // Manually set the value in Formik's state
              formik.setFieldValue("gender", e);
              // Call Formik's onChange to trigger validation
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.gender}
            error={formik.touched.gender && formik.errors.gender ? true : false}
          >
            {genderArray.map((gen) => (
              <Option key={gen} value={gen}>
                {gen}
              </Option>
            ))}
          </Select>
        </div>
        <div className="py-3">
          {formik.touched.condition && formik.errors.condition ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.condition}
            </Typography>
          ) : null}
          <Input
            type="text"
            name="condition"
            label="Injury/Condition"
            onChange={formik.handleChange}
            value={formik.values.condition}
            onBlur={formik.handleBlur}
            error={
              formik.touched.condition && formik.errors.condition ? true : false
            }
          />
        </div>
        <div className="py-3">
          {formik.touched.actionTaken && formik.errors.actionTaken ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.actionTaken}
            </Typography>
          ) : null}
          <Input
            type="text"
            name="actionTaken"
            label="Action Taken"
            onChange={formik.handleChange}
            value={formik.values.actionTaken}
            onBlur={formik.handleBlur}
            error={
              formik.touched.actionTaken && formik.errors.actionTaken
                ? true
                : false
            }
          />
        </div>
        <div className="py-3">
          {formik.touched.responders && formik.errors.responders ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.responders}
            </Typography>
          ) : null}
          <Input
            type="number"
            name="responders"
            label="Responders"
            onChange={formik.handleChange}
            value={formik.values.responders}
            onBlur={formik.handleBlur}
            error={
              formik.touched.responders && formik.errors.responders
                ? true
                : false
            }
          />
        </div>
        <Typography variant="h4" className="text-gray-700 py-3">
          Members Responded
        </Typography>
        <div className="py-3">
          {formik.touched.driver && formik.errors.driver ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.driver}
            </Typography>
          ) : null}
          <Input
            type="text"
            name="driver"
            label="Driver"
            onChange={formik.handleChange}
            value={formik.values.driver}
            onBlur={formik.handleBlur}
            error={formik.touched.driver && formik.errors.driver ? true : false}
          />
        </div>
        <div className="py-3">
          {formik.touched.dispatch && formik.errors.dispatch ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.dispatch}
            </Typography>
          ) : null}
          <Input
            type="text"
            name="dispatch"
            label="Dispatch"
            onChange={formik.handleChange}
            value={formik.values.dispatch}
            onBlur={formik.handleBlur}
            error={
              formik.touched.dispatch && formik.errors.dispatch ? true : false
            }
          />
        </div>
        <div className="py-3">
          {formik.touched.members && formik.errors.members ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.members}
            </Typography>
          ) : null}
          <Textarea
            name="members"
            rows="2"
            label="Members"
            onChange={formik.handleChange}
            value={formik.values.members}
            onBlur={formik.handleBlur}
            error={
              formik.touched.members && formik.errors.members ? true : false
            }
          ></Textarea>
        </div>
        <div className="py-3">
          {formik.touched.preparedBy && formik.errors.preparedBy ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.preparedBy}
            </Typography>
          ) : null}
          <Input
            name="preparedBy"
            label="Prepared by"
            onChange={formik.handleChange}
            value={formik.values.preparedBy}
            onBlur={formik.handleBlur}
            error={
              formik.touched.preparedBy && formik.errors.preparedBy
                ? true
                : false
            }
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="gradient"
            size="md"
            color="green"
            className="mt-2"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
