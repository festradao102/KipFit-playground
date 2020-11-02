package com.techgroup.kipfit.repository;

import com.techgroup.kipfit.domain.SubscriptionPayment;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the SubscriptionPayment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubscriptionPaymentRepository extends JpaRepository<SubscriptionPayment, Long> {
}
