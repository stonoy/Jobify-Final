import React, { createContext, useContext, useState } from "react";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { SmallSideBar, BigSideBar, Navbar } from "../components";
import styled from "styled-components";
import customFetch from "../utils/customFetch";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const DashBoardContext = createContext();

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch.get("/user/getcurrentuser");
    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    const data = await queryClient.ensureQueryData(userQuery);
    return null;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/");
  }
};

const DashBoard = ({ queryClient }) => {
  const { data } = useQuery(userQuery);
  const [showSideBar, setShowSideBar] = useState(true);
  const { userWithoutPassword: user } = data;
  const navigate = useNavigate();

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const logout = async () => {
    try {
      navigate("/");
      await customFetch.get("/user/logout");
      queryClient.invalidateQueries();
      toast.success("Logged out!");
    } catch (error) {
      console.log("problem while logging out...");
      navigate("/");
    }
  };

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  // console.log(data);
  // console.log(user);
  // return <h4>dashboard</h4>;
  return (
    <DashBoardContext.Provider
      value={{ showSideBar, toggleSideBar, user, logout }}
    >
      <Wrapper>
        <section className="sidebar">
          <BigSideBar />
          <SmallSideBar />
        </section>
        <section className="main">
          <Navbar />
          <div className="content">
            {isLoading ? <h2>Loading...</h2> : <Outlet context={{ user }} />}
          </div>
        </section>
      </Wrapper>
    </DashBoardContext.Provider>
  );
};

export const dashBoardValues = () => useContext(DashBoardContext);

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 0.5rem;
  min-height: 100vh;

  .sidebar {
    border-right: 2px solid #333;
  }
  .main {
    width: 100%;
  }
`;

export default DashBoard;
