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

export default function UpdateForm() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/reports/${id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });
  const handleChange = (e) => {};

  return (
    <div className="w-full">
      <Link to="/" className="flex  px-8 pb-8 mt-3">
        <FontAwesomeIcon icon={faArrowLeft} />
        <Typography className="pl-2" variant="small">
          Back
        </Typography>
      </Link>

      <form className="bg-white px-8 pb-8 mb-4">
        <Typography variant="h4" className="text-gray-700 mb-3">
          Report Information
        </Typography>
        <div className="grid grid-cols-3 gap-3">
          <Input
            label="Type of Emergency"
            type="text"
            value={data.emergencyType}
            onChange={handleChange}
          />
          <Input
            label="Date"
            type="date"
            value={data.date}
            onChange={handleChange}
          />
          <Input
            label="time"
            type="time"
            value={data.time}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 py-3">
          <Input label="Type of Incident" type="text" onChange={handleChange} />
          <Input label="Location" type="text" onChange={handleChange} />
          <Input label="Name of Caller" type="text" onChange={handleChange} />
          <Input
            label="No. of Person Involved"
            type="number"
            onChange={handleChange}
          />
        </div>
        <Typography variant="h4" className="text-gray-700 py-3">
          Patient Information
        </Typography>
        <div className="grid grid-cols-3 gap-3">
          <Input label="Name of Patient" type="text" onChange={handleChange} />
          <Input label="Age" type="number" onChange={handleChange} />
          <Input label="Gender" type="text" onChange={handleChange} />
          <Input label="Injury/Condition" type="text" onChange={handleChange} />
          <Input label="Action Taken" type="text" onChange={handleChange} />
          <Input label="Responders" type="number" onChange={handleChange} />
        </div>
        <Typography variant="h4" className="text-gray-700 py-3">
          Members Responded
        </Typography>
        <div className="grid grid-cols-1 gap-3">
          <Input label="Driver" type="number" onChange={handleChange} />
          <Input label="Dispatch" type="number" onChange={handleChange} />
          <Textarea
            label="Members"
            type="number"
            onChange={handleChange}
          ></Textarea>
          <Input label="Prepared by" type="number" onChange={handleChange} />
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
        </div>      </form>
    </div>
  );
}
