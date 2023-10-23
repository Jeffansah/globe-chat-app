import { generatePortalLink } from "@/actions/generatePortalLink";
import CircularProgress from "@mui/joy/CircularProgress/CircularProgress";

const ManageAccountBtn = ({
  loading,
  classes,
}: {
  loading?: boolean;
  classes?: string;
}) => {
  return (
    <form action={generatePortalLink}>
      <button
        type="submit"
        className={`${
          classes &&
          "mt-8 rounded-md w-full bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible::outline-indigo-600 cursor-pointer disabled:opacity-80"
        }`}
      >
        {loading ? (
          <CircularProgress variant="soft" size="sm" className="w-4 h-4" />
        ) : (
          "Manage Billing"
        )}
      </button>
    </form>
  );
};

export default ManageAccountBtn;
