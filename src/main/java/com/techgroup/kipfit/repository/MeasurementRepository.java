package com.techgroup.kipfit.repository;

import com.techgroup.kipfit.domain.Measurement;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Measurement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MeasurementRepository extends JpaRepository<Measurement, Long> {
}
