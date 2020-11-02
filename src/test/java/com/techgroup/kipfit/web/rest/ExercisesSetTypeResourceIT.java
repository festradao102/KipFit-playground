package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.KipfitApp;
import com.techgroup.kipfit.domain.ExercisesSetType;
import com.techgroup.kipfit.repository.ExercisesSetTypeRepository;

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

import com.techgroup.kipfit.domain.enumeration.ExercisesSetTypeName;
/**
 * Integration tests for the {@link ExercisesSetTypeResource} REST controller.
 */
@SpringBootTest(classes = KipfitApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ExercisesSetTypeResourceIT {

    private static final ExercisesSetTypeName DEFAULT_TYPE_NAME = ExercisesSetTypeName.SUPERIOR;
    private static final ExercisesSetTypeName UPDATED_TYPE_NAME = ExercisesSetTypeName.INFERIOR;

    @Autowired
    private ExercisesSetTypeRepository exercisesSetTypeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restExercisesSetTypeMockMvc;

    private ExercisesSetType exercisesSetType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExercisesSetType createEntity(EntityManager em) {
        ExercisesSetType exercisesSetType = new ExercisesSetType()
            .typeName(DEFAULT_TYPE_NAME);
        return exercisesSetType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExercisesSetType createUpdatedEntity(EntityManager em) {
        ExercisesSetType exercisesSetType = new ExercisesSetType()
            .typeName(UPDATED_TYPE_NAME);
        return exercisesSetType;
    }

    @BeforeEach
    public void initTest() {
        exercisesSetType = createEntity(em);
    }

    @Test
    @Transactional
    public void createExercisesSetType() throws Exception {
        int databaseSizeBeforeCreate = exercisesSetTypeRepository.findAll().size();
        // Create the ExercisesSetType
        restExercisesSetTypeMockMvc.perform(post("/api/exercises-set-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exercisesSetType)))
            .andExpect(status().isCreated());

        // Validate the ExercisesSetType in the database
        List<ExercisesSetType> exercisesSetTypeList = exercisesSetTypeRepository.findAll();
        assertThat(exercisesSetTypeList).hasSize(databaseSizeBeforeCreate + 1);
        ExercisesSetType testExercisesSetType = exercisesSetTypeList.get(exercisesSetTypeList.size() - 1);
        assertThat(testExercisesSetType.getTypeName()).isEqualTo(DEFAULT_TYPE_NAME);
    }

    @Test
    @Transactional
    public void createExercisesSetTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = exercisesSetTypeRepository.findAll().size();

        // Create the ExercisesSetType with an existing ID
        exercisesSetType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExercisesSetTypeMockMvc.perform(post("/api/exercises-set-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exercisesSetType)))
            .andExpect(status().isBadRequest());

        // Validate the ExercisesSetType in the database
        List<ExercisesSetType> exercisesSetTypeList = exercisesSetTypeRepository.findAll();
        assertThat(exercisesSetTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllExercisesSetTypes() throws Exception {
        // Initialize the database
        exercisesSetTypeRepository.saveAndFlush(exercisesSetType);

        // Get all the exercisesSetTypeList
        restExercisesSetTypeMockMvc.perform(get("/api/exercises-set-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(exercisesSetType.getId().intValue())))
            .andExpect(jsonPath("$.[*].typeName").value(hasItem(DEFAULT_TYPE_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getExercisesSetType() throws Exception {
        // Initialize the database
        exercisesSetTypeRepository.saveAndFlush(exercisesSetType);

        // Get the exercisesSetType
        restExercisesSetTypeMockMvc.perform(get("/api/exercises-set-types/{id}", exercisesSetType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(exercisesSetType.getId().intValue()))
            .andExpect(jsonPath("$.typeName").value(DEFAULT_TYPE_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingExercisesSetType() throws Exception {
        // Get the exercisesSetType
        restExercisesSetTypeMockMvc.perform(get("/api/exercises-set-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExercisesSetType() throws Exception {
        // Initialize the database
        exercisesSetTypeRepository.saveAndFlush(exercisesSetType);

        int databaseSizeBeforeUpdate = exercisesSetTypeRepository.findAll().size();

        // Update the exercisesSetType
        ExercisesSetType updatedExercisesSetType = exercisesSetTypeRepository.findById(exercisesSetType.getId()).get();
        // Disconnect from session so that the updates on updatedExercisesSetType are not directly saved in db
        em.detach(updatedExercisesSetType);
        updatedExercisesSetType
            .typeName(UPDATED_TYPE_NAME);

        restExercisesSetTypeMockMvc.perform(put("/api/exercises-set-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedExercisesSetType)))
            .andExpect(status().isOk());

        // Validate the ExercisesSetType in the database
        List<ExercisesSetType> exercisesSetTypeList = exercisesSetTypeRepository.findAll();
        assertThat(exercisesSetTypeList).hasSize(databaseSizeBeforeUpdate);
        ExercisesSetType testExercisesSetType = exercisesSetTypeList.get(exercisesSetTypeList.size() - 1);
        assertThat(testExercisesSetType.getTypeName()).isEqualTo(UPDATED_TYPE_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingExercisesSetType() throws Exception {
        int databaseSizeBeforeUpdate = exercisesSetTypeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExercisesSetTypeMockMvc.perform(put("/api/exercises-set-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exercisesSetType)))
            .andExpect(status().isBadRequest());

        // Validate the ExercisesSetType in the database
        List<ExercisesSetType> exercisesSetTypeList = exercisesSetTypeRepository.findAll();
        assertThat(exercisesSetTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExercisesSetType() throws Exception {
        // Initialize the database
        exercisesSetTypeRepository.saveAndFlush(exercisesSetType);

        int databaseSizeBeforeDelete = exercisesSetTypeRepository.findAll().size();

        // Delete the exercisesSetType
        restExercisesSetTypeMockMvc.perform(delete("/api/exercises-set-types/{id}", exercisesSetType.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ExercisesSetType> exercisesSetTypeList = exercisesSetTypeRepository.findAll();
        assertThat(exercisesSetTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
