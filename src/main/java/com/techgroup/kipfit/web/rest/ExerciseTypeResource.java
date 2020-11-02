package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.domain.ExerciseType;
import com.techgroup.kipfit.repository.ExerciseTypeRepository;
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
 * REST controller for managing {@link com.techgroup.kipfit.domain.ExerciseType}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ExerciseTypeResource {

    private final Logger log = LoggerFactory.getLogger(ExerciseTypeResource.class);

    private static final String ENTITY_NAME = "exerciseType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExerciseTypeRepository exerciseTypeRepository;

    public ExerciseTypeResource(ExerciseTypeRepository exerciseTypeRepository) {
        this.exerciseTypeRepository = exerciseTypeRepository;
    }

    /**
     * {@code POST  /exercise-types} : Create a new exerciseType.
     *
     * @param exerciseType the exerciseType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new exerciseType, or with status {@code 400 (Bad Request)} if the exerciseType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/exercise-types")
    public ResponseEntity<ExerciseType> createExerciseType(@RequestBody ExerciseType exerciseType) throws URISyntaxException {
        log.debug("REST request to save ExerciseType : {}", exerciseType);
        if (exerciseType.getId() != null) {
            throw new BadRequestAlertException("A new exerciseType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ExerciseType result = exerciseTypeRepository.save(exerciseType);
        return ResponseEntity.created(new URI("/api/exercise-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /exercise-types} : Updates an existing exerciseType.
     *
     * @param exerciseType the exerciseType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated exerciseType,
     * or with status {@code 400 (Bad Request)} if the exerciseType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the exerciseType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/exercise-types")
    public ResponseEntity<ExerciseType> updateExerciseType(@RequestBody ExerciseType exerciseType) throws URISyntaxException {
        log.debug("REST request to update ExerciseType : {}", exerciseType);
        if (exerciseType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ExerciseType result = exerciseTypeRepository.save(exerciseType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, exerciseType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /exercise-types} : get all the exerciseTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of exerciseTypes in body.
     */
    @GetMapping("/exercise-types")
    public List<ExerciseType> getAllExerciseTypes() {
        log.debug("REST request to get all ExerciseTypes");
        return exerciseTypeRepository.findAll();
    }

    /**
     * {@code GET  /exercise-types/:id} : get the "id" exerciseType.
     *
     * @param id the id of the exerciseType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the exerciseType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/exercise-types/{id}")
    public ResponseEntity<ExerciseType> getExerciseType(@PathVariable Long id) {
        log.debug("REST request to get ExerciseType : {}", id);
        Optional<ExerciseType> exerciseType = exerciseTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(exerciseType);
    }

    /**
     * {@code DELETE  /exercise-types/:id} : delete the "id" exerciseType.
     *
     * @param id the id of the exerciseType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/exercise-types/{id}")
    public ResponseEntity<Void> deleteExerciseType(@PathVariable Long id) {
        log.debug("REST request to delete ExerciseType : {}", id);
        exerciseTypeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
