import React from "react";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { FormRow } from "../components";
import customFetch from "../utils/customFetch";
import styled from "styled-components";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  let error = "";
  if (data.password.length < 6) {
    error = "Password should be 6 character long";
    return error;
  }
  try {
    await customFetch.post("/user/register", data);
    toast.success("Registration Successful");
    return redirect("/login");
  } catch (error) {
    // console.log(error?.response?.data?.msg);
    error = error?.response?.data?.msg;
    return error;
  }
};

const Register = () => {
  const actionResponse = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <section>
        <Form method="post" className="Form">
          <h2>Register</h2>
          <FormRow type="text" name="name" labelText="Name" required={true} />
          <FormRow
            type="email"
            name="email"
            labelText="Email"
            required={true}
          />
          <FormRow
            type="password"
            name="password"
            labelText="Password"
            required={true}
          />
          <button type="submit" className="btn">
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <p>
            Already a member <Link to="/login">Login</Link>
          </p>
        </Form>
        {actionResponse && <h4>{actionResponse}</h4>}
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: grid;
  min-height: 100vh;
  place-content: center;
  h2 {
    font-size: var(--big-font);
    color: var(--big-color);
  }
  h4 {
    color: #860606;
    margin: 0.5em 0;
  }
  p {
    margin: 0.5em 0;
  }
  section {
    width: var(--box1-width);
    height: fit-content;
    border: 2px solid #415a77;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* margin-left: 0.5em; */
    box-shadow: var(--shadow-2);
  }
  section:hover {
    box-shadow: var(--shadow-4);
  }
  .Form {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: start;
  }
`;

export default Register;
