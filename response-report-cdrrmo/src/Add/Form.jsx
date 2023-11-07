import axios from "axios";
import { useFormik,FieldArray } from "formik";
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
import { validationSchema, genderArray } from "../Components/constants";
import LoadingState from "../Components/LoadingState";
import useLoading from "../Components/scripts/useLoading";
import Swal from "sweetalert2";
import { useState } from "react";
export default function FormFields() {
  const { loading, startLoading, stopLoading } = useLoading();
  const formik = useFormik({
    initialValues: {
      emergencyType: "",
      date: "",
      time: "",
      typeOfIncident: "",
      location: "",
      nameOfCaller: "",
      personInvolved: "",
      patientInformation: [
        {
          nameOfPatient: "",
          age: "",
          gender: "",
          condition: "",
          actionTaken: "",
          responders: "",
        },
      ],
    },
    onSubmit: (values, errors) => {},
  });

  return (
    <div className="w-full">
      <form onSubmit={formik.handleSubmit} className="px-8 pt-6 pb-8 mb-4">
        <Typography variant="h4" className="text-gray-700 py-3">
          Report Information
        </Typography>
        <div className="grid grid-cols-2 pb-3">
          <div>
            <Typography variant="small" className="text-gray-700">
              Type of Emergency
            </Typography>
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
          <div className="place-self-end">
            <div className="pb-3">
              <Input
                type="date"
                name="date"
                label="Date"
                onChange={formik.handleChange}
                value={formik.values.date}
                onBlur={formik.handleBlur}
              />
            </div>
            <div>
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
        <div className="grid grid-cols-1 gap-3">
          <Input
            type="typeOfIncident"
            name="typeOfIncident"
            label="Type of Incident"
            onChange={formik.handleChange}
            value={formik.values.typeOfIncident}
            onBlur={formik.handleBlur}
          />
          <Input
            type="location"
            name="location"
            label="Location"
            onChange={formik.handleChange}
            value={formik.values.location}
            onBlur={formik.handleBlur}
          />
          <Input
            type="nameOfCaller"
            name="nameOfCaller"
            label="Name of Caller"
            onChange={formik.handleChange}
            value={formik.values.nameOfCaller}
            onBlur={formik.handleBlur}
          />
          <Input
            type="personInvolved"
            name="personInvolved"
            label="No. Of Person Involved"
            onChange={formik.handleChange}
            value={formik.values.personInvolved}
            onBlur={formik.handleBlur}
          />
        </div>
       {
        formik.values.patientInformation.map((patient, index)=>(
          <div key={index}>
            <Input name={`patientInformation[${index}].nameOfPatient`} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          </div>
        ))
       }

        <div className="flex justify-end my-3">
          <Button type="submit">Submit</Button>
        </div>
        <pre>
          {JSON.stringify(
            { values: formik.values, errors: formik.errors },
            null,
            2
          )}
        </pre>
      </form>
    </div>
  );
}
