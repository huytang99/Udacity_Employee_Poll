import { connect } from "react-redux";

const Leaderboard = ({ users, questions }) => {
  function getNumberOfQuestionsByAuthor(userId) {
    let count = 0;
    for (let questionId in questions) {
      if (questions[questionId].author === userId) {
        count++;
      }
    }
    return count;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mt-9 ml-5 mb-11 text-green-700">
        Leaderboard
      </h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-green-500">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-green-500">
                Answered Questions
              </th>
              <th scope="col" className="px-6 py-3 text-green-500">
                Created Questions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="flex align-middle">
                    <img
                      className="w-12 h-12"
                      src={user?.avatarURL}
                      alt="Author"
                    />
                    <span className="font-bold ml-5 translate-y-3">
                      {user.name}
                    </span>
                  </div>
                </th>
                <td className="px-6 py-4">
                  {Object.keys(user.answers).length}
                </td>
                <td className="px-6 py-4">
                  {getNumberOfQuestionsByAuthor(user.id)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users, questions }) => ({
  users: Object.values(users).sort(
    (a, b) =>
      Object.keys(b.answers).length +
      Object.keys(b.questions).length -
      (Object.keys(a.answers).length + Object.keys(a.questions).length)
  ),
  questions,
});

export default connect(mapStateToProps)(Leaderboard);
