package com.techgroup.kipfit.repository;

import com.techgroup.kipfit.domain.ExercisesSetType;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ExercisesSetType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExercisesSetTypeRepository extends JpaRepository<ExercisesSetType, Long> {
}
