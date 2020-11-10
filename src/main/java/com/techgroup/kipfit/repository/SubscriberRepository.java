package com.techgroup.kipfit.repository;

import com.techgroup.kipfit.domain.Subscriber;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Subscriber entity.
 */
@Repository
public interface SubscriberRepository extends JpaRepository<Subscriber, Long> {

    @Query(value = "select distinct subscriber from Subscriber subscriber left join fetch subscriber.guidedTrainings left join fetch subscriber.measurements",
        countQuery = "select count(distinct subscriber) from Subscriber subscriber")
    Page<Subscriber> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct subscriber from Subscriber subscriber left join fetch subscriber.guidedTrainings left join fetch subscriber.measurements")
    List<Subscriber> findAllWithEagerRelationships();

    @Query("select subscriber from Subscriber subscriber left join fetch subscriber.guidedTrainings left join fetch subscriber.measurements where subscriber.id =:id")
    Optional<Subscriber> findOneWithEagerRelationships(@Param("id") Long id);
}
