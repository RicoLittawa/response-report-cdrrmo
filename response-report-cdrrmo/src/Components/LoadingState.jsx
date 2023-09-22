import { Spinner } from "@material-tailwind/react";

export default function LoadingState() {
  return (
    <div className="flex items-end gap-8">
      <Spinner className="h-6 w-6" />
    </div>
  );
}
