import React from "react";
import { FormRow, FormSelect } from "../components";
import {
  Form,
  redirect,
  useNavigate,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../utils/job_info";
import customFetch from "../utils/customFetch";
import styled from "styled-components";
import { toast } from "react-toastify";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    // console.log(data);

    try {
      await customFetch.post("/jobs", data);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Job added!");
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const AddJob = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper className="page">
      <h3>Add Job Here</h3>
      <Form method="post" className="Form-main">
        <FormRow
          name="company"
          type="text"
          labelText="Company"
          required={true}
        />
        <FormRow
          name="position"
          type="text"
          labelText="Position"
          required={true}
        />
        <FormRow
          name="jobLocation"
          type="text"
          labelText="Job Location"
          defaultValue={user.location}
          required={true}
        />
        <FormSelect
          name="status"
          labelText="Status"
          list={Object.values(JOB_STATUS)}
        />
        <FormSelect
          name="jobType"
          labelText="Job Type"
          list={Object.values(JOB_TYPE)}
        />
        <button type="submit" className="btn-main">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </Form>
      <button type="button" onClick={() => navigate(0)} className="btn-reset">
        Reset
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h3 {
    width: fit-content;
    margin: 1em auto;
  }
`;

export default AddJob;
