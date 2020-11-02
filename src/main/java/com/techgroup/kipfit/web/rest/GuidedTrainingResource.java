package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.domain.GuidedTraining;
import com.techgroup.kipfit.repository.GuidedTrainingRepository;
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

/**
 * REST controller for managing {@link com.techgroup.kipfit.domain.GuidedTraining}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GuidedTrainingResource {

    private final Logger log = LoggerFactory.getLogger(GuidedTrainingResource.class);

    private static final String ENTITY_NAME = "guidedTraining";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GuidedTrainingRepository guidedTrainingRepository;

    public GuidedTrainingResource(GuidedTrainingRepository guidedTrainingRepository) {
        this.guidedTrainingRepository = guidedTrainingRepository;
    }

    /**
     * {@code POST  /guided-trainings} : Create a new guidedTraining.
     *
     * @param guidedTraining the guidedTraining to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new guidedTraining, or with status {@code 400 (Bad Request)} if the guidedTraining has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/guided-trainings")
    public ResponseEntity<GuidedTraining> createGuidedTraining(@RequestBody GuidedTraining guidedTraining) throws URISyntaxException {
        log.debug("REST request to save GuidedTraining : {}", guidedTraining);
        if (guidedTraining.getId() != null) {
            throw new BadRequestAlertException("A new guidedTraining cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GuidedTraining result = guidedTrainingRepository.save(guidedTraining);
        return ResponseEntity.created(new URI("/api/guided-trainings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /guided-trainings} : Updates an existing guidedTraining.
     *
     * @param guidedTraining the guidedTraining to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated guidedTraining,
     * or with status {@code 400 (Bad Request)} if the guidedTraining is not valid,
     * or with status {@code 500 (Internal Server Error)} if the guidedTraining couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/guided-trainings")
    public ResponseEntity<GuidedTraining> updateGuidedTraining(@RequestBody GuidedTraining guidedTraining) throws URISyntaxException {
        log.debug("REST request to update GuidedTraining : {}", guidedTraining);
        if (guidedTraining.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GuidedTraining result = guidedTrainingRepository.save(guidedTraining);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, guidedTraining.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /guided-trainings} : get all the guidedTrainings.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of guidedTrainings in body.
     */
    @GetMapping("/guided-trainings")
    public List<GuidedTraining> getAllGuidedTrainings(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all GuidedTrainings");
        return guidedTrainingRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /guided-trainings/:id} : get the "id" guidedTraining.
     *
     * @param id the id of the guidedTraining to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the guidedTraining, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/guided-trainings/{id}")
    public ResponseEntity<GuidedTraining> getGuidedTraining(@PathVariable Long id) {
        log.debug("REST request to get GuidedTraining : {}", id);
        Optional<GuidedTraining> guidedTraining = guidedTrainingRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(guidedTraining);
    }

    /**
     * {@code DELETE  /guided-trainings/:id} : delete the "id" guidedTraining.
     *
     * @param id the id of the guidedTraining to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/guided-trainings/{id}")
    public ResponseEntity<Void> deleteGuidedTraining(@PathVariable Long id) {
        log.debug("REST request to delete GuidedTraining : {}", id);
        guidedTrainingRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
