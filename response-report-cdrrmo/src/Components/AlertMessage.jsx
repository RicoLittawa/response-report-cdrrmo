import { Alert, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function AlertMessage({ message, setMessage }) {
  setTimeout(() => {
    if (message) {
      setMessage(false);
    }
  }, 2000);
  return (
    <div className="flex justify-center">
      <Alert open={message} className="max-w-screen-sm  bg-green-500">
        <Typography variant="h5" color="white">
          <FontAwesomeIcon icon={faCheck} /> Success
        </Typography>
        <Typography color="white" className=" font-normal">
          A report has been save.
        </Typography>
      </Alert>
    </div>
  );
}
