package com.techgroup.kipfit.repository;

import com.techgroup.kipfit.domain.FitUser;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the FitUser entity.
 */
@Repository
public interface FitUserRepository extends JpaRepository<FitUser, Long> {

    @Query(value = "select distinct fitUser from FitUser fitUser left join fetch fitUser.schedules",
        countQuery = "select count(distinct fitUser) from FitUser fitUser")
    Page<FitUser> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct fitUser from FitUser fitUser left join fetch fitUser.schedules")
    List<FitUser> findAllWithEagerRelationships();

    @Query("select fitUser from FitUser fitUser left join fetch fitUser.schedules where fitUser.id =:id")
    Optional<FitUser> findOneWithEagerRelationships(@Param("id") Long id);
}
