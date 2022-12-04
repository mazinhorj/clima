//signature
console.log("MazinhoBigDaddy chegou!");

//S

const apiKey = "7ff00a5820872140a5b8c2bf21b6129f";
const apiCountryURL = "https://countryflagsapi.com/png/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#inp_cidade");
const searchBtn = document.querySelector("#buscar");
const cityElement = document.querySelector("#cidade");
const msgErro = document.querySelector("#msg_erro")
const divDataElement = document.querySelector("#dados_clima");
const countryElement = document.querySelector("#dados_clima h2 img");
const tempElement = document.querySelector("#temperatura span");
const descElement = document.querySelector("#descricao");
const weatherIconElement = document.querySelector("#ico_clima");
const humidityElement = document.querySelector("#umidade span");
const windElement = document.querySelector("#vento span");
const dirWindElement = document.querySelector("#dir_vento span");
const carregador = document.querySelector("#carregando");
const sugest = document.querySelector("#sugest");
const sugestBtn = document.querySelectorAll("#sugest button");
const extraBtn = document.querySelector("#extra_acordeon i");
const extraCont = document.querySelector("#extras_cont");
const latitude = document.querySelector("#latitude span");
const longitude = document.querySelector("#longitude span");
const pressao = document.querySelector("#pressao span");
const sensacao = document.querySelector("#sensacao span");
const minima = document.querySelector("#minima span");
const maxima = document.querySelector("#maxima span");

//fim S


//F
const eCarregador = () => {
  carregador.classList.toggle("esconde");
}

const getWeatherData = async (city) => {
  eCarregador();
  const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
  const res = await fetch(apiWeatherUrl);
  const data = await res.json();
  console.log(data);
  eCarregador();
  return data;
};

const showErrorMsg = () => {
  msgErro.classList.remove("esconde");
};

const escondeInfo = () => {
  msgErro.classList.add("esconde");
  divDataElement.classList.add("esconde");
  extraCont.classList.add("esconde");
  extraBtn.classList.remove("spin");
};

const showWeatherData = async (city) => {
  escondeInfo();
  const data = await getWeatherData(city);
  console.log(data.name)
  if (data.cod === "404") {
    showErrorMsg();
    return;
  };
  sugest.classList.add("esconde");
  const bg = () => {
    const tbg = document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;
    console.log(tbg);
    return tbg;
  };
  bg();

  cityElement.innerText = data.name;
  countryElement.setAttribute("src", apiCountryURL + data.sys.country);
  tempElement.innerText = `${parseFloat(data.main.temp).toFixed(1)}ºC`;
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${parseFloat(data.wind.speed).toFixed(1)}km/h`;
  dirWindElement.innerText = `${data.wind.deg}º`;
  latitude.innerText = data.coord.lat;
  longitude.innerText = data.coord.lon;
  pressao.innerText = `${data.main.pressure} mbar`;
  sensacao.innerText = `${parseFloat(data.main.feels_like).toFixed(1)}ºC`;
  minima.innerText = `${parseFloat(data.main.temp_min).toFixed(1)}ºC`;
  maxima.innerText = `${parseFloat(data.main.temp_max).toFixed(1)}ºC`;
  divDataElement.classList.remove("esconde");
  msgErro.classList.add("esconde");
  cityInput.value = "";
};


//fim F


//E
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value;
  if (city === "") {
    return;
  }
  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;
    if (city === "") {
      return;
    };
    showWeatherData(city);
  }
});

sugestBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const city = btn.innerHTML;
    showWeatherData(city);
  })
});

extraBtn.addEventListener("click", (e) => {
  extraBtn.classList.toggle("spin");
  extraCont.classList.toggle("esconde");
})

//fim E