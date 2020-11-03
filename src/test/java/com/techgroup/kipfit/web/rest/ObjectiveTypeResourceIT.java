package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.KipfitApp;
import com.techgroup.kipfit.domain.ObjectiveType;
import com.techgroup.kipfit.repository.ObjectiveTypeRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ObjectiveTypeResource} REST controller.
 */
@SpringBootTest(classes = KipfitApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ObjectiveTypeResourceIT {

    private static final String DEFAULT_OBJECTIVE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_OBJECTIVE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private ObjectiveTypeRepository objectiveTypeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restObjectiveTypeMockMvc;

    private ObjectiveType objectiveType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ObjectiveType createEntity(EntityManager em) {
        ObjectiveType objectiveType = new ObjectiveType()
            .objectiveName(DEFAULT_OBJECTIVE_NAME)
            .description(DEFAULT_DESCRIPTION);
        return objectiveType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ObjectiveType createUpdatedEntity(EntityManager em) {
        ObjectiveType objectiveType = new ObjectiveType()
            .objectiveName(UPDATED_OBJECTIVE_NAME)
            .description(UPDATED_DESCRIPTION);
        return objectiveType;
    }

    @BeforeEach
    public void initTest() {
        objectiveType = createEntity(em);
    }

    @Test
    @Transactional
    public void createObjectiveType() throws Exception {
        int databaseSizeBeforeCreate = objectiveTypeRepository.findAll().size();
        // Create the ObjectiveType
        restObjectiveTypeMockMvc.perform(post("/api/objective-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(objectiveType)))
            .andExpect(status().isCreated());

        // Validate the ObjectiveType in the database
        List<ObjectiveType> objectiveTypeList = objectiveTypeRepository.findAll();
        assertThat(objectiveTypeList).hasSize(databaseSizeBeforeCreate + 1);
        ObjectiveType testObjectiveType = objectiveTypeList.get(objectiveTypeList.size() - 1);
        assertThat(testObjectiveType.getObjectiveName()).isEqualTo(DEFAULT_OBJECTIVE_NAME);
        assertThat(testObjectiveType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createObjectiveTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = objectiveTypeRepository.findAll().size();

        // Create the ObjectiveType with an existing ID
        objectiveType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restObjectiveTypeMockMvc.perform(post("/api/objective-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(objectiveType)))
            .andExpect(status().isBadRequest());

        // Validate the ObjectiveType in the database
        List<ObjectiveType> objectiveTypeList = objectiveTypeRepository.findAll();
        assertThat(objectiveTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllObjectiveTypes() throws Exception {
        // Initialize the database
        objectiveTypeRepository.saveAndFlush(objectiveType);

        // Get all the objectiveTypeList
        restObjectiveTypeMockMvc.perform(get("/api/objective-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(objectiveType.getId().intValue())))
            .andExpect(jsonPath("$.[*].objectiveName").value(hasItem(DEFAULT_OBJECTIVE_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getObjectiveType() throws Exception {
        // Initialize the database
        objectiveTypeRepository.saveAndFlush(objectiveType);

        // Get the objectiveType
        restObjectiveTypeMockMvc.perform(get("/api/objective-types/{id}", objectiveType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(objectiveType.getId().intValue()))
            .andExpect(jsonPath("$.objectiveName").value(DEFAULT_OBJECTIVE_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }
    @Test
    @Transactional
    public void getNonExistingObjectiveType() throws Exception {
        // Get the objectiveType
        restObjectiveTypeMockMvc.perform(get("/api/objective-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateObjectiveType() throws Exception {
        // Initialize the database
        objectiveTypeRepository.saveAndFlush(objectiveType);

        int databaseSizeBeforeUpdate = objectiveTypeRepository.findAll().size();

        // Update the objectiveType
        ObjectiveType updatedObjectiveType = objectiveTypeRepository.findById(objectiveType.getId()).get();
        // Disconnect from session so that the updates on updatedObjectiveType are not directly saved in db
        em.detach(updatedObjectiveType);
        updatedObjectiveType
            .objectiveName(UPDATED_OBJECTIVE_NAME)
            .description(UPDATED_DESCRIPTION);

        restObjectiveTypeMockMvc.perform(put("/api/objective-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedObjectiveType)))
            .andExpect(status().isOk());

        // Validate the ObjectiveType in the database
        List<ObjectiveType> objectiveTypeList = objectiveTypeRepository.findAll();
        assertThat(objectiveTypeList).hasSize(databaseSizeBeforeUpdate);
        ObjectiveType testObjectiveType = objectiveTypeList.get(objectiveTypeList.size() - 1);
        assertThat(testObjectiveType.getObjectiveName()).isEqualTo(UPDATED_OBJECTIVE_NAME);
        assertThat(testObjectiveType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingObjectiveType() throws Exception {
        int databaseSizeBeforeUpdate = objectiveTypeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restObjectiveTypeMockMvc.perform(put("/api/objective-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(objectiveType)))
            .andExpect(status().isBadRequest());

        // Validate the ObjectiveType in the database
        List<ObjectiveType> objectiveTypeList = objectiveTypeRepository.findAll();
        assertThat(objectiveTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteObjectiveType() throws Exception {
        // Initialize the database
        objectiveTypeRepository.saveAndFlush(objectiveType);

        int databaseSizeBeforeDelete = objectiveTypeRepository.findAll().size();

        // Delete the objectiveType
        restObjectiveTypeMockMvc.perform(delete("/api/objective-types/{id}", objectiveType.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ObjectiveType> objectiveTypeList = objectiveTypeRepository.findAll();
        assertThat(objectiveTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
