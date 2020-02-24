const User = require('../model/User');
const Article = require('../model/Article');

// const deleteAllUsers = done => {
//   if (process.env.NODE_ENV === 'test') {
//     User.deleteMany({})
//       .then(() => done())
//       .catch(err => done(err));
//   }
// };

// const deleteAllArticles = done => {
//   if (process.env.NODE_ENV === 'test') {
//     Article.deleteMany({})
//       .then(() => done())
//       .catch(err => done(err));
//   }
// };

// module.exports = {
//   deleteAllUsers,
//   deleteAllArticles
// };

module.exports = done => {
  console.log(`=====================================================`);
  if (process.env.NODE_ENV === 'test') {
    User.deleteMany({})
      .then(() => Article.deleteMany({}))
      .then(() => done())
      .catch(err => done(err));
  }
};
