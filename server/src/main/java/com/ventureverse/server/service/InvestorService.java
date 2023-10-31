package com.ventureverse.server.service;

import com.ventureverse.server.enumeration.Role;
import com.ventureverse.server.enumeration.Status;
import com.ventureverse.server.model.entity.*;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.repository.*;
import com.ventureverse.server.model.entity.EnterpriseInvestorDTO;
import com.ventureverse.server.model.entity.IndividualInvestorDTO;
import com.ventureverse.server.model.entity.InvestorInterestedSectorDTO;
import com.ventureverse.server.repository.EnterpriseInvestorRepository;
import com.ventureverse.server.repository.IndividualInvestorRepository;
import com.ventureverse.server.repository.IndustrySectorRepository;
import com.ventureverse.server.repository.InvestorInterestedSectorRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InvestorService {
    private final IndividualInvestorRepository individualInvestorRepository;

    private final InvestorInterestedSectorRepository investorInterestedSectorRepository;
    private final Investor_InterestedListingRepository investor_interestedListingRepository;
    private final CounterProposalRepository counterProposalRepository;

    private final EnterpriseInvestorRepository enterpriseInvestorRepository;

    public InvestorService(IndividualInvestorRepository individualInvestorRepository, EnterpriseInvestorRepository enterpriseInvestorRepository, InvestorInterestedSectorRepository investorInterestedSectorRepository, IndustrySectorRepository industrySectorRepository) {
        this.individualInvestorRepository = individualInvestorRepository;
        this.investorInterestedSectorRepository = investorInterestedSectorRepository;
        this.enterpriseInvestorRepository = enterpriseInvestorRepository;
    }

    public List<IndividualInvestorDTO> findByApprovalStatus(Status status) {
        return individualInvestorRepository.findByApprovalStatus(status);
    }

    public IndividualInvestorDTO findById(Integer id) {
        return individualInvestorRepository.findById(id).orElse(null);
    }

    public List<String> findInterestedSectors(Integer id) {
        List<InvestorInterestedSectorDTO> interestedSectors = investorInterestedSectorRepository.findByInvestorId(id);
        List<String> sectorNames = new ArrayList<>();
        for (InvestorInterestedSectorDTO interestedSector : interestedSectors) {
            sectorNames.add(interestedSector.getId().getSectorId().getName());
        }
        return sectorNames;
    }

    public IndividualInvestorDTO getInvestorById(int i) {
        return individualInvestorRepository.findById(i).orElse(null);
    }

    public List<InvestorInterestedListingDTO> getListings(Integer id) {
        return investor_interestedListingRepository.findByInvestorId(id);
    }


    public ResponseDTO updateListing(List<Integer> id, InvestorInterestedListingDTO investorInterestedListingDTO) {
        //make the listingid a type of listingDTO
        var Listingid= id.get(0);
        var investorId= id.get(1);
        ListingDTO listingDTO = new ListingDTO();
        listingDTO.setListingId(Listingid);

        InvestorDTO investorDTO = new InvestorDTO();
        investorDTO.setId(investorId);

        Optional<InvestorInterestedListingDTO> listing= investor_interestedListingRepository.findByListingInvestor(listingDTO,investorId);
        if (listing.isPresent()) {
            InvestorInterestedListingDTO oldListing = listing.get();
            oldListing.setAmountFinalized(investorInterestedListingDTO.getAmountFinalized());
            oldListing.setReturnEquityPercentage(investorInterestedListingDTO.getReturnEquityPercentage());
            oldListing.setReturnUnitProfitPercentage(investorInterestedListingDTO.getReturnUnitProfitPercentage());
            oldListing.setInvestorProofDocument(investorInterestedListingDTO.getInvestorProofDocument());
            oldListing.setStatus(investorInterestedListingDTO.getStatus());
            investor_interestedListingRepository.save(oldListing);
            return GlobalService.response("Success","Listing updated Successfully");
        } else {
            Optional<CounterProposalDTO> counterProposal= counterProposalRepository.findByListingInvestorId(Listingid,investorId);
            if(counterProposal.isPresent()){
                InvestorInterestedListingDTO newListing = new InvestorInterestedListingDTO();
                newListing.setId(new InvestorInterestedListingDTO.CompositeKey(investorDTO, listingDTO));
                newListing.setAmountFinalized(investorInterestedListingDTO.getAmountFinalized());
                newListing.setReturnEquityPercentage(investorInterestedListingDTO.getReturnEquityPercentage());
                newListing.setReturnUnitProfitPercentage(investorInterestedListingDTO.getReturnUnitProfitPercentage());
                newListing.setInvestorProofDocument(investorInterestedListingDTO.getInvestorProofDocument());
                newListing.setStatus(investorInterestedListingDTO.getStatus());
                newListing.setInterestedDate(counterProposal.get().getDate());
                investor_interestedListingRepository.save(newListing);
                //delete the counter proposal
                counterProposalRepository.delete(counterProposal.get());
                return GlobalService.response("Success","Listing updated Successfully");
            }else{
                return GlobalService.response("Error","Listing not found");
            }
        }
    }

    public String getdoc(Integer id) {
        return investor_interestedListingRepository.findByListingId(id).getInvestorProofDocument();
    }

    public List<CounterProposalDTO> getCounters(Integer id) {
        return counterProposalRepository.findByInvestorId(id);
    }
    
    public List<IndividualInvestorDTO> getAllIndividualInvestors() {
        return individualInvestorRepository.findByRole(Role.INDIVIDUAL_INVESTOR);
    }

    public List<EnterpriseInvestorDTO> getAllEnterpriseInvestors() {
        return enterpriseInvestorRepository.findByRole(Role.ENTERPRISE_INVESTOR);
    }

    public IndividualInvestorDTO getIndividualInvestorById(Integer id) {
        return individualInvestorRepository.findById(id).orElse(null);
    }

    //Individual Investor Update
    public IndividualInvestorDTO updateIndividualInvestor(IndividualInvestorDTO updatedIndividualInvestor, Integer id) {
        Optional<IndividualInvestorDTO> existingIndividualInvestorOptional = individualInvestorRepository.findById(id);

        IndividualInvestorDTO existingIndividualInvestor = individualInvestorRepository.findById(id).orElse(null);

        if (existingIndividualInvestor != null) {
            existingIndividualInvestor.setFirstname(updatedIndividualInvestor.getFirstname());
            existingIndividualInvestor.setLastname(updatedIndividualInvestor.getLastname());
            existingIndividualInvestor.setEmail(updatedIndividualInvestor.getEmail());
            existingIndividualInvestor.setNic(updatedIndividualInvestor.getNic());
            existingIndividualInvestor.setContactNumber(updatedIndividualInvestor.getContactNumber());

        }
        if (existingIndividualInvestor != null) {
            return individualInvestorRepository.save(existingIndividualInvestor);
        } else {
            return null;
        }
    }


    public EnterpriseInvestorDTO getEnterpriseInvestorById(Integer id) {
        return enterpriseInvestorRepository.findById(id).orElse(null);
    }

    public EnterpriseInvestorDTO updateEnterpriseInvestor(EnterpriseInvestorDTO updatedEnterpriseInvestor, Integer id) {
        Optional<EnterpriseInvestorDTO> existingEnterpriseInvestorOptional = enterpriseInvestorRepository.findById(id);

        EnterpriseInvestorDTO existingEnterpriseInvestor = enterpriseInvestorRepository.findById(id).orElse(null);

        if (existingEnterpriseInvestor != null) {
            existingEnterpriseInvestor.setEmail(updatedEnterpriseInvestor.getEmail());
            existingEnterpriseInvestor.setContactNumber(updatedEnterpriseInvestor.getContactNumber());
            existingEnterpriseInvestor.setBusinessName(updatedEnterpriseInvestor.getBusinessName());

        }
        if(existingEnterpriseInvestor != null) {
            return enterpriseInvestorRepository.save(existingEnterpriseInvestor);
        }
        else{
            return null;
        }
    }
}
