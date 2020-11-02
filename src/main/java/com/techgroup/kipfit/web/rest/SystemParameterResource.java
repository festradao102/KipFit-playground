package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.domain.SystemParameter;
import com.techgroup.kipfit.repository.SystemParameterRepository;
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
 * REST controller for managing {@link com.techgroup.kipfit.domain.SystemParameter}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SystemParameterResource {

    private final Logger log = LoggerFactory.getLogger(SystemParameterResource.class);

    private static final String ENTITY_NAME = "systemParameter";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SystemParameterRepository systemParameterRepository;

    public SystemParameterResource(SystemParameterRepository systemParameterRepository) {
        this.systemParameterRepository = systemParameterRepository;
    }

    /**
     * {@code POST  /system-parameters} : Create a new systemParameter.
     *
     * @param systemParameter the systemParameter to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new systemParameter, or with status {@code 400 (Bad Request)} if the systemParameter has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/system-parameters")
    public ResponseEntity<SystemParameter> createSystemParameter(@RequestBody SystemParameter systemParameter) throws URISyntaxException {
        log.debug("REST request to save SystemParameter : {}", systemParameter);
        if (systemParameter.getId() != null) {
            throw new BadRequestAlertException("A new systemParameter cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SystemParameter result = systemParameterRepository.save(systemParameter);
        return ResponseEntity.created(new URI("/api/system-parameters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /system-parameters} : Updates an existing systemParameter.
     *
     * @param systemParameter the systemParameter to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated systemParameter,
     * or with status {@code 400 (Bad Request)} if the systemParameter is not valid,
     * or with status {@code 500 (Internal Server Error)} if the systemParameter couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/system-parameters")
    public ResponseEntity<SystemParameter> updateSystemParameter(@RequestBody SystemParameter systemParameter) throws URISyntaxException {
        log.debug("REST request to update SystemParameter : {}", systemParameter);
        if (systemParameter.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SystemParameter result = systemParameterRepository.save(systemParameter);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, systemParameter.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /system-parameters} : get all the systemParameters.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of systemParameters in body.
     */
    @GetMapping("/system-parameters")
    public List<SystemParameter> getAllSystemParameters() {
        log.debug("REST request to get all SystemParameters");
        return systemParameterRepository.findAll();
    }

    /**
     * {@code GET  /system-parameters/:id} : get the "id" systemParameter.
     *
     * @param id the id of the systemParameter to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the systemParameter, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/system-parameters/{id}")
    public ResponseEntity<SystemParameter> getSystemParameter(@PathVariable Long id) {
        log.debug("REST request to get SystemParameter : {}", id);
        Optional<SystemParameter> systemParameter = systemParameterRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(systemParameter);
    }

    /**
     * {@code DELETE  /system-parameters/:id} : delete the "id" systemParameter.
     *
     * @param id the id of the systemParameter to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/system-parameters/{id}")
    public ResponseEntity<Void> deleteSystemParameter(@PathVariable Long id) {
        log.debug("REST request to delete SystemParameter : {}", id);
        systemParameterRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
