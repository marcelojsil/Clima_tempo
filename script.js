document.querySelector('.busca').addEventListener('submit', async (event) => { //quando enviar o formulário cria um evento
    event.preventDefault(); //previne o comportamento padrão de enviar o formulário, queremos que ele encontre a informação do formulário

    let input = document.querySelector('#searchInput').value //pega o valor do formulário

    if(input !== '') { //input diferente de vazio, existe um valor escrito
        clearInfo();
        showWarning('Carregando...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=7f3981e92d7451d73319a68eedff376c&units=metric&lang=pt_br`

        let results = await fetch(url); //await espera o resultado e guarda na variável results
        let json = await results.json(); // transforma results em json

        if(json.cod === 200) { //localização encontrada
            ShowInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle:json.wind.deg,
            });

        } else {
            clearInfo();
            showWarning('Não encontramos esta localização!');
        }
    }

});

function ShowInfo (json) {
    showWarning('');

    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';

}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg; //traz mensagens na div AVISO
}