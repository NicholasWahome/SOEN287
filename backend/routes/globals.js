// globals.js

// Declare global variables initialized to null
let globalUsername = null;
let globalPassword = null;

module.exports = {
  getGlobalData: () => ({ username: globalUsername, password: globalPassword }),
  setGlobalData: (username, password) => {
    globalUsername = username || null;
    globalPassword = password || null;
  },
  modifyGlobalUsername: (newUsername) => {
    globalUsername = newUsername || null;
  },
  modifyGlobalPassword: (newPassword) => {
    globalPassword = newPassword || null;
  },
};