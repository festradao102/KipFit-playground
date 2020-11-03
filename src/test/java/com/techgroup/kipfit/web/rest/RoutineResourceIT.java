package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.KipfitApp;
import com.techgroup.kipfit.domain.Routine;
import com.techgroup.kipfit.repository.RoutineRepository;

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
 * Integration tests for the {@link RoutineResource} REST controller.
 */
@SpringBootTest(classes = KipfitApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RoutineResourceIT {

    private static final Integer DEFAULT_TYPE = 1;
    private static final Integer UPDATED_TYPE = 2;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_FREQ = "AAAAAAAAAA";
    private static final String UPDATED_FREQ = "BBBBBBBBBB";

    @Autowired
    private RoutineRepository routineRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRoutineMockMvc;

    private Routine routine;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Routine createEntity(EntityManager em) {
        Routine routine = new Routine()
            .type(DEFAULT_TYPE)
            .name(DEFAULT_NAME)
            .freq(DEFAULT_FREQ);
        return routine;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Routine createUpdatedEntity(EntityManager em) {
        Routine routine = new Routine()
            .type(UPDATED_TYPE)
            .name(UPDATED_NAME)
            .freq(UPDATED_FREQ);
        return routine;
    }

    @BeforeEach
    public void initTest() {
        routine = createEntity(em);
    }

    @Test
    @Transactional
    public void createRoutine() throws Exception {
        int databaseSizeBeforeCreate = routineRepository.findAll().size();
        // Create the Routine
        restRoutineMockMvc.perform(post("/api/routines")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(routine)))
            .andExpect(status().isCreated());

        // Validate the Routine in the database
        List<Routine> routineList = routineRepository.findAll();
        assertThat(routineList).hasSize(databaseSizeBeforeCreate + 1);
        Routine testRoutine = routineList.get(routineList.size() - 1);
        assertThat(testRoutine.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testRoutine.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRoutine.getFreq()).isEqualTo(DEFAULT_FREQ);
    }

    @Test
    @Transactional
    public void createRoutineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = routineRepository.findAll().size();

        // Create the Routine with an existing ID
        routine.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRoutineMockMvc.perform(post("/api/routines")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(routine)))
            .andExpect(status().isBadRequest());

        // Validate the Routine in the database
        List<Routine> routineList = routineRepository.findAll();
        assertThat(routineList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRoutines() throws Exception {
        // Initialize the database
        routineRepository.saveAndFlush(routine);

        // Get all the routineList
        restRoutineMockMvc.perform(get("/api/routines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(routine.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].freq").value(hasItem(DEFAULT_FREQ)));
    }
    
    @Test
    @Transactional
    public void getRoutine() throws Exception {
        // Initialize the database
        routineRepository.saveAndFlush(routine);

        // Get the routine
        restRoutineMockMvc.perform(get("/api/routines/{id}", routine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(routine.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.freq").value(DEFAULT_FREQ));
    }
    @Test
    @Transactional
    public void getNonExistingRoutine() throws Exception {
        // Get the routine
        restRoutineMockMvc.perform(get("/api/routines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRoutine() throws Exception {
        // Initialize the database
        routineRepository.saveAndFlush(routine);

        int databaseSizeBeforeUpdate = routineRepository.findAll().size();

        // Update the routine
        Routine updatedRoutine = routineRepository.findById(routine.getId()).get();
        // Disconnect from session so that the updates on updatedRoutine are not directly saved in db
        em.detach(updatedRoutine);
        updatedRoutine
            .type(UPDATED_TYPE)
            .name(UPDATED_NAME)
            .freq(UPDATED_FREQ);

        restRoutineMockMvc.perform(put("/api/routines")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRoutine)))
            .andExpect(status().isOk());

        // Validate the Routine in the database
        List<Routine> routineList = routineRepository.findAll();
        assertThat(routineList).hasSize(databaseSizeBeforeUpdate);
        Routine testRoutine = routineList.get(routineList.size() - 1);
        assertThat(testRoutine.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testRoutine.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRoutine.getFreq()).isEqualTo(UPDATED_FREQ);
    }

    @Test
    @Transactional
    public void updateNonExistingRoutine() throws Exception {
        int databaseSizeBeforeUpdate = routineRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRoutineMockMvc.perform(put("/api/routines")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(routine)))
            .andExpect(status().isBadRequest());

        // Validate the Routine in the database
        List<Routine> routineList = routineRepository.findAll();
        assertThat(routineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRoutine() throws Exception {
        // Initialize the database
        routineRepository.saveAndFlush(routine);

        int databaseSizeBeforeDelete = routineRepository.findAll().size();

        // Delete the routine
        restRoutineMockMvc.perform(delete("/api/routines/{id}", routine.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Routine> routineList = routineRepository.findAll();
        assertThat(routineList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
