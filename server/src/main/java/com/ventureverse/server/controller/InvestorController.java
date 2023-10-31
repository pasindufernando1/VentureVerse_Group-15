package com.ventureverse.server.controller;

import com.ventureverse.server.enumeration.Role;
import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.CounterProposalDTO;
import com.ventureverse.server.model.entity.EnterpriseInvestorDTO;
import com.ventureverse.server.model.entity.IndividualInvestorDTO;
import com.ventureverse.server.model.entity.InvestorInterestedListingDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.service.EntrepreneurService;
import com.ventureverse.server.model.entity.InvestorDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.service.InvestorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/investors")
@RequiredArgsConstructor
public class InvestorController {

    private final InvestorService investorService;
    private final EntrepreneurService entrepreneurService;


    @GetMapping("/pending")
    public ResponseEntity<List<RegisterRequestDTO>> getPendingUsers() {
        List<IndividualInvestorDTO> pendingRegisterRequests = investorService.findByApprovalStatus(Status.PENDING);
        if (pendingRegisterRequests.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        RegisterRequestDTO registerRequestDTO = new RegisterRequestDTO();
        return ResponseEntity.ok(registerRequestDTO.toInvesorRegisterRequestDTO(pendingRegisterRequests));
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
    @GetMapping("/IndividualInvestor/view")
    public ResponseEntity<List<IndividualInvestorDTO>> getAllIndividualInvestors() {
        List<IndividualInvestorDTO> individualInvestors = investorService.getAllIndividualInvestors();
        System.out.println(individualInvestors);
        return ResponseEntity.ok(individualInvestors);

    }
    @GetMapping("/EnterpriseInvestor/view")
    public ResponseEntity<List<EnterpriseInvestorDTO>> getAllEnterpriseInvestors() {
        List<EnterpriseInvestorDTO> enterpriseInvestors = investorService.getAllEnterpriseInvestors();
        System.out.println(enterpriseInvestors);
        return ResponseEntity.ok(enterpriseInvestors);

    }
    @GetMapping("/IndividualInvestor/view/{id}")
    public ResponseEntity<IndividualInvestorDTO> getIndividualInvestorById(@PathVariable Integer id) {
        IndividualInvestorDTO individualInvestor = investorService.getIndividualInvestorById(id);
        System.out.println(individualInvestor);
        return ResponseEntity.ok(individualInvestor);

    }

    @PutMapping("/IndividualInvestor/update/{id}")
    public ResponseEntity<IndividualInvestorDTO> updateIndividualInvestor(@RequestBody IndividualInvestorDTO updatedIndividualInvestor, @PathVariable Integer id) {
        IndividualInvestorDTO individualInvestor = investorService.updateIndividualInvestor(updatedIndividualInvestor, id);
        System.out.println(individualInvestor);
        return ResponseEntity.ok(individualInvestor);

    }
    @GetMapping("EnterpriseInvestor/view/{id}")
        public ResponseEntity<EnterpriseInvestorDTO> getEnterpriseInvestorById(@PathVariable Integer id) {
            EnterpriseInvestorDTO enterpriseInvestor = investorService.getEnterpriseInvestorById(id);
            System.out.println(enterpriseInvestor);
            return ResponseEntity.ok(enterpriseInvestor);

        }
@PutMapping("/EnterpriseInvestor/update/{id}")
    public ResponseEntity<EnterpriseInvestorDTO> updateEnterpriseInvestor(@RequestBody EnterpriseInvestorDTO updatedEnterpriseInvestor, @PathVariable Integer id) {
        EnterpriseInvestorDTO enterpriseInvestor = investorService.updateEnterpriseInvestor(updatedEnterpriseInvestor, id);
        System.out.println(enterpriseInvestor);
        return ResponseEntity.ok(enterpriseInvestor);

    }


    @GetMapping("/interestListings/{id}")
    public ResponseEntity<List<InvestorInterestedListingDTO>> getInvestorById(@PathVariable Integer id) {
        List<InvestorInterestedListingDTO> interestedListings = investorService.getListings(id);
        if (interestedListings.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(interestedListings);
    }

    @GetMapping("/getcounters/{id}")
    public ResponseEntity<List<CounterProposalDTO>> getCounters(@PathVariable Integer id) {
        List<CounterProposalDTO> counters = investorService.getCounters(id);
        if (counters.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(counters);
    }

    @PostMapping("/upload")
    public ResponseEntity <ResponseDTO> uploadFile(
            @RequestParam("agreement") MultipartFile agreement
    ) {
        String rootDirectory = System.getProperty("user.dir");

        // Example paths for saving images and videos
        String imageUploadPath = rootDirectory + "/src/main/resources/static/uploads/images";

        try {
            // Save images
            String agreementFileName = agreement.getOriginalFilename();
            Path agreementFilePath = Paths.get(imageUploadPath, agreementFileName);
            Files.write(agreementFilePath, agreement.getBytes());

            return ResponseEntity.ok(new ResponseDTO("Success", "Files uploaded successfully."));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDTO("Failure", "Error uploading files."));
        }
    }

    @PutMapping("/finalizeListing/{id}")
    public ResponseEntity<ResponseDTO> updateListings(
            @PathVariable List<Integer> id,
            @RequestBody InvestorInterestedListingDTO investorInterestedListingDTO
    ) {
        return ResponseEntity.ok(investorService.updateListing(id, investorInterestedListingDTO));
    }

    @GetMapping("/getInvestorPic/{id}")
    public ResponseEntity<List<byte[]>> getInvestorPic(@PathVariable Integer id) throws IOException {
        List<byte[]> img = new ArrayList<>();
        String InvestorPic = entrepreneurService.getEntrepreneurPic(id);

        String rootDirectory = System.getProperty("user.dir");
        String imageUploadPath = rootDirectory + "/src/main/resources/static/uploads/images/profileImages";

        Path InvestorPath = Paths.get(imageUploadPath,InvestorPic);
        img.add(Files.readAllBytes(InvestorPath));

        if (InvestorPic.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(img);
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
