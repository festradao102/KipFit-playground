package com.techgroup.kipfit.repository;

import com.techgroup.kipfit.domain.ExerciseType;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ExerciseType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExerciseTypeRepository extends JpaRepository<ExerciseType, Long> {
}
