import { setInitialUsers } from "./users";
import { setInitialQuestions } from "./questions";
import { getInitialData } from "../api/api";

export function fetchAndPopulateInitialData() {
  console.log("here1");
  return async (dispatch) => {
    try {
      const { users, questions } = await getInitialData();
      dispatch(setInitialUsers(users));
      dispatch(setInitialQuestions(questions));
    } catch (error) {
      console.error("Error fetching initial data: ", error);
    }
  };
}
