package com.previsaodotempo.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import com.previsaodotempo.PrevisaoResponse;
import org.apache.log4j.Logger;


@Service
public class PrevisaoService {
    public static final Logger log = Logger.getLogger(PrevisaoService.class);
    private final String apiKey = "43faa7b3d404d75d3cce6cd1e14ccd14";
    private final String apiUrl = "https://api.openweathermap.org/data/2.5/weather";

    public PrevisaoResponse getTempo(int cityId) {
        RestTemplate restTemplate = new RestTemplate();

        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
            .queryParam("id", cityId)
            .queryParam("appid", apiKey)
            .queryParam("units", "metric")
            .queryParam("lang", "pt_br")
            .toUriString();
        
        log.info("Request URL: " + url);

        return restTemplate.getForObject(url, PrevisaoResponse.class);
    }
}

