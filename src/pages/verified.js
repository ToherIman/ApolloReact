import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router';

export const CONFIRM_EMAIL = gql`
 query confirmEmail ($token: String) {
  confirmEmail(token: $token)
}`

function Verified() {

  let history = useHistory();

  const token = history.location.search.substr(1)

  const { loading, error, data } = useQuery(CONFIRM_EMAIL, {variables: { token }});


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if(data) {
  window.close();
  return (
    <div style={{textAlign: "center"}}>
      Email Verified
    </div>
  )
  }
  else {
    return (
      <div style={{textAlign: "center"}}>
        Try againg
      </div>
    )
  }
}

export default Verified;