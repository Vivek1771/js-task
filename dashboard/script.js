import LocalStorage from "./LocalStorage.js";

const storage = new LocalStorage();

const tasks = storage.tasks;

const container = document.querySelector(".tasks");
const template = document.querySelector("#task");

const createTaskForm = document.querySelector(".create-task");
const createTaskField = document.querySelector(".create-task__textarea");
const createTaskButton = document.querySelector(".create-task__submit");

tasks.forEach((data) => {
  onCreateTask({ data });
});

createTaskField.addEventListener("input", () => {
  createTaskButton.disabled = !createTaskField.value;
});

createTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = createTaskField.value;

  if (value) {
    const data = {
      value,
      checked: false,
    };

    storage.create(data);

    onCreateTask({ data });

    createTaskForm.reset();
  }
});

function onCreateTask({ data }) {
  const clone = template.content.cloneNode(true);

  const task = clone.querySelector(".task");
  const checkbox = clone.querySelector(".task__checkbox");
  const title = clone.querySelector(".task__text");
  const del = clone.querySelector(".task__delete");

  title.innerHTML = data.value;
  checkbox.checked = data.checked;

  toggleTaskStatusClass({ checked: data.checked, task });

  checkbox.addEventListener("input", () => {
    data.checked = checkbox.checked;

    toggleTaskStatusClass({ checked: data.checked, task });

    storage.update(data);
  });

  title.addEventListener("input", () => {
    data.value = title.innerHTML;

    storage.update(data);
  });

  del.addEventListener("click", (e) => {
    storage.delete(data);

    task.remove();
  });

  container.appendChild(clone);
}

function toggleTaskStatusClass({ checked, task }) {
  task.classList[checked ? "add" : "remove"]("task--done");
}

function getWeather() {
  let temperature = document.getElementById("temperature");
  let description = document.getElementById("description");
  let location = document.getElementById("location");
  let api = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "ea26f26bb107143d02ddb112bac18b9a";
  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let url =
      api +
      "?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey +
      "&units=imperial";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let temp = data.main.temp;
        temperature.innerHTML = temp + "° F";
        location.innerHTML =
          data.name + " (" + latitude + "°, " + longitude + "°)";
        description.innerHTML = data.weather[0].main;
      });
  }

  function error() {
    console.log("error");
  }
}
getWeather();

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
function checkHour(c) {
  if (c > 12) {
    c = c - 12;
  }
  return c;
}

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  // add a zero in front of numbers<10
  m = checkTime(m);
  s = checkTime(s);
  //hour-12 if > 12
  h = checkHour(h);
  document.getElementById("time").innerHTML = h + ":" + m + ":" + s;
  var t = setTimeout(function () {
    startTime();
  }, 500);
}
startTime();

let apiKey = "0UTRbFtkMxAplrohufYco5IY74U8hOes";
function getGif() {
  fetch(
    `https://api.giphy.com/v1/gifs/search?q=funny&api_key=${apiKey}&limit=20`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let i = 0;
      setInterval(() => {
        if (i == 20) {
          i = 0;
        }
        document.getElementById("myImg").src = data.data[i].embed_url;
        i++;
      }, 5000);
    });
}
getGif();
