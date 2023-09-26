import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Typography } from "@material-tailwind/react";
import DialogMessage from "../Components/Dialog";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Table() {
  const [data, setData] = useState([]);
  const [size, setSize] = useState(null);
  // const [id,setId]= useState(null);
  const [report, setReport] = useState({});
  const [open, setOpen] = useState(false);

  const handleOpen = (value, id) => {
    setOpen(!open);
    setSize(value);
    if (id) {
      axios
        .get(`http://localhost:3000/update/${id}`)
        .then((response) => {
          setReport(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };
  const TABLE_HEAD = [
    "Name",
    "Age",
    "Gender",
    "Injury/Condition",
    "Action Taken",
    "Responders",
    "Action",
  ];

  // Function to fetch data from the server
  const fetchData = () => {
    axios
      .get("http://localhost:3000/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();

    // const pollingInterval = setInterval(fetchData, 10000);

    // return () => {
    //   clearInterval(pollingInterval); // Clean up the polling interval when the component unmounts
    // };
  }, []);

  //Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/deleteReports/${id}`)
          .then((result) => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  return (
    <div className="rounded  bg-white mx-3 py-5 px-3">
      <DialogMessage
        size={size}
        open={open}
        handleOpen={handleOpen}
        report={report}
      />
      <h1 className="text-gray-700 text-xl font-bold mb-3 font-serif py-3">
        Reports
      </h1>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td className="border border-slate-300 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.patientInformation.nameOfPatient}
                  </Typography>
                </td>
                <td className="border border-slate-300 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.patientInformation.age}
                  </Typography>
                </td>
                <td className="border border-slate-300 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.patientInformation.gender}
                  </Typography>
                </td>
                <td className="border border-slate-300 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.patientInformation.condition}
                  </Typography>
                </td>
                <td className="border border-slate-300 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.patientInformation.actionTaken}
                  </Typography>
                </td>
                <td className="border border-slate-300 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {item.patientInformation.responders}
                  </Typography>
                </td>
                <td className="border border-slate-300">
                  <div className="flex justify-center">
                    <Button
                      onClick={() => handleOpen("xl", item._id)}
                      className="bg-green-300 drop-shadow-xl hover:bg-green-500 text-white text-sm font-bold px-3 py-1 rounded my-2 mx-2"
                    >
                      <PrintIcon />
                    </Button>
                    <Link
                      to={`/update/${item._id}`}
                      className="bg-blue-300 drop-shadow-xl hover:bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded my-2 mx-2"
                    >
                      <EditIcon />
                    </Link>
                    <Button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-300 drop-shadow-xl hover:bg-red-500 text-white text-sm font-bold px-3 py-1 rounded my-2 mx-2"
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
