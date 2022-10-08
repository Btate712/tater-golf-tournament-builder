export const login = (user, username, password) => {
  // ToDo: Call API endpoint to log in
  // ToDo: Set user logged in state
  if (username === 'admin' && password === 'admin') {
    user.loggedIn = true;
    user.admin = true;
    console.log("Successfully logged in!");
  }
  else if (username === 'temp' && password === 'temp') {
    user.loggedIn = true;
    console.log("Successfully logged in!");
  }
  else {
    user.loggedIn = false;
    console.log("Failed to log in user.");
  }
}

export const isLoggedIn = user => {
  return user.loggedIn;
}

export const isAdmin = user => {
  return user.loggedIn && user.admin;
}