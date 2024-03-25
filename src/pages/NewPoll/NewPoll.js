import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleAddQuestion } from "../../actions/questions";
import { connect } from "react-redux";

const NewPoll = ({ dispatch, authedUser }) => {
  const navigate = useNavigate();
  const [firstOption, setFirstOption] = useState("");
  const [secondOption, setSecondOption] = useState("");

  const handleOptionChange = (option, e) => {
    const value = e.target.value;
    if (option === "firstOption") {
      setFirstOption(value);
    } else if (option === "secondOption") {
      setSecondOption(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      handleAddQuestion({
        optionOneText: firstOption,
        optionTwoText: secondOption,
        author: authedUser,
      })
    );
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-1/2">
        <h1 className="text-3xl font-bold mt-9 mb-9 text-green-700">
          New Poll
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mt-3">
            <label
              htmlFor="firstOption"
              data-testid="firstOptionLabel"
              className="block text-sm font-medium text-green-600"
            >
              First Option
            </label>
            <div className="mt-1">
              <input
                value={firstOption}
                placeholder="First Option"
                onChange={(e) => handleOptionChange("firstOption", e)}
                type="text"
                name="firstOption"
                id="firstOption"
                className="block w-full px-3 py-2 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-400 focus: sm:text-sm focus:ring-1 "
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="secondOption"
              data-testid="secondOptionLabel"
              className="block text-sm font-medium text-green-600"
            >
              Second Option
            </label>
            <div className="mt-1">
              <input
                value={secondOption}
                placeholder="Second Option"
                onChange={(e) => handleOptionChange("secondOption", e)}
                type="text"
                name="secondOption"
                id="secondOption"
                className="block w-full px-3 py-2 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-400 focus: sm:text-sm focus:ring-1 "
              />
            </div>
          </div>

          <div className="mt-6 text-right">
            <button
              type="submit"
              data-testid="submit-poll"
              className="bg-green-500 hover:bg-green-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(NewPoll);
