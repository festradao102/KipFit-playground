package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.domain.ExercisesSet;
import com.techgroup.kipfit.domain.Plan;
import com.techgroup.kipfit.domain.Routine;
import com.techgroup.kipfit.repository.ExercisesSetRepository;
import com.techgroup.kipfit.repository.RoutineRepository;
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
 * REST controller for managing {@link com.techgroup.kipfit.domain.Routine}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RoutineResource {

    private final Logger log = LoggerFactory.getLogger(RoutineResource.class);

    private static final String ENTITY_NAME = "routine";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RoutineRepository routineRepository;
    private final ExercisesSetRepository exercisesSetRepository;

    public RoutineResource(RoutineRepository routineRepository,ExercisesSetRepository exercisesSetRepository) {
        this.routineRepository = routineRepository;
        this.exercisesSetRepository = exercisesSetRepository;
    }

    /**
     * {@code POST  /routines} : Create a new routine.
     *
     * @param routine the routine to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new routine, or with status {@code 400 (Bad Request)} if the routine has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/routines")
    public ResponseEntity<Routine> createRoutine(@RequestBody Routine routine) throws URISyntaxException {
        log.debug("REST request to save Routine : {}", routine);
        if (routine.getId() != null) {
            throw new BadRequestAlertException("A new routine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Routine result = routineRepository.save(routine);
        return ResponseEntity.created(new URI("/api/routines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /routines} : Updates an existing routine.
     *
     * @param routine the routine to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated routine,
     * or with status {@code 400 (Bad Request)} if the routine is not valid,
     * or with status {@code 500 (Internal Server Error)} if the routine couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/routines")
    public ResponseEntity<Routine> updateRoutine(@RequestBody Routine routine) throws URISyntaxException {
        log.debug("REST request to update Routine : {}", routine);
        if (routine.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Routine result = routineRepository.save(routine);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, routine.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /routines} : get all the routines.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of routines in body.
     */
    @GetMapping("/routines")
    public List<Routine> getAllRoutines() {
        log.debug("REST request to get all Routines");
        return routineRepository.findAll();
    }

    @GetMapping("/routinesByPlan/{planId}")
    public List<Routine> getRoutinesByPlanId(@PathVariable Long planId) {
        log.debug("REST request to get all Routines");
        return routineRepository.findAllBySubscriber(planId);
    }

    /**
     * {@code GET  /routines/:id} : get the "id" routine.
     *
     * @param id the id of the routine to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the routine, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/routines/{id}")
    public ResponseEntity<Routine> getRoutine(@PathVariable Long id) {
        log.debug("REST request to get Routine : {}", id);
        Optional<Routine> routine = routineRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(routine);
    }

    /**
     * {@code DELETE  /routines/:id} : delete the "id" routine.
     *
     * @param id the id of the routine to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/routines/{id}")
    public ResponseEntity<Void> deleteRoutine(@PathVariable Long id) {
        log.debug("REST request to delete Routine : {}", id);
        Routine routine = routineRepository.getOne(id);
        for (ExercisesSet set : routine.getExercisesSets())
        {
            exercisesSetRepository.deleteById(set.getId());
        }
        routine = routineRepository.getOne(id);
        routineRepository.save(routine);
        routineRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

}
