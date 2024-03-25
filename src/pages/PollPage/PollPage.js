import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { handleAddAnswer } from "../../actions/questions";
import Error404 from "../ErrorPage/Error404";

const PollPage = ({ dispatch, authedUser, users, questions }) => {
  const { id } = useParams();

  const question = questions[id];
  const author = users[question?.author];

  const hasVotedForOptionOne = question?.optionOne.votes.includes(
    authedUser.id
  );
  const hasVotedForOptionTwo = question?.optionTwo.votes.includes(
    authedUser.id
  );
  const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

  const handleOption = (e, option) => {
    e.preventDefault();
    dispatch(handleAddAnswer(question?.id, option));
  };

  const calcPercentage = (option) => {
    const numberVotesTotal =
      question?.optionOne.votes.length + question?.optionTwo.votes.length;
    switch (option) {
      case "optionOne":
        return (
          ((question?.optionOne.votes.length / numberVotesTotal) * 100).toFixed(
            2
          ) + " %"
        );
      case "optionTwo":
        return (
          ((question?.optionTwo.votes.length / numberVotesTotal) * 100).toFixed(
            2
          ) + " %"
        );
      default:
        return "";
    }
  };

  return (
    <div>
      {author ? (
        <div>
          {question ? (
            <div>
              <h1 className="text-3xl font-bold mt-9 mb-5 text-center text-green-500">
                Poll by {author?.name}
              </h1>

              <div className="flex justify-center">
                <img
                  src={author?.avatarURL}
                  alt="Profile"
                  className="w-24 h-24"
                />
              </div>

              <div className="flex justify-center">
                <h2 className="mt-6 text-2xl font-bold">Would You Rather?</h2>
              </div>

              <div className="flex align-middle justify-center">
                <div className="grid grid-cols-2 gap-4 mt-4 w-3/5 text-center">
                  <button
                    onClick={(e) => handleOption(e, "optionOne")}
                    disabled={hasVoted}
                    className={`p-2 rounded-xl bg-slate-400 hover:shadow-xl transition ${
                      hasVotedForOptionOne ? "bg-green-500 text-white" : ""
                    }`}
                  >
                    <div className={hasVotedForOptionOne ? "chosen" : ""}>
                      <p className="mb-2 font-bold">
                        {question?.optionOne.text}
                      </p>
                      {!hasVoted && (
                        <p className="mb-3 underline underline-offset-4">
                          Click to vote
                        </p>
                      )}
                      {hasVoted && (
                        <p className="text-xs">
                          Votes: {question?.optionOne.votes.length} (
                          {calcPercentage("optionOne")})
                        </p>
                      )}
                    </div>
                  </button>

                  <button
                    onClick={(e) => handleOption(e, "optionTwo")}
                    disabled={hasVoted}
                    className={`p-2 rounded-xl bg-slate-400 hover:shadow-xl transition ${
                      hasVotedForOptionTwo ? "bg-green-500 text-white" : ""
                    }`}
                  >
                    <p className="mb-2 font-bold">{question?.optionTwo.text}</p>
                    {!hasVoted && (
                      <p className="mb-3 underline underline-offset-4">
                        Click to vote
                      </p>
                    )}
                    {hasVoted && (
                      <p className="text-xs">
                        Votes: {question?.optionTwo.votes.length} (
                        {calcPercentage("optionTwo")})
                      </p>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Error404 />
          )}
        </div>
      ) : (
        <Error404 />
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions,
  users,
});

export default connect(mapStateToProps)(PollPage);
