package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.KipfitApp;
import com.techgroup.kipfit.domain.Subscriber;
import com.techgroup.kipfit.repository.SubscriberRepository;

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
 * Integration tests for the {@link SubscriberResource} REST controller.
 */
@SpringBootTest(classes = KipfitApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class SubscriberResourceIT {

    private static final Instant DEFAULT_INITIAL_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_INITIAL_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_MEDICAL_CONDITIONS = "AAAAAAAAAA";
    private static final String UPDATED_MEDICAL_CONDITIONS = "BBBBBBBBBB";

    private static final String DEFAULT_PAYMENT_FREQ = "AAAAAAAAAA";
    private static final String UPDATED_PAYMENT_FREQ = "BBBBBBBBBB";

    @Autowired
    private SubscriberRepository subscriberRepository;

    @Mock
    private SubscriberRepository subscriberRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSubscriberMockMvc;

    private Subscriber subscriber;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Subscriber createEntity(EntityManager em) {
        Subscriber subscriber = new Subscriber()
            .initialDate(DEFAULT_INITIAL_DATE)
            .medicalConditions(DEFAULT_MEDICAL_CONDITIONS)
            .paymentFreq(DEFAULT_PAYMENT_FREQ);
        return subscriber;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Subscriber createUpdatedEntity(EntityManager em) {
        Subscriber subscriber = new Subscriber()
            .initialDate(UPDATED_INITIAL_DATE)
            .medicalConditions(UPDATED_MEDICAL_CONDITIONS)
            .paymentFreq(UPDATED_PAYMENT_FREQ);
        return subscriber;
    }

    @BeforeEach
    public void initTest() {
        subscriber = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubscriber() throws Exception {
        int databaseSizeBeforeCreate = subscriberRepository.findAll().size();
        // Create the Subscriber
        restSubscriberMockMvc.perform(post("/api/subscribers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subscriber)))
            .andExpect(status().isCreated());

        // Validate the Subscriber in the database
        List<Subscriber> subscriberList = subscriberRepository.findAll();
        assertThat(subscriberList).hasSize(databaseSizeBeforeCreate + 1);
        Subscriber testSubscriber = subscriberList.get(subscriberList.size() - 1);
        assertThat(testSubscriber.getInitialDate()).isEqualTo(DEFAULT_INITIAL_DATE);
        assertThat(testSubscriber.getMedicalConditions()).isEqualTo(DEFAULT_MEDICAL_CONDITIONS);
        assertThat(testSubscriber.getPaymentFreq()).isEqualTo(DEFAULT_PAYMENT_FREQ);
    }

    @Test
    @Transactional
    public void createSubscriberWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subscriberRepository.findAll().size();

        // Create the Subscriber with an existing ID
        subscriber.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubscriberMockMvc.perform(post("/api/subscribers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subscriber)))
            .andExpect(status().isBadRequest());

        // Validate the Subscriber in the database
        List<Subscriber> subscriberList = subscriberRepository.findAll();
        assertThat(subscriberList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSubscribers() throws Exception {
        // Initialize the database
        subscriberRepository.saveAndFlush(subscriber);

        // Get all the subscriberList
        restSubscriberMockMvc.perform(get("/api/subscribers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subscriber.getId().intValue())))
            .andExpect(jsonPath("$.[*].initialDate").value(hasItem(DEFAULT_INITIAL_DATE.toString())))
            .andExpect(jsonPath("$.[*].medicalConditions").value(hasItem(DEFAULT_MEDICAL_CONDITIONS)))
            .andExpect(jsonPath("$.[*].paymentFreq").value(hasItem(DEFAULT_PAYMENT_FREQ)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllSubscribersWithEagerRelationshipsIsEnabled() throws Exception {
        when(subscriberRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restSubscriberMockMvc.perform(get("/api/subscribers?eagerload=true"))
            .andExpect(status().isOk());

        verify(subscriberRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllSubscribersWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(subscriberRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restSubscriberMockMvc.perform(get("/api/subscribers?eagerload=true"))
            .andExpect(status().isOk());

        verify(subscriberRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getSubscriber() throws Exception {
        // Initialize the database
        subscriberRepository.saveAndFlush(subscriber);

        // Get the subscriber
        restSubscriberMockMvc.perform(get("/api/subscribers/{id}", subscriber.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(subscriber.getId().intValue()))
            .andExpect(jsonPath("$.initialDate").value(DEFAULT_INITIAL_DATE.toString()))
            .andExpect(jsonPath("$.medicalConditions").value(DEFAULT_MEDICAL_CONDITIONS))
            .andExpect(jsonPath("$.paymentFreq").value(DEFAULT_PAYMENT_FREQ));
    }
    @Test
    @Transactional
    public void getNonExistingSubscriber() throws Exception {
        // Get the subscriber
        restSubscriberMockMvc.perform(get("/api/subscribers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubscriber() throws Exception {
        // Initialize the database
        subscriberRepository.saveAndFlush(subscriber);

        int databaseSizeBeforeUpdate = subscriberRepository.findAll().size();

        // Update the subscriber
        Subscriber updatedSubscriber = subscriberRepository.findById(subscriber.getId()).get();
        // Disconnect from session so that the updates on updatedSubscriber are not directly saved in db
        em.detach(updatedSubscriber);
        updatedSubscriber
            .initialDate(UPDATED_INITIAL_DATE)
            .medicalConditions(UPDATED_MEDICAL_CONDITIONS)
            .paymentFreq(UPDATED_PAYMENT_FREQ);

        restSubscriberMockMvc.perform(put("/api/subscribers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSubscriber)))
            .andExpect(status().isOk());

        // Validate the Subscriber in the database
        List<Subscriber> subscriberList = subscriberRepository.findAll();
        assertThat(subscriberList).hasSize(databaseSizeBeforeUpdate);
        Subscriber testSubscriber = subscriberList.get(subscriberList.size() - 1);
        assertThat(testSubscriber.getInitialDate()).isEqualTo(UPDATED_INITIAL_DATE);
        assertThat(testSubscriber.getMedicalConditions()).isEqualTo(UPDATED_MEDICAL_CONDITIONS);
        assertThat(testSubscriber.getPaymentFreq()).isEqualTo(UPDATED_PAYMENT_FREQ);
    }

    @Test
    @Transactional
    public void updateNonExistingSubscriber() throws Exception {
        int databaseSizeBeforeUpdate = subscriberRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubscriberMockMvc.perform(put("/api/subscribers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(subscriber)))
            .andExpect(status().isBadRequest());

        // Validate the Subscriber in the database
        List<Subscriber> subscriberList = subscriberRepository.findAll();
        assertThat(subscriberList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSubscriber() throws Exception {
        // Initialize the database
        subscriberRepository.saveAndFlush(subscriber);

        int databaseSizeBeforeDelete = subscriberRepository.findAll().size();

        // Delete the subscriber
        restSubscriberMockMvc.perform(delete("/api/subscribers/{id}", subscriber.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Subscriber> subscriberList = subscriberRepository.findAll();
        assertThat(subscriberList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
