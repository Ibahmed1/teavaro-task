const config = {
  isReady: true,
  localStorageKey: "testKey",
  cookieName: "testName",
  ttl: 30,
  user: "user3",
  loggingLevel: "error",
};

window.testApi = {
  getAllowedUsers: function () {
    return ["user1", "user3", "superuser"];
  },
  getValues: function () {
    return {
      testKey: "testFirstValue",
      testName: "testSecondValue",
    };
  },
  handleAlert: function (input) {
    if (input) {
      console.log("Acquired alert with message: ", input.message);
      console.log("Message source: ", input.user);
    }
  },
};

window.onload = () => {
  if (!configChecks()) return;
};

function configChecks() {
  let browserIsReady;
  if (browserReadyCheck()) browserIsReady = true;
  else return false;
  if (browserIsReady && userAccessCheck()) return true;
  else return false;
}

function browserReadyCheck() {
  if (config.isReady) return true;
  else {
    console.log({ error: "config is not ready" });
    return false;
  }
}

function userAccessCheck() {
  if (window.testApi.getAllowedUsers().includes(config.user)) return true;
  else {
    console.log({ error: "user is not allowed" });
    return false;
  }
}
