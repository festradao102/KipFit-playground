package com.techgroup.kipfit.repository;

import com.techgroup.kipfit.domain.GuidedTraining;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the GuidedTraining entity.
 */
@Repository
public interface GuidedTrainingRepository extends JpaRepository<GuidedTraining, Long> {

    @Query(value = "select distinct guidedTraining from GuidedTraining guidedTraining left join fetch guidedTraining.schedules",
        countQuery = "select count(distinct guidedTraining) from GuidedTraining guidedTraining")
    Page<GuidedTraining> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct guidedTraining from GuidedTraining guidedTraining left join fetch guidedTraining.schedules")
    List<GuidedTraining> findAllWithEagerRelationships();

    @Query("select guidedTraining from GuidedTraining guidedTraining left join fetch guidedTraining.schedules where guidedTraining.id =:id")
    Optional<GuidedTraining> findOneWithEagerRelationships(@Param("id") Long id);
}
