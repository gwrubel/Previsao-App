$(document).ready(function () {
    // Configurar o autocompletar com GeoNames
    $("#cidade").autocomplete({
        source: function (request, response) {
            const username = 'gabrielwrubel';
            const url = `http://api.geonames.org/searchJSON?q=${request.term}&maxRows=10&username=${username}`;

            // Requisição AJAX para GeoNames
            $.getJSON(url, function (data) {
                const results = $.map(data.geonames, function (city) {
                    return {
                        label: `${city.name}, ${city.countryName}`,
                        value: city.name,
                        id: city.geonameId
                    };
                });
                response(results);
            });
        },
        select: function (event, ui) {
            // Quando uma cidade é selecionada, armazenar o ID da cidade
            $('#cidade').data('cityId', ui.item.id);
        }
    });

    // Função para obter geolocalização e sugerir cidades próximas
    function getGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const username = 'gabrielwrubel';
                const url = `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lng}&username=${username}`;

                // Requisição AJAX para GeoNames usando geolocalização
                $.getJSON(url, function (data) {
                    const nearbyCities = data.geonames.map(city => {
                        return {
                            label: `${city.name}, ${city.countryName}`,
                            value: city.name,
                            id: city.geonameId
                        };
                    });
                    // Atualizar sugestões de cidade com base na geolocalização
                    updateCitySuggestions(nearbyCities);
                });
            });
        } else {
            alert("Geolocalização não é suportada pelo seu navegador.");
        }
    }

    // Função para atualizar a UI com sugestões de cidades próximas
    function updateCitySuggestions(cities) {
        const suggestionsDiv = $('#sugestao');
        cities.forEach(city => {
            const button = $('<button>').text(city.label).val(city.id);
            button.on('click', function () {
                $('#cidade').val(city.value);
                $('#cidade').data('cityId', city.id);

            });
            suggestionsDiv.append(button);
        });
    }

    // Chamar a função de geolocalização ao carregar a página
    getGeolocation();
});


// Função assíncrona para buscar previsão do tempo usando o ID da cidade
async function getTempo() {
    const cityId = $('#cidade').data('cityId');
    console.log(cityId)
    if (!cityId) {
        alert('Por favor, selecione uma cidade da lista.');
        return;
    }

    try {
        const response = await fetch(`/previsao?cityId=${encodeURIComponent(cityId)}`);

        if (response.ok) {
            const data = await response.json();

            document.getElementById('resultado').classList.remove('hide')
            document.getElementById('cidade-res').innerText = data.name;
            document.getElementById('temperatura').innerText = parseInt(data.main.temp)
            document.getElementById('condicao').innerText = data.weather[0].description;
            document.getElementById('tempo-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
            document.getElementById('pais').src = `https://flagsapi.com/${data.sys.country}/flat/64.png`
            document.getElementById('res-umidade').innerText = data.main.humidity + '%';
            document.getElementById('res-vento').innerText = data.wind.speed + ' (km/h)';

            // Buscar imagem relacionada à cidade usando Unsplash API
            const accessKey = 'B3jh1RsxmBymzcx40gSGczQBJnebg_mXqP6UOKeeTIk';
            const cidade = data.name;
            fetch(`https://api.unsplash.com/search/photos?query=${cidade}&client_id=${accessKey}`)
                .then(response => response.json())
                .then(data => {
                    if (data.results.length > 0) {
                        const photoUrl = data.results[0].urls.full;
                        document.body.style.backgroundImage = `url(${photoUrl})`;
                        document.body.style.backgroundSize = 'cover';
                        document.body.style.backgroundPosition = 'center';
                        document.body.style.backgroundRepeat = 'no-repeat';
                    }
                });
        } else {
            const errorText = await response.text();
            console.error('Error fetching weather data:', errorText);
            document.getElementById('temperatura').innerText = 'Error fetching weather data';
            document.getElementById('condicao').innerText = '';
        }
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('temperatura').innerText = 'Ops, algo deu errado';
    }
}

//função buscar previsão da cidade de sugestão
async function getSugestao(event) {
    var cidade = event.target.value;
    try {
        const response = await fetch(`/previsao?cityId=${encodeURIComponent(cidade)}`);
        console.log(cidade)

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            document.getElementById('resultado').classList.remove('hide')
            document.getElementById('cidade-res').innerText = data.name;
            document.getElementById('temperatura').innerText = parseInt(data.main.temp)
            document.getElementById('condicao').innerText = data.weather[0].description;
            document.getElementById('tempo-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
            document.getElementById('pais').src = `https://flagsapi.com/${data.sys.country}/flat/64.png`
            document.getElementById('res-umidade').innerText = data.main.humidity + '%';
            document.getElementById('res-vento').innerText = data.wind.speed + ' (km/h)';

            const accessKey = 'B3jh1RsxmBymzcx40gSGczQBJnebg_mXqP6UOKeeTIk';
            const cidade = data.name;

            fetch(`https://api.unsplash.com/search/photos?query=${cidade}&client_id=${accessKey}`)
                .then(response => response.json())
                .then(data => {
                    if (data.results.length > 0) {
                        const photoUrl = data.results[0].urls.full;
                        document.body.style.backgroundImage = `url(${photoUrl})`;
                        document.body.style.backgroundSize = 'cover';
                        document.body.style.backgroundPosition = 'center';
                        document.body.style.backgroundRepeat = 'no-repeat';
                    }
                });
        } else {
            const errorText = await response.text();
            console.error('Error fetching weather data:', errorText);
            document.getElementById('temperatura').innerText = 'Error fetching weather data';
            document.getElementById('condicao').innerText = '';
        }
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('temperatura').innerText = 'Ops, algo deu errado';
    }
}

// Event listener para buscar previsão ao clicar em um botão de sugestão
$(document).on('click', '#sugestao button', function (event) {
    getSugestao(event);
});
