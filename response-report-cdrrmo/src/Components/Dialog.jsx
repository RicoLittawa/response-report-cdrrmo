import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  Typography,
} from "@material-tailwind/react";
import { useRef } from "react";
import logo1 from "../assets/logo1.png";
import ReactToPrint from "react-to-print";

export default function DialogMessage({ open, size, handleOpen, report }) {
  const formatTime = (data) => {
    // Create a new Date object to parse the time string
    const jsDate = new Date(`01/01/2000 ${data}`);
    // Extract hours and minutes
    let hours = jsDate.getHours();
    const minutes = jsDate.getMinutes().toString().padStart(2, "0");
    // Determine AM or PM
    const amOrPm = hours >= 12 ? "PM" : "AM";
    // Convert to 12-hour format
    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }
    return `${hours}:${minutes} ${amOrPm}`;
  };
  // const nameOfPatient = report?.patientInformation?.nameOfPatient ?? "Unknown";
  // const age = report?.patientInformation?.age ?? "Unknown";
  // const gender = report?.patientInformation?.gender ?? "Unknown";
  // const condition = report?.patientInformation?.condition ?? "Unknown";
  // const actionTaken = report?.patientInformation?.actionTaken ?? "Unknown";
  // const responders = report?.patientInformation?.responders ?? "Unknown";
  // const driver = report?.membersResponded?.driver ?? "Unknown";
  // const members = report?.membersResponded?.members ?? "Unknown";
  // const dispatch = report?.membersResponded?.dispatch ?? "Unknown";
  // const prepared = report?.membersResponded?.preparedBy ?? "Unknown";
  const componentRef = useRef();
  const time = formatTime(report.time);
console.log(report)
  return (
    <section>
      <Dialog open={open} size={size || "md"} handler={handleOpen}>
        <DialogHeader>Print Report</DialogHeader>
        <DialogBody divider className="h-96 overflow-scroll">
          <div ref={componentRef}>
            <header className="pt-10">
              <div className="image-position">
                <img src={logo1} alt="logo" className="w-24 h-16 logo-image" />
                <div className="text-center text-black">
                  <p className="text-sm">REPUBLIC OF THE PHILIPPINES</p>
                  <p className="font-bold text-sm  font-serif red-border mb-0 pb-0">
                    CITY DISASTER RISK REDUCTION MANAGEMENT OFFICE
                  </p>
                  <div className="straight-line"></div>
                  <p className="italic text-sm">
                    Barangay Bolbok, Batangas City, Batangas 4200
                  </p>
                  <p className="italic text-sm">
                    (043) 7023902/984-4300/727-2768/cdrrmobatangas@yahoo.com.ph
                  </p>
                </div>
              </div>
            </header>
            <section className="pt-3 mx-32">
              <h4 className="text-center font-bold text-black">
                RESPONSE REPORT
              </h4>
              <div className="flex justify-between pt-3 font-bold text-sm text-black">
                <p>
                  Type of Emergency:
                  <span className="font-normal"> {report.emergencyType}</span>
                </p>
                <div>
                  <p>
                    Date: <span className="font-normal"> {report.date}</span>
                  </p>
                  <p>
                    Time of Call:
                    <span className="font-normal"> {time}</span>
                  </p>
                </div>
              </div>
              <div className="text-sm text-black font-bold mb-5">
                <p>
                  Type of Incident:
                  <span className="font-normal"> {report.typeOfIncident}</span>
                </p>
                <p>
                  Location:{" "}
                  <span className="font-normal"> {report.location} </span>
                </p>
                <p>
                  Name of Caller:
                  <span className="font-normal"> {report.nameOfCaller}</span>
                </p>
                <p>
                  No. of person involved:
                  <span className="font-normal"> {report.personInvolved}</span>
                </p>
              </div>
              <Card>
                <table>
                  <thead className="text-sm font-normal text-black">
                    <tr>
                      <th className="border border-slate-300">NAME</th>
                      <th className="border border-slate-300">AGE</th>
                      <th className="border border-slate-300">GENDER</th>
                      <th className="border border-slate-300">
                        INJURY/CONDITION
                      </th>
                      <th className="border border-slate-300">ACTION TAKEN</th>
                      <th className="border border-slate-300">RESPONDERS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 px-3">
                        <span className="font-normal"></span>
                      </td>
                      <td className="border border-slate-300 px-3">
                        <span className="font-normal"></span>
                      </td>
                      <td className="border border-slate-300 px-3">
                        <span className="font-normal"></span>
                      </td>
                      <td className="border border-slate-300 px-3">
                        <span className="font-normal"></span>
                      </td>
                      <td className="border border-slate-300 px-3">
                        <span className="font-normal"></span>
                      </td>
                      <td className="border border-slate-300 px-3">
                        <span className="font-normal"></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            </section>
            <section className="pt-32 mx-32">
              <div
                className=".
              "
              >
                <p>Members Responded:</p>
                <div className="ml-4">
                  <p>
                    Driver:
                    <span className="font-normal"></span>
                  </p>
                  <p>
                    Member/s:
                    <span className="font-normal"></span>
                  </p>
                  <p>
                    Dispatch:
                    <span className="font-normal"></span>
                  </p>
                </div>
              </div>
              <div className="ml-12 py-5 text-sm">
                <p className="text-black py-3 font-bold">Prepared by:</p>
                <p className="font-bold text-black ">
                  <span className="font-normal"></span>
                </p>
              </div>
              <div className="ml-12 text-sm">
                <p className="text-black py-3 font-bold">Verified by:</p>
                <p className="font-bold text-black">JULIUS M. MALANTIC,MDRM</p>
                <p className="text-gray">Operations and Warning Officer</p>
              </div>
              <div className="ml-12 py-5 text-sm">
                <p className="text-black py-3 font-bold">Noted by:</p>
                <p className="font-bold text-black">
                  RODRIGO D. DELA ROCA, RSW, MDRM
                </p>
                <p className="text-gray">OIC Department Head - CDRRMO</p>
              </div>
            </section>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <ReactToPrint
            trigger={() => {
              return (
                <Button variant="gradient" color="green">
                  <span>Print</span>
                </Button>
              );
            }}
            content={() => componentRef.current}
          />
        </DialogFooter>
      </Dialog>
    </section>
  );
}
