window.addEventListener("load", () => {
  let long;
  let lat;
  let tempature_c;
  let temperature_f;
  let timezone = document.querySelector(".location-timezone");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let temperatureDiscription = document.querySelector(
    ".temperature-description"
  );

  let temperatureSection = document.querySelector(".temperature-degree");
  let temperaturespan = document.querySelector(".temperature-degree-span");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((postion) => {
      long = postion.coords.longitude;
      lat = postion.coords.latitude;
      const api = `http://api.weatherapi.com/v1/current.json?key=bde86e56053b48e092465414211212&q=${lat},${long}`;
      console.log(api);

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp_f, temp_c } = data.current;
          tempature_c = temp_c;
          temperature_f = temp_f;
          const { region } = data.location;
          const { condition } = data.current;
          //set Dom elements
          timezone.innerHTML = region;
          temperatureDegree.innerHTML = temp_f;
          temperatureDiscription.innerHTML = condition.text;
          document.getElementById("myImg").src = condition.icon;
        });

      ///change Temperature to celsius and

      temperatureSection.addEventListener("click", () => {
        if (temperaturespan.textContent === "F") {
          temperaturespan.textContent = "C";
          temperatureDegree.innerHTML = tempature_c;
        } else {
          temperaturespan.textContent = "F";
          temperatureDegree.innerHTML = temperature_f;
        }
      });
    });
  } else {
    h1.textContent = "hey enable your location";
  }
});
