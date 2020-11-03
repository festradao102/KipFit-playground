package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.domain.ExercisesSet;
import com.techgroup.kipfit.repository.ExercisesSetRepository;
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
 * REST controller for managing {@link com.techgroup.kipfit.domain.ExercisesSet}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ExercisesSetResource {

    private final Logger log = LoggerFactory.getLogger(ExercisesSetResource.class);

    private static final String ENTITY_NAME = "exercisesSet";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExercisesSetRepository exercisesSetRepository;

    public ExercisesSetResource(ExercisesSetRepository exercisesSetRepository) {
        this.exercisesSetRepository = exercisesSetRepository;
    }

    /**
     * {@code POST  /exercises-sets} : Create a new exercisesSet.
     *
     * @param exercisesSet the exercisesSet to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new exercisesSet, or with status {@code 400 (Bad Request)} if the exercisesSet has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/exercises-sets")
    public ResponseEntity<ExercisesSet> createExercisesSet(@RequestBody ExercisesSet exercisesSet) throws URISyntaxException {
        log.debug("REST request to save ExercisesSet : {}", exercisesSet);
        if (exercisesSet.getId() != null) {
            throw new BadRequestAlertException("A new exercisesSet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExercisesSet result = exercisesSetRepository.save(exercisesSet);
        return ResponseEntity.created(new URI("/api/exercises-sets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /exercises-sets} : Updates an existing exercisesSet.
     *
     * @param exercisesSet the exercisesSet to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated exercisesSet,
     * or with status {@code 400 (Bad Request)} if the exercisesSet is not valid,
     * or with status {@code 500 (Internal Server Error)} if the exercisesSet couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/exercises-sets")
    public ResponseEntity<ExercisesSet> updateExercisesSet(@RequestBody ExercisesSet exercisesSet) throws URISyntaxException {
        log.debug("REST request to update ExercisesSet : {}", exercisesSet);
        if (exercisesSet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ExercisesSet result = exercisesSetRepository.save(exercisesSet);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, exercisesSet.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /exercises-sets} : get all the exercisesSets.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of exercisesSets in body.
     */
    @GetMapping("/exercises-sets")
    public List<ExercisesSet> getAllExercisesSets(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all ExercisesSets");
        return exercisesSetRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /exercises-sets/:id} : get the "id" exercisesSet.
     *
     * @param id the id of the exercisesSet to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the exercisesSet, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/exercises-sets/{id}")
    public ResponseEntity<ExercisesSet> getExercisesSet(@PathVariable Long id) {
        log.debug("REST request to get ExercisesSet : {}", id);
        Optional<ExercisesSet> exercisesSet = exercisesSetRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(exercisesSet);
    }

    /**
     * {@code DELETE  /exercises-sets/:id} : delete the "id" exercisesSet.
     *
     * @param id the id of the exercisesSet to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/exercises-sets/{id}")
    public ResponseEntity<Void> deleteExercisesSet(@PathVariable Long id) {
        log.debug("REST request to delete ExercisesSet : {}", id);
        exercisesSetRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
