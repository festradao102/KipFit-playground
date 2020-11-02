package com.techgroup.kipfit.repository;

import com.techgroup.kipfit.domain.ExercisesSet;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the ExercisesSet entity.
 */
@Repository
public interface ExercisesSetRepository extends JpaRepository<ExercisesSet, Long> {

    @Query(value = "select distinct exercisesSet from ExercisesSet exercisesSet left join fetch exercisesSet.exercises",
        countQuery = "select count(distinct exercisesSet) from ExercisesSet exercisesSet")
    Page<ExercisesSet> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct exercisesSet from ExercisesSet exercisesSet left join fetch exercisesSet.exercises")
    List<ExercisesSet> findAllWithEagerRelationships();

    @Query("select exercisesSet from ExercisesSet exercisesSet left join fetch exercisesSet.exercises where exercisesSet.id =:id")
    Optional<ExercisesSet> findOneWithEagerRelationships(@Param("id") Long id);
}
