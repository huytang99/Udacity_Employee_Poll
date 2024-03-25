import { Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ loggedIn }) => {
  const redirectUrl = window.location.href
    .toString()
    .split(window.location.host)[1];

  console.log("redirectUrl", redirectUrl);

  if (!loggedIn) {
    return <Navigate replace to={`/login?redirectUrl=${redirectUrl}`} />;
  }
  return <Outlet />;
};

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(PrivateRoute);
