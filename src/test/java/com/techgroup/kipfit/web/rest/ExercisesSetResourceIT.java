package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.KipfitApp;
import com.techgroup.kipfit.domain.ExercisesSet;
import com.techgroup.kipfit.repository.ExercisesSetRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ExercisesSetResource} REST controller.
 */
@SpringBootTest(classes = KipfitApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class ExercisesSetResourceIT {

    private static final Integer DEFAULT_TYPE = 1;
    private static final Integer UPDATED_TYPE = 2;

    private static final Integer DEFAULT_REST_TIME = 1;
    private static final Integer UPDATED_REST_TIME = 2;

    @Autowired
    private ExercisesSetRepository exercisesSetRepository;

    @Mock
    private ExercisesSetRepository exercisesSetRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restExercisesSetMockMvc;

    private ExercisesSet exercisesSet;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExercisesSet createEntity(EntityManager em) {
        ExercisesSet exercisesSet = new ExercisesSet()
            .type(DEFAULT_TYPE)
            .restTime(DEFAULT_REST_TIME);
        return exercisesSet;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ExercisesSet createUpdatedEntity(EntityManager em) {
        ExercisesSet exercisesSet = new ExercisesSet()
            .type(UPDATED_TYPE)
            .restTime(UPDATED_REST_TIME);
        return exercisesSet;
    }

    @BeforeEach
    public void initTest() {
        exercisesSet = createEntity(em);
    }

    @Test
    @Transactional
    public void createExercisesSet() throws Exception {
        int databaseSizeBeforeCreate = exercisesSetRepository.findAll().size();
        // Create the ExercisesSet
        restExercisesSetMockMvc.perform(post("/api/exercises-sets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exercisesSet)))
            .andExpect(status().isCreated());

        // Validate the ExercisesSet in the database
        List<ExercisesSet> exercisesSetList = exercisesSetRepository.findAll();
        assertThat(exercisesSetList).hasSize(databaseSizeBeforeCreate + 1);
        ExercisesSet testExercisesSet = exercisesSetList.get(exercisesSetList.size() - 1);
        assertThat(testExercisesSet.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testExercisesSet.getRestTime()).isEqualTo(DEFAULT_REST_TIME);
    }

    @Test
    @Transactional
    public void createExercisesSetWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = exercisesSetRepository.findAll().size();

        // Create the ExercisesSet with an existing ID
        exercisesSet.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExercisesSetMockMvc.perform(post("/api/exercises-sets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exercisesSet)))
            .andExpect(status().isBadRequest());

        // Validate the ExercisesSet in the database
        List<ExercisesSet> exercisesSetList = exercisesSetRepository.findAll();
        assertThat(exercisesSetList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllExercisesSets() throws Exception {
        // Initialize the database
        exercisesSetRepository.saveAndFlush(exercisesSet);

        // Get all the exercisesSetList
        restExercisesSetMockMvc.perform(get("/api/exercises-sets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(exercisesSet.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].restTime").value(hasItem(DEFAULT_REST_TIME)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllExercisesSetsWithEagerRelationshipsIsEnabled() throws Exception {
        when(exercisesSetRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restExercisesSetMockMvc.perform(get("/api/exercises-sets?eagerload=true"))
            .andExpect(status().isOk());

        verify(exercisesSetRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllExercisesSetsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(exercisesSetRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restExercisesSetMockMvc.perform(get("/api/exercises-sets?eagerload=true"))
            .andExpect(status().isOk());

        verify(exercisesSetRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getExercisesSet() throws Exception {
        // Initialize the database
        exercisesSetRepository.saveAndFlush(exercisesSet);

        // Get the exercisesSet
        restExercisesSetMockMvc.perform(get("/api/exercises-sets/{id}", exercisesSet.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(exercisesSet.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.restTime").value(DEFAULT_REST_TIME));
    }
    @Test
    @Transactional
    public void getNonExistingExercisesSet() throws Exception {
        // Get the exercisesSet
        restExercisesSetMockMvc.perform(get("/api/exercises-sets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExercisesSet() throws Exception {
        // Initialize the database
        exercisesSetRepository.saveAndFlush(exercisesSet);

        int databaseSizeBeforeUpdate = exercisesSetRepository.findAll().size();

        // Update the exercisesSet
        ExercisesSet updatedExercisesSet = exercisesSetRepository.findById(exercisesSet.getId()).get();
        // Disconnect from session so that the updates on updatedExercisesSet are not directly saved in db
        em.detach(updatedExercisesSet);
        updatedExercisesSet
            .type(UPDATED_TYPE)
            .restTime(UPDATED_REST_TIME);

        restExercisesSetMockMvc.perform(put("/api/exercises-sets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedExercisesSet)))
            .andExpect(status().isOk());

        // Validate the ExercisesSet in the database
        List<ExercisesSet> exercisesSetList = exercisesSetRepository.findAll();
        assertThat(exercisesSetList).hasSize(databaseSizeBeforeUpdate);
        ExercisesSet testExercisesSet = exercisesSetList.get(exercisesSetList.size() - 1);
        assertThat(testExercisesSet.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testExercisesSet.getRestTime()).isEqualTo(UPDATED_REST_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingExercisesSet() throws Exception {
        int databaseSizeBeforeUpdate = exercisesSetRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExercisesSetMockMvc.perform(put("/api/exercises-sets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exercisesSet)))
            .andExpect(status().isBadRequest());

        // Validate the ExercisesSet in the database
        List<ExercisesSet> exercisesSetList = exercisesSetRepository.findAll();
        assertThat(exercisesSetList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExercisesSet() throws Exception {
        // Initialize the database
        exercisesSetRepository.saveAndFlush(exercisesSet);

        int databaseSizeBeforeDelete = exercisesSetRepository.findAll().size();

        // Delete the exercisesSet
        restExercisesSetMockMvc.perform(delete("/api/exercises-sets/{id}", exercisesSet.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ExercisesSet> exercisesSetList = exercisesSetRepository.findAll();
        assertThat(exercisesSetList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
