# Previsão do Tempo App

Este projeto é uma aplicação web simples para consultar a previsão do tempo de diferentes cidades. Ele utiliza Spring Boot no backend para integrar com a API do OpenWeatherMap e oferece uma interface amigável para os usuários.

## Funcionalidades

- **Busca por Cidade**: Permite ao usuário buscar a previsão do tempo inserindo o nome da cidade.
- **Sugestões de Cidade**: Fornece sugestões de cidades  e com base na geolocalização do usuário fornece a cidade mais proxíma.
- **Detalhes da Previsão**: Mostra detalhes como temperatura atual, condição climática, umidade, velocidade do vento, e bandeira do país.

## Tecnologias Utilizadas

- **Spring Boot**: Framework Java para criação de APIs RESTful.
- **OpenWeatherMap API**: Utilizada para obter os dados meteorológicos.
- **jQuery UI**: Biblioteca JavaScript para a funcionalidade de autocomplete na busca de cidades.
- **Geolocalização**: Utilizada para sugerir automaticamente cidades próximas com base na posição geográfica do usuário.

## Como Executar

Para executar este projeto localmente, você precisará ter o Java e o Maven instalados. Siga os passos abaixo:

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/previsao-do-tempo-app.git
   cd previsao-do-tempo-app
   ```

2. Configure sua chave da API do OpenWeatherMap:
   - Edite o arquivo `PrevisaoService.java` e substitua `apiKey` com sua chave de API.

3. Execute o projeto com Maven:
   ```bash
   mvn spring-boot:run
   ```

4. Abra seu navegador e acesse:
   ```text
   http://localhost:8080
   ```

## Autor

- Gabriel Wrubel(@gwrubel)

