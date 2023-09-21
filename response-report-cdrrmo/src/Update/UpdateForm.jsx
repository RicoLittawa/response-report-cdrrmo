import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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

export default function UpdateForm() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const genderArray = ["Male", "Female"];

  useEffect(() => {
    axios
      .get(`http://localhost:3000/reports/${id}`)
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
        <Typography variant="h4" className="text-gray-700 mb-3">
          Report Information
        </Typography>
        <div className="grid grid-cols-3 gap-3">
          <Input
            label="Type of Emergency"
            type="text"
            name="emergencyType"
            value={formik.values.emergencyType}
            onChange={formik.handleChange}
          />
          <Input
            label="Date"
            type="date"
            name="date"
            value={formik.values.date}
            onChange={formik.handleChange}
          />
          <Input
            label="time"
            type="time"
            name="time"
            value={formik.values.time}
            onChange={formik.handleChange}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 py-3">
          <Input
            label="Type of Incident"
            type="text"
            name="typeOfIncident"
            value={formik.values.typeOfIncident}
            onChange={formik.handleChange}
          />
          <Input
            label="Location"
            type="text"
            name="location"
            onChange={formik.handleChange}
            value={formik.values.location}
          />
          <Input
            label="Name of Caller"
            type="text"
            name="nameOfCaller"
            value={formik.values.nameOfCaller}
            onChange={formik.handleChange}
          />
          <Input
            label="No. of Person Involved"
            type="number"
            name="personInvolved"
            value={formik.values.personInvolved}
            onChange={formik.handleChange}
          />
        </div>
        <Typography variant="h4" className="text-gray-700 py-3">
          Patient Information
        </Typography>
        <div className="grid grid-cols-3 gap-3">
          <Input
            label="Name of Patient"
            type="text"
            name="nameOfPatient"
            value={formik.values.nameOfPatient}
            onChange={formik.handleChange}
          />
          <Input
            label="Age"
            type="number"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
          />
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
          >
            {genderArray.map((gen) => (
              <Option key={gen} value={gen}>
                {gen}
              </Option>
            ))}
          </Select>

          <Input
            label="Injury/Condition"
            type="text"
            name="condition"
            value={formik.values.condition}
            onChange={formik.handleChange}
          />
          <Input
            label="Action Taken"
            type="text"
            name="actionTaken"
            value={formik.values.actionTaken}
            onChange={formik.handleChange}
          />
          <Input
            label="Responders"
            type="number"
            name="responders"
            value={formik.values.responders}
            onChange={formik.handleChange}
          />
        </div>
        <Typography variant="h4" className="text-gray-700 py-3">
          Members Responded
        </Typography>
        <div className="grid grid-cols-1 gap-3">
          <Input
            label="Driver"
            type="text"
            name="driver"
            value={formik.values.driver}
            onChange={formik.handleChange}
          />
          <Input
            label="Dispatch"
            type="text"
            name="dispatch"
            value={formik.values.dispatch}
            onChange={formik.handleChange}
          />
          <Textarea
            label="Members"
            type="text"
            name="members"
            value={formik.values.members}
            onChange={formik.handleChange}
          ></Textarea>
          <Input
            label="Prepared by"
            type="text"
            name="preparedBy"
            value={formik.values.preparedBy}
            onChange={formik.handleChange}
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
