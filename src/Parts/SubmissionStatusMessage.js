import React from 'react';

const SubmissionStatusMessage = ({ status, errorMessage }) => {
  let message;
  let color;

  switch (status) {
    case 'success':
      message = 'Success! Data submitted successfully.';
      color = 'green';
      break;
    case 'error':
      message = `Error! ${errorMessage || 'Unable to submit data.'}`;
      color = 'red';
      break;
    case 'warning':
      message = 'Warning! Some issues with the submission.';
      color = 'orange';
      break;
    default:
      message = '';
      color = 'black';
  }

  return (
    <div style={{ color }}>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SubmissionStatusMessage;
