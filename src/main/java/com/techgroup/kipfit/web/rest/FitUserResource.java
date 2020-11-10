package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.domain.Authority;
import com.techgroup.kipfit.domain.FitUser;
import com.techgroup.kipfit.domain.User;
import com.techgroup.kipfit.repository.FitUserRepository;
import com.techgroup.kipfit.repository.UserRepository;
import com.techgroup.kipfit.service.UserService;
import com.techgroup.kipfit.service.dto.UserDTO;
import com.techgroup.kipfit.web.rest.errors.BadRequestAlertException;

import com.techgroup.kipfit.web.rest.errors.EmailAlreadyUsedException;
import com.techgroup.kipfit.web.rest.errors.LoginAlreadyUsedException;
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
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing {@link com.techgroup.kipfit.domain.FitUser}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FitUserResource {

    private final Logger log = LoggerFactory.getLogger(FitUserResource.class);

    private static final String ENTITY_NAME = "fitUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FitUserRepository fitUserRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public FitUserResource(FitUserRepository fitUserRepository, UserRepository userRepository, UserService userService) {
        this.fitUserRepository = fitUserRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    /**
     * {@code POST  /fit-users} : Create a new fitUser.
     *
     * @param fitUser the fitUser to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fitUser, or with status {@code 400 (Bad Request)} if the fitUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fit-users")
    public ResponseEntity<FitUser> createFitUser(@RequestBody FitUser fitUser) throws URISyntaxException {
        log.debug("REST request to save FitUser : {}", fitUser);
        if (fitUser.getId() != null) {
            throw new BadRequestAlertException("A new fitUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FitUser result = fitUserRepository.save(fitUser);
        return ResponseEntity.created(new URI("/api/fit-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /fit-users} : Updates an existing fitUser.
     *
     * @param fitUser the fitUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fitUser,
     * or with status {@code 400 (Bad Request)} if the fitUser is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fitUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fit-users")
    public ResponseEntity<FitUser> updateFitUser(@RequestBody FitUser fitUser) throws URISyntaxException {
        log.debug("REST request to update FitUser : {}", fitUser);
        if (fitUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        if(fitUser.getUser() != null && fitUser.getUser().getId() != null){
            UserDTO updatedUser = new UserDTO();
            Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(fitUser.getUser().getEmail());

            if (existingUser.isPresent() && (!existingUser.get().getId().equals(fitUser.getUser().getId()))) {
                throw new EmailAlreadyUsedException();
            }

            updatedUser.setId(existingUser.get().getId());
            updatedUser.setLogin(existingUser.get().getLogin());
            updatedUser.setEmail(existingUser.get().getEmail());
            updatedUser.setFirstName(fitUser.getUser().getFirstName().equals("") ? existingUser.get().getFirstName() : fitUser.getUser().getFirstName());
            updatedUser.setLastName(fitUser.getUser().getLastName().equals("") ? existingUser.get().getLastName() : fitUser.getUser().getLastName());
            //updatedUser.setImageUrl(fitUser.getUser().getImageUrl().equals("") ? existingUser.get().getImageUrl() : fitUser.getUser().getImageUrl());
            updatedUser.setActivated(fitUser.getUser().getActivated() != existingUser.get().getActivated() ? fitUser.getUser().getActivated() : existingUser.get().getActivated());
            updatedUser.setLangKey(fitUser.getUser().getLangKey() == "" ? existingUser.get().getLangKey() : fitUser.getUser().getLangKey());
            updatedUser.setCreatedBy(fitUser.getUser().getCreatedBy() == "" ? existingUser.get().getCreatedBy() : fitUser.getUser().getCreatedBy());
            updatedUser.setCreatedDate(fitUser.getUser().getCreatedDate() == null ? existingUser.get().getCreatedDate() : fitUser.getUser().getCreatedDate());
            updatedUser.setLastModifiedDate(Instant.now());
            updatedUser.setAuthorities(existingUser.get().getAuthorities().stream()
                    .map(Authority::getName)
                    .collect(Collectors.toSet()));

            userService.updateUser(updatedUser);

            //fitUser.setUser(null);
        }

        FitUser result = fitUserRepository.save(fitUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fitUser.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /fit-users} : get all the fitUsers.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fitUsers in body.
     */
    @GetMapping("/fit-users")
    public List<FitUser> getAllFitUsers(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all FitUsers");
        return fitUserRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /fit-users/:id} : get the "id" fitUser.
     *
     * @param id the id of the fitUser to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fitUser, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fit-users/{id}")
    public ResponseEntity<FitUser> getFitUser(@PathVariable Long id) {
        log.debug("REST request to get FitUser : {}", id);
        Optional<FitUser> fitUser = fitUserRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(fitUser);
    }

    /**
     * {@code DELETE  /fit-users/:id} : delete the "id" fitUser.
     *
     * @param id the id of the fitUser to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fit-users/{id}")
    public ResponseEntity<Void> deleteFitUser(@PathVariable Long id) {
        log.debug("REST request to delete FitUser : {}", id);
        fitUserRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
