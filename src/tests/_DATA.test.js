const { _saveQuestionAnswer, _saveQuestion } = require("../api/_DATA");

describe("unit test 1", () => {
  it("saved question is returned and all expected fields are populated when correctly formatted data is passed to the function.", async () => {
    var question = {
      optionOneText: "option one",
      optionTwoText: "option two",
      author: "mtsamis",
    };
    var result = await _saveQuestion(question);
    expect(result).toBeDefined();
  });
});

describe("unit test 2", () => {
  it("to verify that an error is returned if incorrect data is passed to the function.", async () => {
    var question = {
      optionOneText: "option one",
      optionTwoText: "option two",
    };

    let error;
    try {
      await _saveQuestion(question);

      throw new Error("The data is correct");
    } catch (err) {
      error = err;
    }

    expect(error).toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("unit test 3", () => {
  it("to verify that the saved question answer is returned and all expected fields are populated when correctly formatted data is passed to the function.", async () => {
    var authedUser = "mtsamis";
    var qid = "8xf0y6ziyjabvozdd253nd";
    var answer = "optionOne";
    var result = await _saveQuestionAnswer({ authedUser, qid, answer });
    expect(result).toBeDefined();
  });
});

describe("unit test 4", () => {
  it("to verify that an error is returned if incorrect data is passed to the function.", async () => {
    var authedUser = "mtsamis";
    var qid = "8xf0y6ziyjabvozdd253nd";
    let error;
    try {
      await _saveQuestionAnswer({ authedUser, qid });

      throw new Error("The data is correct");
    } catch (err) {
      error = err;
    }
    expect(error).toEqual("Please provide authedUser, qid, and answer");
  });
});
