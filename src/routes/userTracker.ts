// server/userTracker.ts
const loggedInUsers: any = [];

export const addUser = (userId: number) => {
  loggedInUsers.push(userId);
};

export const removeUser = (userId: number) => {
  loggedInUsers.pop(userId);
  // console.log("loggedInUsers", loggedInUsers);
};

export const getLoggedInUsers = () => {
  console.log("loggedInUsers", loggedInUsers);
  return loggedInUsers;
};
