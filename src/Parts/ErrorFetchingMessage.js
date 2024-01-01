import React from 'react';

const ErrorFetchingMessage = ({ status, errorMessage }) => {
  let message;
  let color;

  switch (status) {
    case 'success':
      message = 'Success! Data fetched successfully.';
      color = 'green';
      break;
    case 'error':
      message = `Error! ${errorMessage || 'Unable to fetch data.'}`;
      color = 'red';
      break;
    case 'warning':
      message = 'Warning! Some issues with the fetching.';
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

export default ErrorFetchingMessage;
