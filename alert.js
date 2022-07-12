async function displayAlert(message, user) {
  window.testApi.handleAlert({ message: message, user: user });
  const showCatFact = confirm(message + "\n\nWould you like to see a random cat fact?");
  showCatFact ? alert(await fetchCatFact()) : alert("That's a shame");
  return;
}

async function fetchCatFact() {
  const response = await fetch("https://catfact.ninja/fact");
  const data = await response.json();
  return data.fact;
}
