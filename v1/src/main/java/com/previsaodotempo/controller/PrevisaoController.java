package com.previsaodotempo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.previsaodotempo.PrevisaoResponse;
import com.previsaodotempo.service.PrevisaoService;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class PrevisaoController {
    
    @Autowired
    private PrevisaoService previsaoService;

    @GetMapping("/previsao")
    public PrevisaoResponse getPrevisao(@RequestParam int cityId) {
        return previsaoService.getTempo(cityId);
    }
}

