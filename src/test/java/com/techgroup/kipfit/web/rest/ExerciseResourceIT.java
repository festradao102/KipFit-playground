package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.KipfitApp;
import com.techgroup.kipfit.domain.Exercise;
import com.techgroup.kipfit.repository.ExerciseRepository;

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
 * Integration tests for the {@link ExerciseResource} REST controller.
 */
@SpringBootTest(classes = KipfitApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ExerciseResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_POSITION = "AAAAAAAAAA";
    private static final String UPDATED_POSITION = "BBBBBBBBBB";

    private static final String DEFAULT_INSTRUCTIONS = "AAAAAAAAAA";
    private static final String UPDATED_INSTRUCTIONS = "BBBBBBBBBB";

    private static final String DEFAULT_VIDEO_PATH = "AAAAAAAAAA";
    private static final String UPDATED_VIDEO_PATH = "BBBBBBBBBB";

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restExerciseMockMvc;

    private Exercise exercise;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Exercise createEntity(EntityManager em) {
        Exercise exercise = new Exercise()
            .name(DEFAULT_NAME)
            .position(DEFAULT_POSITION)
            .instructions(DEFAULT_INSTRUCTIONS)
            .videoPath(DEFAULT_VIDEO_PATH);
        return exercise;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Exercise createUpdatedEntity(EntityManager em) {
        Exercise exercise = new Exercise()
            .name(UPDATED_NAME)
            .position(UPDATED_POSITION)
            .instructions(UPDATED_INSTRUCTIONS)
            .videoPath(UPDATED_VIDEO_PATH);
        return exercise;
    }

    @BeforeEach
    public void initTest() {
        exercise = createEntity(em);
    }

    @Test
    @Transactional
    public void createExercise() throws Exception {
        int databaseSizeBeforeCreate = exerciseRepository.findAll().size();
        // Create the Exercise
        restExerciseMockMvc.perform(post("/api/exercises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exercise)))
            .andExpect(status().isCreated());

        // Validate the Exercise in the database
        List<Exercise> exerciseList = exerciseRepository.findAll();
        assertThat(exerciseList).hasSize(databaseSizeBeforeCreate + 1);
        Exercise testExercise = exerciseList.get(exerciseList.size() - 1);
        assertThat(testExercise.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testExercise.getPosition()).isEqualTo(DEFAULT_POSITION);
        assertThat(testExercise.getInstructions()).isEqualTo(DEFAULT_INSTRUCTIONS);
        assertThat(testExercise.getVideoPath()).isEqualTo(DEFAULT_VIDEO_PATH);
    }

    @Test
    @Transactional
    public void createExerciseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = exerciseRepository.findAll().size();

        // Create the Exercise with an existing ID
        exercise.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExerciseMockMvc.perform(post("/api/exercises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exercise)))
            .andExpect(status().isBadRequest());

        // Validate the Exercise in the database
        List<Exercise> exerciseList = exerciseRepository.findAll();
        assertThat(exerciseList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllExercises() throws Exception {
        // Initialize the database
        exerciseRepository.saveAndFlush(exercise);

        // Get all the exerciseList
        restExerciseMockMvc.perform(get("/api/exercises?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(exercise.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].position").value(hasItem(DEFAULT_POSITION)))
            .andExpect(jsonPath("$.[*].instructions").value(hasItem(DEFAULT_INSTRUCTIONS)))
            .andExpect(jsonPath("$.[*].videoPath").value(hasItem(DEFAULT_VIDEO_PATH)));
    }
    
    @Test
    @Transactional
    public void getExercise() throws Exception {
        // Initialize the database
        exerciseRepository.saveAndFlush(exercise);

        // Get the exercise
        restExerciseMockMvc.perform(get("/api/exercises/{id}", exercise.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(exercise.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.position").value(DEFAULT_POSITION))
            .andExpect(jsonPath("$.instructions").value(DEFAULT_INSTRUCTIONS))
            .andExpect(jsonPath("$.videoPath").value(DEFAULT_VIDEO_PATH));
    }
    @Test
    @Transactional
    public void getNonExistingExercise() throws Exception {
        // Get the exercise
        restExerciseMockMvc.perform(get("/api/exercises/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExercise() throws Exception {
        // Initialize the database
        exerciseRepository.saveAndFlush(exercise);

        int databaseSizeBeforeUpdate = exerciseRepository.findAll().size();

        // Update the exercise
        Exercise updatedExercise = exerciseRepository.findById(exercise.getId()).get();
        // Disconnect from session so that the updates on updatedExercise are not directly saved in db
        em.detach(updatedExercise);
        updatedExercise
            .name(UPDATED_NAME)
            .position(UPDATED_POSITION)
            .instructions(UPDATED_INSTRUCTIONS)
            .videoPath(UPDATED_VIDEO_PATH);

        restExerciseMockMvc.perform(put("/api/exercises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedExercise)))
            .andExpect(status().isOk());

        // Validate the Exercise in the database
        List<Exercise> exerciseList = exerciseRepository.findAll();
        assertThat(exerciseList).hasSize(databaseSizeBeforeUpdate);
        Exercise testExercise = exerciseList.get(exerciseList.size() - 1);
        assertThat(testExercise.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testExercise.getPosition()).isEqualTo(UPDATED_POSITION);
        assertThat(testExercise.getInstructions()).isEqualTo(UPDATED_INSTRUCTIONS);
        assertThat(testExercise.getVideoPath()).isEqualTo(UPDATED_VIDEO_PATH);
    }

    @Test
    @Transactional
    public void updateNonExistingExercise() throws Exception {
        int databaseSizeBeforeUpdate = exerciseRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExerciseMockMvc.perform(put("/api/exercises")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exercise)))
            .andExpect(status().isBadRequest());

        // Validate the Exercise in the database
        List<Exercise> exerciseList = exerciseRepository.findAll();
        assertThat(exerciseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExercise() throws Exception {
        // Initialize the database
        exerciseRepository.saveAndFlush(exercise);

        int databaseSizeBeforeDelete = exerciseRepository.findAll().size();

        // Delete the exercise
        restExerciseMockMvc.perform(delete("/api/exercises/{id}", exercise.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Exercise> exerciseList = exerciseRepository.findAll();
        assertThat(exerciseList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
