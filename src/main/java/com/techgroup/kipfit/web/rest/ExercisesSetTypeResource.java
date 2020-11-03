package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.domain.ExercisesSetType;
import com.techgroup.kipfit.repository.ExercisesSetTypeRepository;
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
 * REST controller for managing {@link com.techgroup.kipfit.domain.ExercisesSetType}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ExercisesSetTypeResource {

    private final Logger log = LoggerFactory.getLogger(ExercisesSetTypeResource.class);

    private static final String ENTITY_NAME = "exercisesSetType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExercisesSetTypeRepository exercisesSetTypeRepository;

    public ExercisesSetTypeResource(ExercisesSetTypeRepository exercisesSetTypeRepository) {
        this.exercisesSetTypeRepository = exercisesSetTypeRepository;
    }

    /**
     * {@code POST  /exercises-set-types} : Create a new exercisesSetType.
     *
     * @param exercisesSetType the exercisesSetType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new exercisesSetType, or with status {@code 400 (Bad Request)} if the exercisesSetType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/exercises-set-types")
    public ResponseEntity<ExercisesSetType> createExercisesSetType(@RequestBody ExercisesSetType exercisesSetType) throws URISyntaxException {
        log.debug("REST request to save ExercisesSetType : {}", exercisesSetType);
        if (exercisesSetType.getId() != null) {
            throw new BadRequestAlertException("A new exercisesSetType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExercisesSetType result = exercisesSetTypeRepository.save(exercisesSetType);
        return ResponseEntity.created(new URI("/api/exercises-set-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /exercises-set-types} : Updates an existing exercisesSetType.
     *
     * @param exercisesSetType the exercisesSetType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated exercisesSetType,
     * or with status {@code 400 (Bad Request)} if the exercisesSetType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the exercisesSetType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/exercises-set-types")
    public ResponseEntity<ExercisesSetType> updateExercisesSetType(@RequestBody ExercisesSetType exercisesSetType) throws URISyntaxException {
        log.debug("REST request to update ExercisesSetType : {}", exercisesSetType);
        if (exercisesSetType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ExercisesSetType result = exercisesSetTypeRepository.save(exercisesSetType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, exercisesSetType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /exercises-set-types} : get all the exercisesSetTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of exercisesSetTypes in body.
     */
    @GetMapping("/exercises-set-types")
    public List<ExercisesSetType> getAllExercisesSetTypes() {
        log.debug("REST request to get all ExercisesSetTypes");
        return exercisesSetTypeRepository.findAll();
    }

    /**
     * {@code GET  /exercises-set-types/:id} : get the "id" exercisesSetType.
     *
     * @param id the id of the exercisesSetType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the exercisesSetType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/exercises-set-types/{id}")
    public ResponseEntity<ExercisesSetType> getExercisesSetType(@PathVariable Long id) {
        log.debug("REST request to get ExercisesSetType : {}", id);
        Optional<ExercisesSetType> exercisesSetType = exercisesSetTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(exercisesSetType);
    }

    /**
     * {@code DELETE  /exercises-set-types/:id} : delete the "id" exercisesSetType.
     *
     * @param id the id of the exercisesSetType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/exercises-set-types/{id}")
    public ResponseEntity<Void> deleteExercisesSetType(@PathVariable Long id) {
        log.debug("REST request to delete ExercisesSetType : {}", id);
        exercisesSetTypeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
