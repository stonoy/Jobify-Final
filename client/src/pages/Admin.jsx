import React from "react";
import customFetch from "../utils/customFetch";
import { redirect, useLoaderData } from "react-router-dom";
import StatsHelper from "../utils/StatsHelper";
import { StatItem } from "../components";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/user/admin-special");
    return data;
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const data = useLoaderData();
  return <div>{StatsHelper(data, StatItem)}</div>;
};

export default Admin;
