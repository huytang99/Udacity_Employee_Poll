import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogout } from "../../actions/authedUser";

const Nav = ({ dispatch, authedUserId, avatarURL }) => {
  const logout = () => {
    dispatch(handleLogout());
  };

  return (
    <div className="flex align-middle justify-between min-h-90 w-100 py-4 border-b border-gray-300">
      <div>
        <NavLink
          to="/"
          className={({ isActive }) => {
            return `mx-2 px-5 py-2 font-medium rounded-lg hover:scale-75 hover:bg-slate-400 hover:text-white ${
              isActive ? "scale-75 bg-slate-400 text-white" : ""
            }`;
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/leaderboard"
          className={({ isActive }) => {
            return `mx-2 px-5 py-2 font-medium rounded-lg hover:scale-75 hover:bg-slate-400 hover:text-white ${
              isActive ? "scale-75 bg-slate-400 text-white" : ""
            }`;
          }}
        >
          Leaderboard
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) => {
            return `px-5 py-2 font-medium rounded-lg hover:scale-75 hover:bg-slate-400 hover:text-white ${
              isActive ? "scale-75 bg-slate-400 text-white" : ""
            }`;
          }}
        >
          New
        </NavLink>
      </div>
      <div className="flex align-middle justify-between">
        <div className="flex align-middle justify-around">
          <img
            src={avatarURL}
            className="position-relative img-fluid w-5 h-5 rounded-full translate-y-1"
            alt=""
          ></img>
          <span className="font-medium pl-2" data-testid="user-information">
            {authedUserId}
          </span>
        </div>
        <button
          onClick={logout}
          className="px-7 font-medium rounded-lg hover:scale-75 hover:bg-slate-400 hover:text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUserId: authedUser.id,
  avatarURL: authedUser.avatarURL,
});

export default connect(mapStateToProps)(Nav);
