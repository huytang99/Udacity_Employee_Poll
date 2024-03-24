import { saveQuestion, saveQuestionAnswer } from "../api/api";
import { addAnswerForUser, addQuestionForUser } from "./users";

export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER_QUESTION = "ADD_ANSWER_QUESTION";
export const SET_INITIAL_QUESTIONS = "RECEIVE_QUESTIONS";

export function setInitialQuestions(questions) {
  return {
    type: SET_INITIAL_QUESTIONS,
    questions,
  };
}

function addNewQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

function addAnswerForQuestion(author, qid, answer) {
  return {
    type: ADD_ANSWER_QUESTION,
    author,
    qid,
    answer,
  };
}

export const handleAddQuestion = (question) => async (dispatch) => {
  try {
    const response = await saveQuestion(
      question.optionOneText,
      question.optionTwoText,
      question.author
    );
    console.log(response);
    dispatch(addNewQuestion(response));
    dispatch(addQuestionForUser(response));
  } catch (error) {
    console.error(error);
  }
};

export const handleAddAnswer =
  (questionId, answer) => async (dispatch, getState) => {
    try {
      const { authedUser } = getState();
      await saveQuestionAnswer(authedUser.id, questionId, answer);
      dispatch(addAnswerForQuestion(authedUser.id, questionId, answer));
      dispatch(addAnswerForUser(authedUser.id, questionId, answer));
    } catch (error) {
      console.error(error);
    }
  };
