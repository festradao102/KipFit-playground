package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.domain.SubscriptionPayment;
import com.techgroup.kipfit.repository.SubscriptionPaymentRepository;
import com.techgroup.kipfit.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.techgroup.kipfit.domain.SubscriptionPayment}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SubscriptionPaymentResource {

    private final Logger log = LoggerFactory.getLogger(SubscriptionPaymentResource.class);

    private static final String ENTITY_NAME = "subscriptionPayment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubscriptionPaymentRepository subscriptionPaymentRepository;

    public SubscriptionPaymentResource(SubscriptionPaymentRepository subscriptionPaymentRepository) {
        this.subscriptionPaymentRepository = subscriptionPaymentRepository;
    }

    /**
     * {@code POST  /subscription-payments} : Create a new subscriptionPayment.
     *
     * @param subscriptionPayment the subscriptionPayment to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new subscriptionPayment, or with status {@code 400 (Bad Request)} if the subscriptionPayment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/subscription-payments")
    public ResponseEntity<SubscriptionPayment> createSubscriptionPayment(@RequestBody SubscriptionPayment subscriptionPayment) throws URISyntaxException {
        log.debug("REST request to save SubscriptionPayment : {}", subscriptionPayment);
        if (subscriptionPayment.getId() != null) {
            throw new BadRequestAlertException("A new subscriptionPayment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubscriptionPayment result = subscriptionPaymentRepository.save(subscriptionPayment);
        return ResponseEntity.created(new URI("/api/subscription-payments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /subscription-payments} : Updates an existing subscriptionPayment.
     *
     * @param subscriptionPayment the subscriptionPayment to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subscriptionPayment,
     * or with status {@code 400 (Bad Request)} if the subscriptionPayment is not valid,
     * or with status {@code 500 (Internal Server Error)} if the subscriptionPayment couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/subscription-payments")
    public ResponseEntity<SubscriptionPayment> updateSubscriptionPayment(@RequestBody SubscriptionPayment subscriptionPayment) throws URISyntaxException {
        log.debug("REST request to update SubscriptionPayment : {}", subscriptionPayment);
        if (subscriptionPayment.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SubscriptionPayment result = subscriptionPaymentRepository.save(subscriptionPayment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, subscriptionPayment.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /subscription-payments} : get all the subscriptionPayments.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subscriptionPayments in body.
     */
    @GetMapping("/subscription-payments")
    public List<SubscriptionPayment> getAllSubscriptionPayments(@RequestParam(required = false) String filter) {
        if ("subscriber-is-null".equals(filter)) {
            log.debug("REST request to get all SubscriptionPayments where subscriber is null");
            return StreamSupport
                .stream(subscriptionPaymentRepository.findAll().spliterator(), false)
                .filter(subscriptionPayment -> subscriptionPayment.getSubscriber() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all SubscriptionPayments");
        return subscriptionPaymentRepository.findAll();
    }

    /**
     * {@code GET  /subscription-payments/:id} : get the "id" subscriptionPayment.
     *
     * @param id the id of the subscriptionPayment to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subscriptionPayment, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/subscription-payments/{id}")
    public ResponseEntity<SubscriptionPayment> getSubscriptionPayment(@PathVariable Long id) {
        log.debug("REST request to get SubscriptionPayment : {}", id);
        Optional<SubscriptionPayment> subscriptionPayment = subscriptionPaymentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(subscriptionPayment);
    }

    /**
     * {@code DELETE  /subscription-payments/:id} : delete the "id" subscriptionPayment.
     *
     * @param id the id of the subscriptionPayment to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/subscription-payments/{id}")
    public ResponseEntity<Void> deleteSubscriptionPayment(@PathVariable Long id) {
        log.debug("REST request to delete SubscriptionPayment : {}", id);
        subscriptionPaymentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
