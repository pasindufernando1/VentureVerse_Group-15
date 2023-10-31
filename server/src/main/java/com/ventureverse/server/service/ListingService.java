package com.ventureverse.server.service;

import com.ventureverse.server.model.entity.*;
import com.ventureverse.server.model.normal.ListingRequestDTO;
import com.ventureverse.server.model.normal.ResponseDTO;
import com.ventureverse.server.repository.*;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

import static java.lang.System.exit;

@Service
@RequiredArgsConstructor
public class ListingService {

    public final ListingRepository listingRepository;
    private final EntrepreneurRepository entrepreneurRepository;
    private final IndustrySectorRepository industrySectorRepository;
    private final ListingIndustrySectorsRepository listingIndustrySectorsRepository;
    private final ListingImagesRepository listingImagesRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final ListingSubscriptionRepository listingSubscriptionRepository;
    private final Investor_InterestedListingRepository investor_interestedListingRepository;

    public ResponseDTO addListing(HttpServletResponse response, ListingRequestDTO listingRequestDTO) {
        var entrepreneur = entrepreneurRepository.findById(listingRequestDTO.getEntrepreneurId()).orElseThrow();
        var subscription = subscriptionRepository.findById(listingRequestDTO.getSubscriptionType()).orElseThrow();

        var list = ListingDTO.builder()
                .title(listingRequestDTO.getTitle())
                .description(listingRequestDTO.getDescription())
                .pitchingVideo(listingRequestDTO.getPitchingVideo())
                .intention(listingRequestDTO.getIntention())
                .businessStartDate(listingRequestDTO.getBusinessStartDate())
                .businessDuration(listingRequestDTO.getBusinessDuration())
                .lifetimeSales(listingRequestDTO.getLifetimeSales())
                .lastYearGrossIncome(listingRequestDTO.getLastYearGrossIncome())
                .lastYearNetIncome(listingRequestDTO.getLastYearNetIncome())
                .salesProjectionThisYear(listingRequestDTO.getSalesProjectionThisYear())
                .salesProjectionNextYear(listingRequestDTO.getSalesProjectionNextYear())
                .projectionMethod(listingRequestDTO.getProjectionMethod())
                .outsideSources(listingRequestDTO.getOutsideSources())
                .outsideSourceDescription(listingRequestDTO.getOutsideSourceDescription())
                .attemptsToGrow(listingRequestDTO.getAttemptsToGrow())
                .awards(listingRequestDTO.getAwards())
                .uniqueSellingProposition(listingRequestDTO.getUniqueSellingProposition())
                .stage(listingRequestDTO.getStage())
                .expectedAmount(listingRequestDTO.getExpectedAmount())
                .returnUnitProfitPercentage(listingRequestDTO.getReturnUnitProfitPercentage())
                .returnEquityPercentage(listingRequestDTO.getReturnEquityPercentage())
                .subscriptionType(subscription)
                .publishedDate(listingRequestDTO.getPublishedDate())
                .status(listingRequestDTO.getStatus())
                .entrepreneurId(entrepreneur)
                .build();
        listingRepository.save(list);

        //Get the listing id inserted to the listing table by the above code
        var listingId = listingRepository.findLastInsertedListing();


        var listingSectors = listingRequestDTO.getSectorId();
        for (Integer sectorId : listingSectors) {
            var sector = industrySectorRepository.findById(sectorId).orElseThrow();
            var listingSectorObject = ListingIndustrySectorsDTO.builder()
                    .id(new ListingIndustrySectorsDTO.CompositeKey(listingId, sector))
                    .build();
            listingIndustrySectorsRepository.save(listingSectorObject);
        }

        //Update the listing images table
        var listingImages = listingRequestDTO.getImages();
        for (String image : listingImages) {
            listingImagesRepository.save(ListingImagesDTO.builder()
                    .id(new ListingImagesDTO.CompositeKey(listingId, image))
                    .build());
        }
        return GlobalService.response("Success","Listing added successfully");
    }

    //Function to get the listing details by id
    public ListingDTO getListing(int id) {
        return listingRepository.findById(id).orElseThrow();
    }

    //Function to get the subscriptiontype of a listing
    public ListingSubscriptionDTO getSubscriptionType(int id) {
        //Get the listigDTO object
        var listing = listingRepository.findById(id).orElseThrow();
        return listingSubscriptionRepository.findByListingId(listing).orElseThrow();
    }

    public List<Map<String, String>> getUserGains() {
        List<ListingDTO> listings = listingRepository.findAll();
        List<Map<String, String>> userMap = new ArrayList<>();

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -12);

        for (ListingDTO listing : listings) {
            if (listing.getPublishedDate().after(calendar.getTime())) {
                SimpleDateFormat dateFormat = new SimpleDateFormat("MMMM yyyy", Locale.ENGLISH);
                String publishDate = dateFormat.format(listing.getPublishedDate());

                Map<String, String> map = Map.of(
                        "id", listing.getListingId().toString(),
                        "publishedDate", publishDate,
                        "subscriptionprice", listing.getSubscriptionType().getPrice().toString()
                );
                userMap.add(map);
            }
        }
        return userMap;
    }

    public List<Map<String, String>> getAllListings() {
        List<ListingDTO> listings = listingRepository.findAll();
        List<InvestorInterestedListingDTO> completedListings = investor_interestedListingRepository.findCompletedListings();

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MONTH, -12);

        List<Map<String, String>> userMap = new ArrayList<>();
        List<Integer> completedListingIds = new ArrayList<>();
        for (InvestorInterestedListingDTO completedListing : completedListings) {
            if(completedListing.getFinalizedDate().after(calendar.getTime())){
                SimpleDateFormat dateFormat = new SimpleDateFormat("MMM yyyy", Locale.ENGLISH);
                String finalizedDate = dateFormat.format(completedListing.getFinalizedDate());
                completedListingIds.add(completedListing.getId().getListingId().getListingId());
                Map<String, String> map = Map.of(
                        "id", completedListing.getId().getListingId().getListingId().toString(),
                        "date", finalizedDate,
                        "status", "Completed"
                );
                userMap.add(map);
            }
        }
        //Listings that are in progress
        for (ListingDTO listing : listings) {
            if (!completedListingIds.contains(listing.getListingId()) && listing.getPublishedDate().after(calendar.getTime())) {
                SimpleDateFormat dateFormat = new SimpleDateFormat("MMM yyyy", Locale.ENGLISH);
                String publishDate = dateFormat.format(listing.getPublishedDate());
                Map<String, String> map = Map.of(
                        "id", listing.getListingId().toString(),
                        "date", publishDate,
                        "status", "In Progress"
                );
                userMap.add(map);
            }
        }
        return userMap;
    }
}