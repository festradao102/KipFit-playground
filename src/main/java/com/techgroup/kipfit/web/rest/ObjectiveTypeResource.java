package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.domain.ObjectiveType;
import com.techgroup.kipfit.repository.ObjectiveTypeRepository;
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
 * REST controller for managing {@link com.techgroup.kipfit.domain.ObjectiveType}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ObjectiveTypeResource {

    private final Logger log = LoggerFactory.getLogger(ObjectiveTypeResource.class);

    private static final String ENTITY_NAME = "objectiveType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ObjectiveTypeRepository objectiveTypeRepository;

    public ObjectiveTypeResource(ObjectiveTypeRepository objectiveTypeRepository) {
        this.objectiveTypeRepository = objectiveTypeRepository;
    }

    /**
     * {@code POST  /objective-types} : Create a new objectiveType.
     *
     * @param objectiveType the objectiveType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new objectiveType, or with status {@code 400 (Bad Request)} if the objectiveType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/objective-types")
    public ResponseEntity<ObjectiveType> createObjectiveType(@RequestBody ObjectiveType objectiveType) throws URISyntaxException {
        log.debug("REST request to save ObjectiveType : {}", objectiveType);
        if (objectiveType.getId() != null) {
            throw new BadRequestAlertException("A new objectiveType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ObjectiveType result = objectiveTypeRepository.save(objectiveType);
        return ResponseEntity.created(new URI("/api/objective-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /objective-types} : Updates an existing objectiveType.
     *
     * @param objectiveType the objectiveType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated objectiveType,
     * or with status {@code 400 (Bad Request)} if the objectiveType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the objectiveType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/objective-types")
    public ResponseEntity<ObjectiveType> updateObjectiveType(@RequestBody ObjectiveType objectiveType) throws URISyntaxException {
        log.debug("REST request to update ObjectiveType : {}", objectiveType);
        if (objectiveType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ObjectiveType result = objectiveTypeRepository.save(objectiveType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, objectiveType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /objective-types} : get all the objectiveTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of objectiveTypes in body.
     */
    @GetMapping("/objective-types")
    public List<ObjectiveType> getAllObjectiveTypes() {
        log.debug("REST request to get all ObjectiveTypes");
        return objectiveTypeRepository.findAll();
    }

    /**
     * {@code GET  /objective-types/:id} : get the "id" objectiveType.
     *
     * @param id the id of the objectiveType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the objectiveType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/objective-types/{id}")
    public ResponseEntity<ObjectiveType> getObjectiveType(@PathVariable Long id) {
        log.debug("REST request to get ObjectiveType : {}", id);
        Optional<ObjectiveType> objectiveType = objectiveTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(objectiveType);
    }

    /**
     * {@code DELETE  /objective-types/:id} : delete the "id" objectiveType.
     *
     * @param id the id of the objectiveType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/objective-types/{id}")
    public ResponseEntity<Void> deleteObjectiveType(@PathVariable Long id) {
        log.debug("REST request to delete ObjectiveType : {}", id);
        objectiveTypeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
