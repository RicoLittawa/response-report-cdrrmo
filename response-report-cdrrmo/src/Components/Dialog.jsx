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

export default function DialogMessage(props) {
  const { dialogProp } = props;
  const { size, open, handleOpen, report } = dialogProp;
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
  const time = formatTime(report.time);
  const componentRef = useRef();

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
                  <span className="font-normal"> {report.location}</span>
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
                <table className="text-left table-auto w-full">
                  <thead className="text-sm font-normal text-black">
                    <tr>
                      <th className="border border-slate-300 p-2">NAME</th>
                      <th className="border border-slate-300 p-2">AGE</th>
                      <th className="border border-slate-300 p-2">GENDER</th>
                      <th className="border border-slate-300 p-2">
                        INJURY/CONDITION
                      </th>
                      <th className="border border-slate-300 p-2">ACTION TAKEN</th>
                      <th className="border border-slate-300 p-2">RESPONDERS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(report.patientInformation) &&
                      report.patientInformation.map((p, index) => (
                        <tr key={index}>
                          <td className="border border-slate-300 px-3">
                            <span className="font-normal">
                              {p.nameOfPatient}
                            </span>
                          </td>
                          <td className="border border-slate-300 px-3">
                            <span className="font-normal">{p.age}</span>
                          </td>
                          <td className="border border-slate-300 px-3">
                            <span className="font-normal">{p.gender}</span>
                          </td>
                          <td className="border border-slate-300 px-3">
                            <span className="font-normal">{p.condition}</span>
                          </td>
                          <td className="border border-slate-300 px-3">
                            <span className="font-normal">{p.actionTaken}</span>
                          </td>
                          <td className="border border-slate-300 px-3">
                            <span className="font-normal">{p.responders}</span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
            </section>
            <section className="pt-14 mx-32">
              <div>
                <p className="font-bold text-black">Members Responded:</p>
                <div className="ml-4">
                  <p className="font-bold text-black">
                    Driver:
                    <span className="font-normal">
                      {report?.membersResponded?.driver || null}
                    </span>
                  </p>
                  <div className="font-bold text-black">
                    Member/s:
                    <br />
                    {Array.isArray(report?.membersResponded?.members) &&
                      report.membersResponded.members.map((m, index) => (
                        <div key={index} className="pl-3">
                          <span className="font-normal" key={index}>
                            {m.nameOfMembers}
                          </span>
                        </div>
                      ))}
                  </div>
                  <p className="font-bold text-black">
                    Dispatch:
                    <span className="font-normal">
                      {report?.membersResponded?.dispatch || null}
                    </span>
                  </p>
                </div>
              </div>
              <div className="ml-12 py-5 text-sm">
                <p className="text-black py-3 font-bold">Prepared by:</p>
                <p className="font-bold text-black">
                  <span className="font-normal">
                    {report?.membersResponded?.preparedBy || null}
                  </span>
                </p>
              </div>
              <div className="ml-12 text-sm">
                <p className="text-black py-3 font-bold">Verified by:</p>
                <p className="font-bold text-black">JULIUS M. MALANTIC,MDRM</p>
                <p className="text-black">Operations and Warning Officer</p>
              </div>
              <div className="ml-12 py-5 text-sm">
                <p className="text-black py-3 font-bold">Noted by:</p>
                <p className="font-bold text-black">
                  RODRIGO D. DELA ROCA, RSW, MDRM
                </p>
                <p className="text-black">OIC Department Head - CDRRMO</p>
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
