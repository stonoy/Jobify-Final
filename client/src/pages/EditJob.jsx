import React from "react";
import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";
import { FormRow, FormSelect } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../utils/job_info";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { toast } from "react-toastify";

const singleJobQuery = (id) => {
  return {
    queryKey: ["editJob", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/jobs/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const id = params?.id;
    try {
      const data = await queryClient.ensureQueryData(singleJobQuery(id));
      // console.log(data);
      return id;
    } catch (error) {
      console.log(error?.response?.data?.msg);
      return redirect("/dashboard");
    }
  };

export const action =
  (queryClient) =>
  async ({ params, request }) => {
    const id = params?.id;
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/jobs/${id}`, data);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Edited Successfully!");
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect("/dashboard");
    }
  };

const EditJob = () => {
  const id = useLoaderData();
  const { data } = useQuery(singleJobQuery(id));

  const {
    job: { company, position, status, jobType, jobLocation },
  } = data;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper className="page">
      <h3>Edit Job Here</h3>
      <Form method="post" className="Form-main">
        <FormRow
          name="company"
          type="text"
          labelText="Company"
          defaultValue={company}
          required={true}
        />
        <FormRow
          name="position"
          type="text"
          labelText="Position"
          defaultValue={position}
          required={true}
        />
        <FormRow
          name="jobLocation"
          type="text"
          labelText="Job Location"
          defaultValue={jobLocation}
          required={true}
        />
        <FormSelect
          name="status"
          labelText="Status"
          defaultValue={status}
          list={Object.values(JOB_STATUS)}
        />
        <FormSelect
          name="jobType"
          labelText="Job Type"
          defaultValue={jobType}
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

export default EditJob;
