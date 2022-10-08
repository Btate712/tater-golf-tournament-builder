import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ accessRequirement, redirectPath, protectedComponent }) => {
  if (!accessRequirement) {
    return (
      <Navigate to={ redirectPath } />
    )
  }

  return protectedComponent;
}

export default PrivateRoute;