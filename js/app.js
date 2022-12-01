const container = document.querySelector(".container");
const coffees = [
  {
    name: "",
    image: "images/logo.png"
  }
];

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  $('.install-app-btn-container').show();
  deferredPrompt = e;
});
const installApp = document.getElementById('install-id');

const showCoffees = () => {
  let output = "";
  coffees.forEach(
    ({ name, image }) =>
      (output += `
              <div class="card">
                <img class="card--avatar" src=${image} />
                <h1 class="card--title">${name}</h1>
              </div>
              `)
  );
  container.innerHTML = output;
};

installApp.addEventListener('click', async () => {
    if (deferredPrompt !== null) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            deferredPrompt = null;
        }
    }
});

document.addEventListener("DOMContentLoaded", showCoffees);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}
