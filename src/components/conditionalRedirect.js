import { Navigate } from 'react-router-dom';

const ConditionalRedirect = ({ to, condition }) => {
  if (condition ) {
    return (
      <Navigate to={to} />
    );
  } else {
    return (<></>); 
  }
} 

export default ConditionalRedirect;