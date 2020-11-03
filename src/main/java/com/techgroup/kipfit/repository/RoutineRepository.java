package com.techgroup.kipfit.repository;

import com.techgroup.kipfit.domain.Routine;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Routine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoutineRepository extends JpaRepository<Routine, Long> {
}
