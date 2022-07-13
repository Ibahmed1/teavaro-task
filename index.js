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

window.onload = async () => {
  if (!configChecks()) return;

  try {
    await settingLocalStorage();
  } catch (error) {
    console.log({ error: "could not set local storage" });
    return;
  }

  try {
    await settingCookie();
  } catch (error) {
    console.log({ error: "could not set cookie" });
    return;
  }
  displayAlerts("data saved", config.user);
  return;
};

async function settingLocalStorage() {
  const localStorageValue = window.testApi.getValues()[config.localStorageKey];
  window.localStorage.setItem(config.localStorageKey, localStorageValue);

  return;
}

async function settingCookie() {
  const cookieName = config.cookieName;
  const cookieValue = window.testApi.getValues()[cookieName];
  const newCookie = `${cookieName}=${cookieValue}; max-age=${daysToSeconds(config.ttl)}; SameSite=None; Secure`;

  document.cookie = newCookie;
  return;
}

function daysToSeconds(days) {
  return days * 24 * 60 * 60;
}

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
