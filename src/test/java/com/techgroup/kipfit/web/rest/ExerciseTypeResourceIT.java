package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.KipfitApp;
import com.techgroup.kipfit.domain.ExerciseType;
import com.techgroup.kipfit.repository.ExerciseTypeRepository;

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
 * Integration tests for the {@link ExerciseTypeResource} REST controller.
 */
@SpringBootTest(classes = KipfitApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ExerciseTypeResourceIT {

    private static final ExercisesSetTypeName DEFAULT_TYPE_NAME = ExercisesSetTypeName.SUPERIOR;
    private static final ExercisesSetTypeName UPDATED_TYPE_NAME = ExercisesSetTypeName.INFERIOR;

    @Autowired
    private ExerciseTypeRepository exerciseTypeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restExerciseTypeMockMvc;

    private ExerciseType exerciseType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExerciseType createEntity(EntityManager em) {
        ExerciseType exerciseType = new ExerciseType()
            .typeName(DEFAULT_TYPE_NAME);
        return exerciseType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExerciseType createUpdatedEntity(EntityManager em) {
        ExerciseType exerciseType = new ExerciseType()
            .typeName(UPDATED_TYPE_NAME);
        return exerciseType;
    }

    @BeforeEach
    public void initTest() {
        exerciseType = createEntity(em);
    }

    @Test
    @Transactional
    public void createExerciseType() throws Exception {
        int databaseSizeBeforeCreate = exerciseTypeRepository.findAll().size();
        // Create the ExerciseType
        restExerciseTypeMockMvc.perform(post("/api/exercise-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exerciseType)))
            .andExpect(status().isCreated());

        // Validate the ExerciseType in the database
        List<ExerciseType> exerciseTypeList = exerciseTypeRepository.findAll();
        assertThat(exerciseTypeList).hasSize(databaseSizeBeforeCreate + 1);
        ExerciseType testExerciseType = exerciseTypeList.get(exerciseTypeList.size() - 1);
        assertThat(testExerciseType.getTypeName()).isEqualTo(DEFAULT_TYPE_NAME);
    }

    @Test
    @Transactional
    public void createExerciseTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = exerciseTypeRepository.findAll().size();

        // Create the ExerciseType with an existing ID
        exerciseType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExerciseTypeMockMvc.perform(post("/api/exercise-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exerciseType)))
            .andExpect(status().isBadRequest());

        // Validate the ExerciseType in the database
        List<ExerciseType> exerciseTypeList = exerciseTypeRepository.findAll();
        assertThat(exerciseTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllExerciseTypes() throws Exception {
        // Initialize the database
        exerciseTypeRepository.saveAndFlush(exerciseType);

        // Get all the exerciseTypeList
        restExerciseTypeMockMvc.perform(get("/api/exercise-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(exerciseType.getId().intValue())))
            .andExpect(jsonPath("$.[*].typeName").value(hasItem(DEFAULT_TYPE_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getExerciseType() throws Exception {
        // Initialize the database
        exerciseTypeRepository.saveAndFlush(exerciseType);

        // Get the exerciseType
        restExerciseTypeMockMvc.perform(get("/api/exercise-types/{id}", exerciseType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(exerciseType.getId().intValue()))
            .andExpect(jsonPath("$.typeName").value(DEFAULT_TYPE_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingExerciseType() throws Exception {
        // Get the exerciseType
        restExerciseTypeMockMvc.perform(get("/api/exercise-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExerciseType() throws Exception {
        // Initialize the database
        exerciseTypeRepository.saveAndFlush(exerciseType);

        int databaseSizeBeforeUpdate = exerciseTypeRepository.findAll().size();

        // Update the exerciseType
        ExerciseType updatedExerciseType = exerciseTypeRepository.findById(exerciseType.getId()).get();
        // Disconnect from session so that the updates on updatedExerciseType are not directly saved in db
        em.detach(updatedExerciseType);
        updatedExerciseType
            .typeName(UPDATED_TYPE_NAME);

        restExerciseTypeMockMvc.perform(put("/api/exercise-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedExerciseType)))
            .andExpect(status().isOk());

        // Validate the ExerciseType in the database
        List<ExerciseType> exerciseTypeList = exerciseTypeRepository.findAll();
        assertThat(exerciseTypeList).hasSize(databaseSizeBeforeUpdate);
        ExerciseType testExerciseType = exerciseTypeList.get(exerciseTypeList.size() - 1);
        assertThat(testExerciseType.getTypeName()).isEqualTo(UPDATED_TYPE_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingExerciseType() throws Exception {
        int databaseSizeBeforeUpdate = exerciseTypeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExerciseTypeMockMvc.perform(put("/api/exercise-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exerciseType)))
            .andExpect(status().isBadRequest());

        // Validate the ExerciseType in the database
        List<ExerciseType> exerciseTypeList = exerciseTypeRepository.findAll();
        assertThat(exerciseTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExerciseType() throws Exception {
        // Initialize the database
        exerciseTypeRepository.saveAndFlush(exerciseType);

        int databaseSizeBeforeDelete = exerciseTypeRepository.findAll().size();

        // Delete the exerciseType
        restExerciseTypeMockMvc.perform(delete("/api/exercise-types/{id}", exerciseType.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ExerciseType> exerciseTypeList = exerciseTypeRepository.findAll();
        assertThat(exerciseTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
