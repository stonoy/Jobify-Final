import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    try {
      await customFetch.delete(`/jobs/${id}`);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Deleted!");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect("/dashboard");
  };
