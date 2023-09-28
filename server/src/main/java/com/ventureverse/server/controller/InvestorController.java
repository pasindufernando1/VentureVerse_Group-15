package com.ventureverse.server.controller;

import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.IndividualInvestorDTO;
import com.ventureverse.server.model.entity.InvestorDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.service.InvestorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/investors")
@RequiredArgsConstructor
public class InvestorController {

    private final InvestorService investorService;

    @GetMapping("/pending")
    public ResponseEntity<List<IndividualInvestorDTO>> getPendingUsers() {
        List<IndividualInvestorDTO> pendingRegisterRequests = investorService.findByApprovalStatus(Status.PENDING);
        if (pendingRegisterRequests.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(pendingRegisterRequests);
    }

    @GetMapping("/pending-details/{id}")
    public ResponseEntity<IndividualInvestorDTO> getPendingUserDetails(@PathVariable Integer id) {
        IndividualInvestorDTO pendingRegisterRequest = investorService.findById(id);
        if (pendingRegisterRequest == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(pendingRegisterRequest);
    }

    @GetMapping("/interested-sectors/{id}")
    public ResponseEntity<List<String>> getInterestedSectors(@PathVariable Integer id) {
        List<String> interestedSectors = investorService.findInterestedSectors(id);
        if (interestedSectors.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(interestedSectors);
    }

    @GetMapping("/interested-sectors-Ids/{id}")
    public ResponseEntity<List<Integer>> getInterestedSectorsIds(@PathVariable Integer id) {
        List<Integer> interestedSectors = investorService.findInterestedSectorsId(id);
        if (interestedSectors.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(interestedSectors);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateIndividualInvestor(@RequestBody IndividualInvestorDTO updatedInvestor, @PathVariable Integer id) {
        IndividualInvestorDTO updatedIndividualInvestor = investorService.updateIndividualInvestor(updatedInvestor,id);
        if (updatedIndividualInvestor != null) {
            return ResponseEntity.ok("Individual Investor Updated Successfully");
        }else{
            return ResponseEntity.notFound().build();
        }
    }
}
