import React from "react";
import { Form, useNavigation, useOutletContext } from "react-router-dom";
import { FormRow } from "../components";
import customFetch from "../utils/customFetch";
import styled from "styled-components";
import { toast } from "react-toastify";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const image = formData.get("avatar");
    if (image && image.size > 500000) {
      toast.error(`image size: ${image.size} - too large`);
      return null;
    }

    try {
      await customFetch.patch("/user/updateuser", formData);
      queryClient.invalidateQueries(["user"]);
      toast.success("Profile Updated!");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }

    return null;
  };

const Profile = () => {
  const {
    user: { name, email, lastName, location },
  } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper className="page">
      <h3>Profile Section</h3>
      <Form method="post" encType="multipart/form-data" className="Form-main">
        <div className="input-img">
          <label htmlFor="avatar" className="form-label">
            File Size Less than 0.5mb
          </label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            className="form-input"
          />
        </div>
        <FormRow type="text" name="name" labelText="Name" defaultValue={name} />
        <FormRow
          type="email"
          name="email"
          labelText="Email"
          defaultValue={email}
        />

        <FormRow
          type="text"
          name="lastName"
          labelText="Last Name"
          defaultValue={lastName}
        />
        <FormRow
          type="text"
          name="location"
          labelText="Location"
          defaultValue={location}
        />
        <button type="submit" className="btn-main">
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h3 {
    width: fit-content;
    margin: 1em auto;
  }
  .input-img {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: start;
    width: 100%;
  }
`;

export default Profile;
