package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.KipfitApp;
import com.techgroup.kipfit.domain.Plan;
import com.techgroup.kipfit.repository.PlanRepository;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PlanResource} REST controller.
 */
@SpringBootTest(classes = KipfitApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PlanResourceIT {

    private static final String DEFAULT_OBJECTIVE = "AAAAAAAAAA";
    private static final String UPDATED_OBJECTIVE = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CREATOR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CREATOR_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    @Autowired
    private PlanRepository planRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPlanMockMvc;

    private Plan plan;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Plan createEntity(EntityManager em) {
        Plan plan = new Plan()
            .objective(DEFAULT_OBJECTIVE)
            .dateCreated(DEFAULT_DATE_CREATED)
            .creatorName(DEFAULT_CREATOR_NAME)
            .active(DEFAULT_ACTIVE);
        return plan;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Plan createUpdatedEntity(EntityManager em) {
        Plan plan = new Plan()
            .objective(UPDATED_OBJECTIVE)
            .dateCreated(UPDATED_DATE_CREATED)
            .creatorName(UPDATED_CREATOR_NAME)
            .active(UPDATED_ACTIVE);
        return plan;
    }

    @BeforeEach
    public void initTest() {
        plan = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlan() throws Exception {
        int databaseSizeBeforeCreate = planRepository.findAll().size();
        // Create the Plan
        restPlanMockMvc.perform(post("/api/plans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plan)))
            .andExpect(status().isCreated());

        // Validate the Plan in the database
        List<Plan> planList = planRepository.findAll();
        assertThat(planList).hasSize(databaseSizeBeforeCreate + 1);
        Plan testPlan = planList.get(planList.size() - 1);
        assertThat(testPlan.getObjective()).isEqualTo(DEFAULT_OBJECTIVE);
        assertThat(testPlan.getDateCreated()).isEqualTo(DEFAULT_DATE_CREATED);
        assertThat(testPlan.getCreatorName()).isEqualTo(DEFAULT_CREATOR_NAME);
        assertThat(testPlan.isActive()).isEqualTo(DEFAULT_ACTIVE);
    }

    @Test
    @Transactional
    public void createPlanWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = planRepository.findAll().size();

        // Create the Plan with an existing ID
        plan.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlanMockMvc.perform(post("/api/plans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plan)))
            .andExpect(status().isBadRequest());

        // Validate the Plan in the database
        List<Plan> planList = planRepository.findAll();
        assertThat(planList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPlans() throws Exception {
        // Initialize the database
        planRepository.saveAndFlush(plan);

        // Get all the planList
        restPlanMockMvc.perform(get("/api/plans?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(plan.getId().intValue())))
            .andExpect(jsonPath("$.[*].objective").value(hasItem(DEFAULT_OBJECTIVE)))
            .andExpect(jsonPath("$.[*].dateCreated").value(hasItem(DEFAULT_DATE_CREATED.toString())))
            .andExpect(jsonPath("$.[*].creatorName").value(hasItem(DEFAULT_CREATOR_NAME)))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getPlan() throws Exception {
        // Initialize the database
        planRepository.saveAndFlush(plan);

        // Get the plan
        restPlanMockMvc.perform(get("/api/plans/{id}", plan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(plan.getId().intValue()))
            .andExpect(jsonPath("$.objective").value(DEFAULT_OBJECTIVE))
            .andExpect(jsonPath("$.dateCreated").value(DEFAULT_DATE_CREATED.toString()))
            .andExpect(jsonPath("$.creatorName").value(DEFAULT_CREATOR_NAME))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingPlan() throws Exception {
        // Get the plan
        restPlanMockMvc.perform(get("/api/plans/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlan() throws Exception {
        // Initialize the database
        planRepository.saveAndFlush(plan);

        int databaseSizeBeforeUpdate = planRepository.findAll().size();

        // Update the plan
        Plan updatedPlan = planRepository.findById(plan.getId()).get();
        // Disconnect from session so that the updates on updatedPlan are not directly saved in db
        em.detach(updatedPlan);
        updatedPlan
            .objective(UPDATED_OBJECTIVE)
            .dateCreated(UPDATED_DATE_CREATED)
            .creatorName(UPDATED_CREATOR_NAME)
            .active(UPDATED_ACTIVE);

        restPlanMockMvc.perform(put("/api/plans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlan)))
            .andExpect(status().isOk());

        // Validate the Plan in the database
        List<Plan> planList = planRepository.findAll();
        assertThat(planList).hasSize(databaseSizeBeforeUpdate);
        Plan testPlan = planList.get(planList.size() - 1);
        assertThat(testPlan.getObjective()).isEqualTo(UPDATED_OBJECTIVE);
        assertThat(testPlan.getDateCreated()).isEqualTo(UPDATED_DATE_CREATED);
        assertThat(testPlan.getCreatorName()).isEqualTo(UPDATED_CREATOR_NAME);
        assertThat(testPlan.isActive()).isEqualTo(UPDATED_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingPlan() throws Exception {
        int databaseSizeBeforeUpdate = planRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlanMockMvc.perform(put("/api/plans")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(plan)))
            .andExpect(status().isBadRequest());

        // Validate the Plan in the database
        List<Plan> planList = planRepository.findAll();
        assertThat(planList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlan() throws Exception {
        // Initialize the database
        planRepository.saveAndFlush(plan);

        int databaseSizeBeforeDelete = planRepository.findAll().size();

        // Delete the plan
        restPlanMockMvc.perform(delete("/api/plans/{id}", plan.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Plan> planList = planRepository.findAll();
        assertThat(planList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
