import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Radio,
  Typography,
  Input,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { genderArray, validationSchema } from "../Components/constants";
export default function UpdateForm() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/update/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      emergencyType: data.emergencyType || "",
      date: data.date || "",
      time: data.time || "",
      typeOfIncident: data.typeOfIncident || "",
      location: data.location || "",
      nameOfCaller: data.nameOfCaller || "",
      personInvolved: data.personInvolved || "",
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
      ...data.patientInformation,
      ...data.membersResponded,
    },
    validationSchema,
    onSubmit: (values,{ resetForm }) => {
      const updatedData = {
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
        .put(`http://localhost:3000/update/${id}`, { reports: updatedData })
        .then((result) => {
          console.log(result);
          resetForm()
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <div className="w-full">
      <Link to="/" className="flex  px-8 pb-8 mt-3">
        <FontAwesomeIcon icon={faArrowLeft} />
        <Typography className="pl-2" variant="small">
          Back
        </Typography>
      </Link>

      <form className="bg-white px-8 pb-8 mb-4" onSubmit={formik.handleSubmit}>
        <Typography variant="h4" className="text-gray-700 py-3">
          Report Information
        </Typography>
        <div className="grid grid-cols-2 gap-3">
          <div id="emergencyType" className="mb-2">
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
                label="Date"
                type="date"
                name="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.date && formik.errors.date ? true : false}
              />
            </div>
            <div>
              {formik.touched.time && formik.errors.time ? (
                <Typography variant="small" className="text-red-500">
                  <FontAwesomeIcon
                    className="pr-1"
                    icon={faCircleExclamation}
                  />
                  {formik.errors.time}
                </Typography>
              ) : null}
              <Input
                label="time"
                type="time"
                name="time"
                value={formik.values.time}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.time && formik.errors.time ? true : false}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 py-3">
          {formik.touched.typeOfIncident && formik.errors.typeOfIncident ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.typeOfIncident}
            </Typography>
          ) : null}
          <Input
            label="Type of Incident"
            type="text"
            name="typeOfIncident"
            value={formik.values.typeOfIncident}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.typeOfIncident && formik.errors.typeOfIncident
                ? true
                : false
            }
          />
          {formik.touched.location && formik.errors.location ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.location}
            </Typography>
          ) : null}
          <Input
            label="Location"
            type="text"
            name="location"
            onChange={formik.handleChange}
            value={formik.values.location}
            onBlur={formik.handleBlur}
            error={
              formik.touched.location && formik.errors.location ? true : false
            }
          />
          {formik.touched.nameOfCaller && formik.errors.nameOfCaller ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.nameOfCaller}
            </Typography>
          ) : null}
          <Input
            label="Name of Caller"
            type="text"
            name="nameOfCaller"
            value={formik.values.nameOfCaller}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.nameOfCaller && formik.errors.nameOfCaller
                ? true
                : false
            }
          />
          {formik.touched.personInvolved && formik.errors.personInvolved ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.personInvolved}
            </Typography>
          ) : null}
          <Input
            label="No. of Person Involved"
            type="number"
            name="personInvolved"
            value={formik.values.personInvolved}
            onChange={formik.handleChange}
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
        <div className="grid grid-cols-1 gap-3">
          {formik.touched.nameOfPatient && formik.errors.nameOfPatient ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.nameOfPatient}
            </Typography>
          ) : null}
          <Input
            label="Name of Patient"
            type="text"
            name="nameOfPatient"
            value={formik.values.nameOfPatient}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.nameOfPatient && formik.errors.nameOfPatient
                ? true
                : false
            }
          />
          {formik.touched.age && formik.errors.age ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.age}
            </Typography>
          ) : null}
          <Input
            label="Age"
            type="number"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.age && formik.errors.age ? true : false}
          />
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
          {formik.touched.condition && formik.errors.condition ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.condition}
            </Typography>
          ) : null}
          <Input
            label="Injury/Condition"
            type="text"
            name="condition"
            value={formik.values.condition}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.condition && formik.errors.condition ? true : false
            }
          />
          {formik.touched.actionTaken && formik.errors.actionTaken ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.actionTaken}
            </Typography>
          ) : null}
          <Input
            label="Action Taken"
            type="text"
            name="actionTaken"
            value={formik.values.actionTaken}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.actionTaken && formik.errors.actionTaken
                ? true
                : false
            }
          />
          {formik.touched.responders && formik.errors.responders ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.responders}
            </Typography>
          ) : null}
          <Input
            label="Responders"
            type="number"
            name="responders"
            value={formik.values.responders}
            onChange={formik.handleChange}
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
        <div className="grid grid-cols-1 gap-3">
          {formik.touched.driver && formik.errors.driver ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.driver}
            </Typography>
          ) : null}
          <Input
            label="Driver"
            type="text"
            name="driver"
            value={formik.values.driver}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.driver && formik.errors.driver ? true : false}
          />
          {formik.touched.dispatch && formik.errors.dispatch ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.dispatch}
            </Typography>
          ) : null}
          <Input
            label="Dispatch"
            type="text"
            name="dispatch"
            value={formik.values.dispatch}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.dispatch && formik.errors.dispatch ? true : false
            }
          />
          {formik.touched.members && formik.errors.members ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.members}
            </Typography>
          ) : null}
          <Textarea
            label="Members"
            type="text"
            name="members"
            value={formik.values.members}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.members && formik.errors.members ? true : false
            }
          ></Textarea>
          {formik.touched.preparedBy && formik.errors.preparedBy ? (
            <Typography variant="small" className="text-red-500">
              <FontAwesomeIcon className="pr-1" icon={faCircleExclamation} />
              {formik.errors.preparedBy}
            </Typography>
          ) : null}
          <Input
            label="Prepared by"
            type="text"
            name="preparedBy"
            value={formik.values.preparedBy}
            onChange={formik.handleChange}
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
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
