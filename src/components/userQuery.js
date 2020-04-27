import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Redirect } from "react-router-dom";
import SendEmail from "./userEmail";

export const USER_QUERY = gql`
  query user {
    user {
      _id
      name
      email
      sub
      active
      billing
      verified
      token
    }
  }
`;

export default function UserQuery(props) {
  const { loading, error, data, refetch } = useQuery(USER_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) {
    if (!localStorage.getItem("token")) {
      return <Redirect to="/login" />;
    } else {
      return <p>Error :(</p>;
    }
  }

  if (data.user && data.user.verified) {
    return props.children;
  }
  return <SendEmail email={data.user.email} refetch={refetch} />;
}
