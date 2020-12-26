import refs from "./refs.js";

let apiKey = "8ea5746e3c60ba6af3c2bd383439274b";
function getFetch(cityName) {
    const { input, weather, city, temp, flex, humidity, wind } = refs;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    flex.innerHTML = "";
    input.value = "";
    let result = fetch(url).then((response) => {
        if(!response.ok) return alert("Введите коректный город");
        return response.json();
    })
        .then((data) => {
            console.log(data);
            weather.classList.remove('loading');
            city.textContent = `Weather in ${data.name}`;
            let celcium = Math.round(data.main.temp - 273.15);
            temp.textContent = `${celcium}°C`;
            const iconData = data.weather.map(el => {
                const img = document.createElement('img');

                img.src = `https://openweathermap.org/img/wn/${el.icon}.png`;
                img.alt = el.description;
                img.classList.add('icon');
                const div = document.createElement("div");
                div.classList.add("description");
                div.textContent = el.description;
                console.dir(div);
                div.append(img);
                return div;
            });
            
            flex.prepend(...iconData);
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            wind.textContent = `Wind speed: ${data.wind.speed} km/h`;
        }).catch((error) => {
            console.error(`Что-то пошло не так`, error);
        });
    return result;
}
const { input, inputBtn } = refs;

inputBtn.addEventListener('click', () => {
    if (!input.value) return;
    getFetch(input.value);
});

input.addEventListener('keyup', (evt) => {
    if (!input.value) return;
    if (evt.key === "Enter") {
        getFetch(input.value);
    }
});
