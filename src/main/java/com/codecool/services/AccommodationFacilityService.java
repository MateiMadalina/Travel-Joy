package com.codecool.services;

import com.codecool.model.AccommodationFacility;
import com.codecool.repositories.AccommodationFacilityRepository;
import com.codecool.repositories.AccommodationRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class AccommodationFacilityService {
  private AccommodationFacilityRepository accommodationFacilityRepository;

    public AccommodationFacilityService(AccommodationFacilityRepository accommodationFacilityRepository) {
        this.accommodationFacilityRepository = accommodationFacilityRepository;
    }

    public void addAccommodationFacility(AccommodationFacility accommodationFacility){
        if (accommodationFacilityRepository.findAll().stream().noneMatch(af -> af.getName().equals(accommodationFacility.getName()))){
            accommodationFacilityRepository.save(accommodationFacility);
        } else {
            throw new EntityNotFoundException("Accommodation facility already exists");
        }
    }
}
