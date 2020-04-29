import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import { Box, Typography } from "@material-ui/core";

export const SEND_EMAIL = gql`
  mutation sendEmail($email: String) {
    sendEmail(email: $email)
  }
`;

function SendEmail({ email, refetch }) {
  const [submitInfo, data] = useMutation(SEND_EMAIL, { variables: { email } });

  const handleBack = () => {
    refetch();
  };

  const handleSend = () => {
    submitInfo();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Box>
        <Typography>
          {data.called
            ? "Please check your mail and click the link, it will be active for 1 hour"
            : "Click to send conforamtion email"}
        </Typography>
      </Box>
      {data.data && data.data.sendEmail ? (
        <Button color="primary" variant="contained" onClick={handleBack}>
          Go back
        </Button>
      ) : (
        <Button color="primary" variant="contained" onClick={handleSend}>
          Send link
        </Button>
      )}
    </div>
  );
}

export default SendEmail;
