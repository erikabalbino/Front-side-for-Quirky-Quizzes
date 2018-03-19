import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute(props) {
  const {
    component: Component,
    isAuthenticated = false,
    user = null,
    ...restProps
  } = props;
  // console.log(user);
  return (
    <Route
      {...restProps}
      render={props =>
        isAuthenticated ? (
          <Component user={user} {...props} />
        ) : (
          <Redirect to="/sign_in" />
        )
      }
    />
  );
}

export default AuthRoute;
