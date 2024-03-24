import { connect } from "react-redux";
import { useState } from "react";
import Question from "../../components/Question";

const Dashboard = ({ authedUser, questions, users }) => {
  const [showNewQuestions, setShowNewQuestions] = useState(true);
  const unansweredQuestions = (question) =>
    !question.optionOne.votes?.includes(authedUser.id) &&
    !question.optionTwo.votes?.includes(authedUser.id);

  const answeredQuestions = (question) =>
    question.optionOne.votes?.includes(authedUser.id) ||
    question.optionTwo.votes?.includes(authedUser.id);

  const QuestionList = ({ questions }) => {
    return (
      <div className="w-4/5">
        <h2 className="mt-16 mb-6 text-2xl font-bold text-center text-green-700">
          {showNewQuestions ? "New Questions" : "Answered Questions"}
        </h2>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {questions
            .filter((question) =>
              showNewQuestions
                ? unansweredQuestions(question)
                : answeredQuestions(question)
            )
            .map((question) => (
              <li key={question.id}>
                <Question question={question} author={users[question.author]} />
              </li>
            ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1
        className="text-3xl font-bold mt-9 text-center mb-8 text-green-700"
        data-testid="heading"
      >
        Categories
      </h1>
      <ul className="flex w-full ml-auto justify-evenly">
        <li>
          <button
            onClick={() => setShowNewQuestions(true)}
            className={`${
              showNewQuestions
                ? "bg-green-500"
                : "bg-green-300 hover:bg-green-400"
            } px-3 py-2 font-medium rounded-lg w-64 text-white`}
          >
            New Questions
          </button>
        </li>
        <li>
          <button
            onClick={() => setShowNewQuestions(false)}
            className={`${
              showNewQuestions
                ? "bg-green-300 hover:bg-green-400"
                : "bg-green-500 "
            } px-3 py-2 font-medium rounded-lg w-64 text-white`}
          >
            Answered Questions
          </button>
        </li>
      </ul>
      <div className="flex justify-center">
        <QuestionList questions={questions} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
  users,
});

export default connect(mapStateToProps)(Dashboard);
