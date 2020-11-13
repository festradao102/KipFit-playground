package com.techgroup.kipfit.repository;

import com.techgroup.kipfit.domain.Plan;

import com.techgroup.kipfit.domain.Subscriber;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Plan entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlanRepository extends JpaRepository<Plan, Long> {
    @Query(value = "select distinct plan from Plan plan left join fetch plan.objectiveTypes",
        countQuery = "select count(distinct plan) from Plan plan")
    Page<Plan> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct plan from Plan plan left join fetch plan.objectiveTypes")
    List<Plan> findAllWithEagerRelationships();

    @Query("select distinct plan from Plan plan left join fetch plan.objectiveTypes where plan.id =:id")
    Optional<Plan> findOneWithEagerRelationships(@Param("id") Long id);
}
