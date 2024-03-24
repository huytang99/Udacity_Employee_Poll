export const SET_INITIAL_USERS = "SET_INITIAL_USERS";
export const ADD_ANSWER_USER = "ADD_ANSWER_USER";
export const ADD_QUESTION_USER = "ADD_QUESTION_USER";

export function setInitialUsers(users) {
  return {
    type: SET_INITIAL_USERS,
    users,
  };
}

export function addAnswerForUser(authedUser, qid, answer) {
  return {
    type: ADD_ANSWER_USER,
    authedUser,
    qid,
    answer,
  };
}

export function addQuestionForUser({ author, id }) {
  return {
    type: ADD_QUESTION_USER,
    author,
    qid: id,
  };
}
