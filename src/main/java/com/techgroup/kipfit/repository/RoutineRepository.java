package com.techgroup.kipfit.repository;

import com.techgroup.kipfit.domain.Plan;
import com.techgroup.kipfit.domain.Routine;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Routine entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoutineRepository extends JpaRepository<Routine, Long> {
    @Query("select distinct routine from Routine routine left join fetch routine.plan where routine.plan.id=:planId")
    List<Routine> findAllBySubscriber(@Param("planId") Long planId);
}
