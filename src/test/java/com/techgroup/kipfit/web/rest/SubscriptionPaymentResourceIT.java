package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.KipfitApp;
import com.techgroup.kipfit.domain.SubscriptionPayment;
import com.techgroup.kipfit.repository.SubscriptionPaymentRepository;

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
 * Integration tests for the {@link SubscriptionPaymentResource} REST controller.
 */
@SpringBootTest(classes = KipfitApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SubscriptionPaymentResourceIT {

    private static final Integer DEFAULT_AMOUNT = 1;
    private static final Integer UPDATED_AMOUNT = 2;

    @Autowired
    private SubscriptionPaymentRepository subscriptionPaymentRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSubscriptionPaymentMockMvc;

    private SubscriptionPayment subscriptionPayment;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubscriptionPayment createEntity(EntityManager em) {
        SubscriptionPayment subscriptionPayment = new SubscriptionPayment()
            .amount(DEFAULT_AMOUNT);
        return subscriptionPayment;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubscriptionPayment createUpdatedEntity(EntityManager em) {
        SubscriptionPayment subscriptionPayment = new SubscriptionPayment()
            .amount(UPDATED_AMOUNT);
        return subscriptionPayment;
    }

    @BeforeEach
    public void initTest() {
        subscriptionPayment = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubscriptionPayment() throws Exception {
        int databaseSizeBeforeCreate = subscriptionPaymentRepository.findAll().size();
        // Create the SubscriptionPayment
        restSubscriptionPaymentMockMvc.perform(post("/api/subscription-payments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionPayment)))
            .andExpect(status().isCreated());

        // Validate the SubscriptionPayment in the database
        List<SubscriptionPayment> subscriptionPaymentList = subscriptionPaymentRepository.findAll();
        assertThat(subscriptionPaymentList).hasSize(databaseSizeBeforeCreate + 1);
        SubscriptionPayment testSubscriptionPayment = subscriptionPaymentList.get(subscriptionPaymentList.size() - 1);
        assertThat(testSubscriptionPayment.getAmount()).isEqualTo(DEFAULT_AMOUNT);
    }

    @Test
    @Transactional
    public void createSubscriptionPaymentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subscriptionPaymentRepository.findAll().size();

        // Create the SubscriptionPayment with an existing ID
        subscriptionPayment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubscriptionPaymentMockMvc.perform(post("/api/subscription-payments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionPayment)))
            .andExpect(status().isBadRequest());

        // Validate the SubscriptionPayment in the database
        List<SubscriptionPayment> subscriptionPaymentList = subscriptionPaymentRepository.findAll();
        assertThat(subscriptionPaymentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSubscriptionPayments() throws Exception {
        // Initialize the database
        subscriptionPaymentRepository.saveAndFlush(subscriptionPayment);

        // Get all the subscriptionPaymentList
        restSubscriptionPaymentMockMvc.perform(get("/api/subscription-payments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subscriptionPayment.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT)));
    }
    
    @Test
    @Transactional
    public void getSubscriptionPayment() throws Exception {
        // Initialize the database
        subscriptionPaymentRepository.saveAndFlush(subscriptionPayment);

        // Get the subscriptionPayment
        restSubscriptionPaymentMockMvc.perform(get("/api/subscription-payments/{id}", subscriptionPayment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(subscriptionPayment.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT));
    }
    @Test
    @Transactional
    public void getNonExistingSubscriptionPayment() throws Exception {
        // Get the subscriptionPayment
        restSubscriptionPaymentMockMvc.perform(get("/api/subscription-payments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubscriptionPayment() throws Exception {
        // Initialize the database
        subscriptionPaymentRepository.saveAndFlush(subscriptionPayment);

        int databaseSizeBeforeUpdate = subscriptionPaymentRepository.findAll().size();

        // Update the subscriptionPayment
        SubscriptionPayment updatedSubscriptionPayment = subscriptionPaymentRepository.findById(subscriptionPayment.getId()).get();
        // Disconnect from session so that the updates on updatedSubscriptionPayment are not directly saved in db
        em.detach(updatedSubscriptionPayment);
        updatedSubscriptionPayment
            .amount(UPDATED_AMOUNT);

        restSubscriptionPaymentMockMvc.perform(put("/api/subscription-payments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSubscriptionPayment)))
            .andExpect(status().isOk());

        // Validate the SubscriptionPayment in the database
        List<SubscriptionPayment> subscriptionPaymentList = subscriptionPaymentRepository.findAll();
        assertThat(subscriptionPaymentList).hasSize(databaseSizeBeforeUpdate);
        SubscriptionPayment testSubscriptionPayment = subscriptionPaymentList.get(subscriptionPaymentList.size() - 1);
        assertThat(testSubscriptionPayment.getAmount()).isEqualTo(UPDATED_AMOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingSubscriptionPayment() throws Exception {
        int databaseSizeBeforeUpdate = subscriptionPaymentRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubscriptionPaymentMockMvc.perform(put("/api/subscription-payments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subscriptionPayment)))
            .andExpect(status().isBadRequest());

        // Validate the SubscriptionPayment in the database
        List<SubscriptionPayment> subscriptionPaymentList = subscriptionPaymentRepository.findAll();
        assertThat(subscriptionPaymentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSubscriptionPayment() throws Exception {
        // Initialize the database
        subscriptionPaymentRepository.saveAndFlush(subscriptionPayment);

        int databaseSizeBeforeDelete = subscriptionPaymentRepository.findAll().size();

        // Delete the subscriptionPayment
        restSubscriptionPaymentMockMvc.perform(delete("/api/subscription-payments/{id}", subscriptionPayment.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SubscriptionPayment> subscriptionPaymentList = subscriptionPaymentRepository.findAll();
        assertThat(subscriptionPaymentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
