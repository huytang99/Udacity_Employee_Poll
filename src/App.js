import React, { useEffect } from "react";
import Nav from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import NewPoll from "./pages/NewPoll/NewPoll";
import PollPage from "./pages/PollPage/PollPage";
import { connect } from "react-redux";
import Login from "./pages/Login/Login";
import { fetchAndPopulateInitialData } from "./actions/initalData";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Error404 from "./pages/ErrorPage/Error404";
import PrivateRoute from "./components/PrivateRoute";

function App({ dispatch, loggedIn }) {
  useEffect(() => {
    dispatch(fetchAndPopulateInitialData());
  }, [dispatch]);

  return (
    <div className="w-100">
      {loggedIn && <Nav />}
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route element={<PrivateRoute loggedIn={loggedIn}> </PrivateRoute>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leaderboard" exact element={<Leaderboard />} />
          <Route path="/questions/:id" element={<PollPage />} />
          <Route path="/add" exact element={<NewPoll />} />
          <Route path="*" exact element={<Error404 />} />
        </Route>
      </Routes>
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(App);
