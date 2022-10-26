var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var submitBtn = document.getElementById("submitBtn");
var searchInput = document.getElementById("searchInput");
var sites = [];
var inputs = document.getElementsByClassName("form-control");
var nameAlert = document.getElementById("nameAlert");

var currentIndex = 0;

if (JSON.parse(localStorage.getItem("siteList")) != null) {
  sites = JSON.parse(localStorage.getItem("siteList"));
  displaySite();
}

submitBtn.onclick = function () {
  if (addSite == "Submit") {
    addSite();
  } else {
    updateSite();
  }
  displaySite();
  clearForm();
};

function addSite() {
  var site = {
    nameSite: siteNameInput.value,
    urlSite: siteUrlInput.value,
  };

  sites.push(site);
  localStorage.setItem("siteList", JSON.stringify(sites));
}

function displaySite() {
  var cartona = "";
  for (var i = 0; i < sites.length; i++) {
    cartona += `<tr><td>${sites[i].nameSite}</td>
                <td>${sites[i].urlSite}</td>            
                <td><button onclick='openSite(${i})' class='btn btn-warning'>Visit</button></td>
                <td><button onclick='getSiteInfo(${i})' class='btn btn-warning'>Update</button></td>
                <td><button onclick='deleteSite(${i})' class='btn btn-danger'>Delete</button></td>
                </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

function deleteSite(index) {
  sites.splice(index, 1);
  displaySite();
  localStorage.setItem("siteList", JSON.stringify(sites));
}

function clearForm() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

searchInput.onkeyup = function () {
  console.log(searchInput.value);
  var cartona = "";
  for (var i = 0; i < sites.length; i++) {
    if (
      sites[i].nameSite.toLowerCase().includes(searchInput.value.toLowerCase())
    ) {
      cartona += `<tr><td>${sites[i].nameSite}</td>
                <td>${sites[i].urlSite}</td>
                <td><button onclick='openSite(${i})' class='btn btn-warning'>Visit</button></td>
                <td><button onclick='getSiteInfo(${i})' class='btn btn-warning'>Update</button></td>
                <td><button onclick='deleteSite(${i})' class='btn btn-danger'>Delete</button></td>
                </tr>`;
    }
  }
  document.getElementById("tableBody").innerHTML = cartona;
};

function getSiteInfo(index) {
  currentIndex = index;
  var currentSite = sites[index];
  siteNameInput.value = currentSite.nameSite;
  siteUrlInput.value = currentSite.urlSite;
  submitBtn.innerHTML = "Update";
}

function updateSite() {
  var site = {
    nameSite: siteNameInput.value,
    urlSite: siteUrlInput.value,
  };
  sites[currentIndex] = site;
  localStorage.setItem("siteList", JSON.stringify(sites));
  submitBtn.innerHTML = "Submit";
}

function openSite(index) {
  currentIndex = index;
  var currentSite = sites[index];
  siteUrlInput.value = currentSite.urlSite;
  window.open(siteUrlInput.value, "_blank	");
  clearForm();
}

siteNameInput.onkeyup = function () {
  var nameRegex = /^[A-Z][a-z]{2,9}$/;

  if (nameRegex.test(siteNameInput.value)) {
    submitBtn.removeAttribute("disabled");
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
  } else {
    submitBtn.disabled = true;
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
    nameAlert.classList.remove("d-none");
  }
};

siteUrlInput.onkeyup = function () {
  var urlRegex = /^(https:\/\/www\.)?[A-Za-z0-9]{1,9}\.[a-z]+\/?$/;

  if (urlRegex.test(siteUrlInput.value)) {
    submitBtn.removeAttribute("disabled");
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");
    urlAlert.classList.add("d-none");
  } else {
    submitBtn.disabled = true;
    siteUrlInput.classList.add("is-invalid");
    siteUrlInput.classList.remove("is-valid");
    urlAlert.classList.remove("d-none");
  }
};
