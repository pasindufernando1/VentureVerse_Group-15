package com.ventureverse.server.controller;

import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.ComplainDTO;
import com.ventureverse.server.model.entity.EntrepreneurDTO;
import com.ventureverse.server.model.entity.InvestorInterestedListingDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.service.EntrepreneurService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/entrepreneurs")
@RequiredArgsConstructor
public class EntrepreneurController {

    private final EntrepreneurService entrepreneurService;

    @GetMapping("/pending")
    public ResponseEntity<List<EntrepreneurDTO>> getPendingUsers() {
        List<EntrepreneurDTO> pendingEntrepreneurs = entrepreneurService.findByApprovalStatus(Status.PENDING);
        if (pendingEntrepreneurs.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(pendingEntrepreneurs);
    }

    @GetMapping("/pending-details/{id}")
    public ResponseEntity<EntrepreneurDTO> getPendingUserDetails(@PathVariable Integer id) {
        EntrepreneurDTO pendingEntrepreneur = entrepreneurService.findById(id);
        if (pendingEntrepreneur == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(pendingEntrepreneur);
    }

    @PostMapping("/addcomplaint/{id}")
    public ResponseEntity<ResponseDTO> addComplaint(
            @PathVariable Integer id,
            @RequestBody ComplainDTO complainDTO,
            HttpServletResponse response
    ) {
        System.out.println("id = " + id);
        return ResponseEntity.ok(entrepreneurService.addComplain(response, complainDTO));
    }

    @GetMapping("/finalizeListings/{id}")
    public ResponseEntity<InvestorInterestedListingDTO> finalizeListings(@PathVariable Integer id) {
        System.out.println("id = " + id);
        InvestorInterestedListingDTO finalizedListings = entrepreneurService.finalizeListings(id);
        if (finalizedListings == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(finalizedListings);
    }

    @PutMapping("/updatefinalizeListing/{id}")
    public ResponseEntity<ResponseDTO> updateListings(
            @PathVariable("id") Integer id,
            @RequestBody InvestorInterestedListingDTO investorInterestedListingDTO
    ) {
        return ResponseEntity.ok(entrepreneurService.updateListing(id, investorInterestedListingDTO));
    }

    @GetMapping("/offers/{id}")
    public ResponseEntity<List<Map<String, String>>> getOffers(@PathVariable Integer id) {
        List<Map<String, String>> offers = entrepreneurService.getOffers(id);
        if (offers.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(offers);
    }

}

