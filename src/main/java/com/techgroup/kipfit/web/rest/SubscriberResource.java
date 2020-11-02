package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.domain.Subscriber;
import com.techgroup.kipfit.repository.SubscriberRepository;
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
 * REST controller for managing {@link com.techgroup.kipfit.domain.Subscriber}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SubscriberResource {

    private final Logger log = LoggerFactory.getLogger(SubscriberResource.class);

    private static final String ENTITY_NAME = "subscriber";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubscriberRepository subscriberRepository;

    public SubscriberResource(SubscriberRepository subscriberRepository) {
        this.subscriberRepository = subscriberRepository;
    }

    /**
     * {@code POST  /subscribers} : Create a new subscriber.
     *
     * @param subscriber the subscriber to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new subscriber, or with status {@code 400 (Bad Request)} if the subscriber has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/subscribers")
    public ResponseEntity<Subscriber> createSubscriber(@RequestBody Subscriber subscriber) throws URISyntaxException {
        log.debug("REST request to save Subscriber : {}", subscriber);
        if (subscriber.getId() != null) {
            throw new BadRequestAlertException("A new subscriber cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Subscriber result = subscriberRepository.save(subscriber);
        return ResponseEntity.created(new URI("/api/subscribers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /subscribers} : Updates an existing subscriber.
     *
     * @param subscriber the subscriber to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subscriber,
     * or with status {@code 400 (Bad Request)} if the subscriber is not valid,
     * or with status {@code 500 (Internal Server Error)} if the subscriber couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/subscribers")
    public ResponseEntity<Subscriber> updateSubscriber(@RequestBody Subscriber subscriber) throws URISyntaxException {
        log.debug("REST request to update Subscriber : {}", subscriber);
        if (subscriber.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Subscriber result = subscriberRepository.save(subscriber);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, subscriber.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /subscribers} : get all the subscribers.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subscribers in body.
     */
    @GetMapping("/subscribers")
    public List<Subscriber> getAllSubscribers(@RequestParam(required = false) String filter,@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        if ("fituser-is-null".equals(filter)) {
            log.debug("REST request to get all Subscribers where fitUser is null");
            return StreamSupport
                .stream(subscriberRepository.findAll().spliterator(), false)
                .filter(subscriber -> subscriber.getFitUser() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Subscribers");
        return subscriberRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /subscribers/:id} : get the "id" subscriber.
     *
     * @param id the id of the subscriber to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subscriber, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/subscribers/{id}")
    public ResponseEntity<Subscriber> getSubscriber(@PathVariable Long id) {
        log.debug("REST request to get Subscriber : {}", id);
        Optional<Subscriber> subscriber = subscriberRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(subscriber);
    }

    /**
     * {@code DELETE  /subscribers/:id} : delete the "id" subscriber.
     *
     * @param id the id of the subscriber to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/subscribers/{id}")
    public ResponseEntity<Void> deleteSubscriber(@PathVariable Long id) {
        log.debug("REST request to delete Subscriber : {}", id);
        subscriberRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
