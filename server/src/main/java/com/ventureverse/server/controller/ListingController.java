package com.ventureverse.server.controller;

import com.ventureverse.server.model.entity.ListingDTO;
import com.ventureverse.server.model.normal.ListingRequestDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.service.ListingService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class ListingController {

    private final ListingService listingService;

    @PostMapping("/addListing")
    public ResponseEntity<ResponseDTO> addListing(
            HttpServletResponse response,
            @RequestBody ListingRequestDTO listingRequestDTO
    ) {
        System.out.println("awa");
        return ResponseEntity.ok(listingService.addListing(response, listingRequestDTO));
    }

}
