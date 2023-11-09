import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Button, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Formik, FieldArray, Field, Form } from "formik";
import {
  MaterialTailwindInput,
  MaterialTailwindRadio,
  MaterialTailwindSelect,
} from "../Components/MaterialTailwindInput";
import { validationSchema } from "../Components/constants";
import Swal from "sweetalert2";
export default function UpdateForm() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataUpdate = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/update/${id}`);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchDataUpdate();
  }, [id]);
  console.log(data);

  return (
    <div className="w-full">
      <Link to="/" className="flex  px-8 pb-8 mt-3">
        <FontAwesomeIcon icon={faArrowLeft} />
        <Typography className="pl-2" variant="small">
          Back
        </Typography>
      </Link>

      <Formik
        initialValues={{
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
          membersResponded: {
            driver: "",
            members: [
              {
                nameOfMembers: "",
              },
            ],
            dispatch: "",
            preparedBy: "",
          },
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log("values", values);
          try {
            const response = await axios.post("http://localhost:3000/", {
              reports: values,
            });
            console.log("Request successful:", response.data);
            window.location.reload();
          } catch (error) {
            console.error("Error:", error);
          }
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form className="px-8 pt-6 pb-8 mb-4">
            <Typography variant="h4" className="text-gray-700 py-3">
              Report Information
            </Typography>
            <div className="grid grid-cols-2">
              <div>
                {errors.emergencyType && touched.emergencyType ? (
                  <Typography color="red">Please select an option.</Typography>
                ) : null}
                <Field
                  type="radio "
                  name="emergencyType"
                  label="Medical"
                  color="green"
                  component={MaterialTailwindRadio}
                  value="medical"
                />
                <Field
                  type="radio"
                  name="emergencyType"
                  label="Trauma"
                  color="green"
                  component={MaterialTailwindRadio}
                  value="trauma"
                />
              </div>
              <div className="place-self-end">
                <div className="py-3">
                  <Field
                    type="date"
                    name="date"
                    label="Date"
                    component={MaterialTailwindInput}
                    error={errors.date && touched.date ? true : false}
                  />
                </div>
                <div className="py-3">
                  <Field
                    type="time"
                    name="time"
                    label="Time"
                    component={MaterialTailwindInput}
                    error={errors.time && touched.time ? true : false}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <Field
                type="text"
                name="typeOfIncident"
                label="Type Of Incident"
                component={MaterialTailwindInput}
                error={
                  errors.typeOfIncident && touched.typeOfIncident ? true : false
                }
              />
              <Field
                type="text"
                name="location"
                label="Location"
                component={MaterialTailwindInput}
                error={errors.location && touched.location ? true : false}
              />
              <Field
                type="text"
                name="nameOfCaller"
                label="Name Of Caller"
                component={MaterialTailwindInput}
                error={
                  errors.nameOfCaller && touched.nameOfCaller ? true : false
                }
              />
              <Field
                type="number"
                name="personInvolved"
                label="No. Person Involved"
                component={MaterialTailwindInput}
                error={
                  errors.personInvolved && touched.personInvolved ? true : false
                }
              />
            </div>
            <div>
              <FieldArray name="patientInformation">
                {({ insert, push, remove }) => (
                  <div>
                    <div className="flex justify-between py-3">
                      <Typography variant="h4" className="text-gray-700 py-3">
                        Patient Information
                      </Typography>
                      <Button
                        type="button"
                        color="green"
                        onClick={() =>
                          push({
                            nameOfPatient: "",
                            age: "",
                            gender: "",
                            condition: "",
                            actionTaken: "",
                            responders: "",
                          })
                        }
                      >
                        ADD PATIENT
                      </Button>
                    </div>
                    {values.patientInformation.map((patient, index) => (
                      <div key={index} className="grid grid-cols-1 gap-3 py-3">
                        <Field
                          type="text"
                          name={`patientInformation[${index}].nameOfPatient`}
                          label="Name Of Patient"
                          component={MaterialTailwindInput}
                          error={
                            errors.patientInformation &&
                            errors.patientInformation[index] &&
                            errors.patientInformation[index].nameOfPatient &&
                            touched.patientInformation &&
                            touched.patientInformation[index] &&
                            touched.patientInformation[index].nameOfPatient
                              ? true
                              : false
                          }
                        />
                        <Field
                          type="number"
                          name={`patientInformation[${index}].age`}
                          label="Age"
                          component={MaterialTailwindInput}
                          error={
                            errors.patientInformation &&
                            errors.patientInformation[index] &&
                            errors.patientInformation[index].age &&
                            touched.patientInformation &&
                            touched.patientInformation[index] &&
                            touched.patientInformation[index].age
                              ? true
                              : false
                          }
                        />
                        <Field
                          name={`patientInformation[${index}].gender`}
                          label="Gender"
                          component={MaterialTailwindSelect}
                          error={
                            errors.patientInformation &&
                            errors.patientInformation[index] &&
                            errors.patientInformation[index].gender &&
                            touched.patientInformation &&
                            touched.patientInformation[index] &&
                            touched.patientInformation[index].gender
                              ? true
                              : false
                          }
                        />
                        <Field
                          type="text"
                          name={`patientInformation[${index}].condition`}
                          label="Condition"
                          component={MaterialTailwindInput}
                          error={
                            errors.patientInformation &&
                            errors.patientInformation[index] &&
                            errors.patientInformation[index].condition &&
                            touched.patientInformation &&
                            touched.patientInformation[index] &&
                            touched.patientInformation[index].condition
                              ? true
                              : false
                          }
                        />
                        <Field
                          type="text"
                          name={`patientInformation[${index}].actionTaken`}
                          label="Action Taken"
                          component={MaterialTailwindInput}
                          error={
                            errors.patientInformation &&
                            errors.patientInformation[index] &&
                            errors.patientInformation[index].actionTaken &&
                            touched.patientInformation &&
                            touched.patientInformation[index] &&
                            touched.patientInformation[index].actionTaken
                              ? true
                              : false
                          }
                        />
                        <Field
                          type="number"
                          name={`patientInformation[${index}].responders`}
                          label="No. Responders"
                          component={MaterialTailwindInput}
                          error={
                            errors.patientInformation &&
                            errors.patientInformation[index] &&
                            errors.patientInformation[index].responders &&
                            touched.patientInformation &&
                            touched.patientInformation[index] &&
                            touched.patientInformation[index].responders
                              ? true
                              : false
                          }
                        />
                        <Button
                          type="button"
                          color="red"
                          onClick={() => remove(index)}
                        >
                          X
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>
            </div>
            <Typography variant="h4" className="text-gray-700 py-3">
              Responders Information
            </Typography>
            <div className="grid grid-cols-1 gap-3">
              <Field
                type="text"
                name={`membersResponded.driver`}
                label="Driver"
                component={MaterialTailwindInput}
                error={
                  errors.membersResponded &&
                  errors.membersResponded.driver &&
                  touched.membersResponded &&
                  touched.membersResponded.driver
                    ? true
                    : false
                }
              />

              <FieldArray name="membersResponded.members">
                {({ remove, push }) => (
                  <div>
                    {values.membersResponded.members.map((mem, index) => (
                      <div key={index} className="py-2 flex">
                        <Field
                          type="text"
                          name={`membersResponded.members[${index}].nameOfMembers`}
                          label="Add Members"
                          component={MaterialTailwindInput}
                          error={
                            errors.membersResponded &&
                            errors.membersResponded.members &&
                            errors.membersResponded.members[index] &&
                            errors.membersResponded.members[index]
                              .nameOfMembers &&
                            touched.membersResponded &&
                            touched.membersResponded.members &&
                            touched.membersResponded.members[index] &&
                            touched.membersResponded.members[index]
                              .nameOfMembers
                              ? true
                              : false
                          }
                        />
                        <Button
                          type="button"
                          color="red"
                          className="ml-2"
                          onClick={() => remove(index)}
                        >
                          X
                        </Button>
                      </div>
                    ))}
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        color="green"
                        onClick={() =>
                          push({
                            nameOfMembers: "",
                          })
                        }
                      >
                        ADD MEMBER
                      </Button>
                    </div>
                  </div>
                )}
              </FieldArray>
              <Field
                type="text"
                name={`membersResponded.dispatch`}
                label="Dispatch"
                component={MaterialTailwindInput}
                error={
                  errors.membersResponded &&
                  errors.membersResponded.dispatch &&
                  touched.membersResponded &&
                  touched.membersResponded.dispatch
                    ? true
                    : false
                }
              />
              <Field
                type="text"
                name={`membersResponded.preparedBy`}
                label="Prepared By"
                component={MaterialTailwindInput}
                error={
                  errors.membersResponded &&
                  errors.membersResponded.preparedBy &&
                  touched.membersResponded &&
                  touched.membersResponded.preparedBy
                    ? true
                    : false
                }
              />
            </div>
            <div className="flex justify-end my-3">
              <Button type="submit" color="green" disabled={isSubmitting}>
                {isSubmitting ? "Submitting" : "Submit"}
              </Button>
            </div>

            <pre>{JSON.stringify({ values, errors }, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}
