package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.KipfitApp;
import com.techgroup.kipfit.domain.GuidedTraining;
import com.techgroup.kipfit.repository.GuidedTrainingRepository;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link GuidedTrainingResource} REST controller.
 */
@SpringBootTest(classes = KipfitApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class GuidedTrainingResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_TRAINER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TRAINER_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_CAPACITY = 1;
    private static final Integer UPDATED_CAPACITY = 2;

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_ACTIVE_STATE = false;
    private static final Boolean UPDATED_ACTIVE_STATE = true;

    @Autowired
    private GuidedTrainingRepository guidedTrainingRepository;

    @Mock
    private GuidedTrainingRepository guidedTrainingRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGuidedTrainingMockMvc;

    private GuidedTraining guidedTraining;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GuidedTraining createEntity(EntityManager em) {
        GuidedTraining guidedTraining = new GuidedTraining()
            .name(DEFAULT_NAME)
            .trainerName(DEFAULT_TRAINER_NAME)
            .capacity(DEFAULT_CAPACITY)
            .date(DEFAULT_DATE)
            .activeState(DEFAULT_ACTIVE_STATE);
        return guidedTraining;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GuidedTraining createUpdatedEntity(EntityManager em) {
        GuidedTraining guidedTraining = new GuidedTraining()
            .name(UPDATED_NAME)
            .trainerName(UPDATED_TRAINER_NAME)
            .capacity(UPDATED_CAPACITY)
            .date(UPDATED_DATE)
            .activeState(UPDATED_ACTIVE_STATE);
        return guidedTraining;
    }

    @BeforeEach
    public void initTest() {
        guidedTraining = createEntity(em);
    }

    @Test
    @Transactional
    public void createGuidedTraining() throws Exception {
        int databaseSizeBeforeCreate = guidedTrainingRepository.findAll().size();
        // Create the GuidedTraining
        restGuidedTrainingMockMvc.perform(post("/api/guided-trainings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(guidedTraining)))
            .andExpect(status().isCreated());

        // Validate the GuidedTraining in the database
        List<GuidedTraining> guidedTrainingList = guidedTrainingRepository.findAll();
        assertThat(guidedTrainingList).hasSize(databaseSizeBeforeCreate + 1);
        GuidedTraining testGuidedTraining = guidedTrainingList.get(guidedTrainingList.size() - 1);
        assertThat(testGuidedTraining.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGuidedTraining.getTrainerName()).isEqualTo(DEFAULT_TRAINER_NAME);
        assertThat(testGuidedTraining.getCapacity()).isEqualTo(DEFAULT_CAPACITY);
        assertThat(testGuidedTraining.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testGuidedTraining.isActiveState()).isEqualTo(DEFAULT_ACTIVE_STATE);
    }

    @Test
    @Transactional
    public void createGuidedTrainingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = guidedTrainingRepository.findAll().size();

        // Create the GuidedTraining with an existing ID
        guidedTraining.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGuidedTrainingMockMvc.perform(post("/api/guided-trainings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(guidedTraining)))
            .andExpect(status().isBadRequest());

        // Validate the GuidedTraining in the database
        List<GuidedTraining> guidedTrainingList = guidedTrainingRepository.findAll();
        assertThat(guidedTrainingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGuidedTrainings() throws Exception {
        // Initialize the database
        guidedTrainingRepository.saveAndFlush(guidedTraining);

        // Get all the guidedTrainingList
        restGuidedTrainingMockMvc.perform(get("/api/guided-trainings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(guidedTraining.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].trainerName").value(hasItem(DEFAULT_TRAINER_NAME)))
            .andExpect(jsonPath("$.[*].capacity").value(hasItem(DEFAULT_CAPACITY)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].activeState").value(hasItem(DEFAULT_ACTIVE_STATE.booleanValue())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllGuidedTrainingsWithEagerRelationshipsIsEnabled() throws Exception {
        when(guidedTrainingRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restGuidedTrainingMockMvc.perform(get("/api/guided-trainings?eagerload=true"))
            .andExpect(status().isOk());

        verify(guidedTrainingRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllGuidedTrainingsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(guidedTrainingRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restGuidedTrainingMockMvc.perform(get("/api/guided-trainings?eagerload=true"))
            .andExpect(status().isOk());

        verify(guidedTrainingRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getGuidedTraining() throws Exception {
        // Initialize the database
        guidedTrainingRepository.saveAndFlush(guidedTraining);

        // Get the guidedTraining
        restGuidedTrainingMockMvc.perform(get("/api/guided-trainings/{id}", guidedTraining.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(guidedTraining.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.trainerName").value(DEFAULT_TRAINER_NAME))
            .andExpect(jsonPath("$.capacity").value(DEFAULT_CAPACITY))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.activeState").value(DEFAULT_ACTIVE_STATE.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingGuidedTraining() throws Exception {
        // Get the guidedTraining
        restGuidedTrainingMockMvc.perform(get("/api/guided-trainings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGuidedTraining() throws Exception {
        // Initialize the database
        guidedTrainingRepository.saveAndFlush(guidedTraining);

        int databaseSizeBeforeUpdate = guidedTrainingRepository.findAll().size();

        // Update the guidedTraining
        GuidedTraining updatedGuidedTraining = guidedTrainingRepository.findById(guidedTraining.getId()).get();
        // Disconnect from session so that the updates on updatedGuidedTraining are not directly saved in db
        em.detach(updatedGuidedTraining);
        updatedGuidedTraining
            .name(UPDATED_NAME)
            .trainerName(UPDATED_TRAINER_NAME)
            .capacity(UPDATED_CAPACITY)
            .date(UPDATED_DATE)
            .activeState(UPDATED_ACTIVE_STATE);

        restGuidedTrainingMockMvc.perform(put("/api/guided-trainings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGuidedTraining)))
            .andExpect(status().isOk());

        // Validate the GuidedTraining in the database
        List<GuidedTraining> guidedTrainingList = guidedTrainingRepository.findAll();
        assertThat(guidedTrainingList).hasSize(databaseSizeBeforeUpdate);
        GuidedTraining testGuidedTraining = guidedTrainingList.get(guidedTrainingList.size() - 1);
        assertThat(testGuidedTraining.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGuidedTraining.getTrainerName()).isEqualTo(UPDATED_TRAINER_NAME);
        assertThat(testGuidedTraining.getCapacity()).isEqualTo(UPDATED_CAPACITY);
        assertThat(testGuidedTraining.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testGuidedTraining.isActiveState()).isEqualTo(UPDATED_ACTIVE_STATE);
    }

    @Test
    @Transactional
    public void updateNonExistingGuidedTraining() throws Exception {
        int databaseSizeBeforeUpdate = guidedTrainingRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGuidedTrainingMockMvc.perform(put("/api/guided-trainings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(guidedTraining)))
            .andExpect(status().isBadRequest());

        // Validate the GuidedTraining in the database
        List<GuidedTraining> guidedTrainingList = guidedTrainingRepository.findAll();
        assertThat(guidedTrainingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGuidedTraining() throws Exception {
        // Initialize the database
        guidedTrainingRepository.saveAndFlush(guidedTraining);

        int databaseSizeBeforeDelete = guidedTrainingRepository.findAll().size();

        // Delete the guidedTraining
        restGuidedTrainingMockMvc.perform(delete("/api/guided-trainings/{id}", guidedTraining.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GuidedTraining> guidedTrainingList = guidedTrainingRepository.findAll();
        assertThat(guidedTrainingList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
