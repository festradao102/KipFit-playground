package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.KipfitApp;
import com.techgroup.kipfit.domain.FitUser;
import com.techgroup.kipfit.repository.FitUserRepository;

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
 * Integration tests for the {@link FitUserResource} REST controller.
 */
@SpringBootTest(classes = KipfitApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class FitUserResourceIT {

    private static final String DEFAULT_LEGAL_ID = "AAAAAAAAAA";
    private static final String UPDATED_LEGAL_ID = "BBBBBBBBBB";

    private static final Instant DEFAULT_BDAY = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_BDAY = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_EMERGENCY_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_EMERGENCY_PHONE = "BBBBBBBBBB";

    @Autowired
    private FitUserRepository fitUserRepository;

    @Mock
    private FitUserRepository fitUserRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFitUserMockMvc;

    private FitUser fitUser;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FitUser createEntity(EntityManager em) {
        FitUser fitUser = new FitUser()
            .legalId(DEFAULT_LEGAL_ID)
            .bday(DEFAULT_BDAY)
            .phone(DEFAULT_PHONE)
            .emergencyPhone(DEFAULT_EMERGENCY_PHONE);
        return fitUser;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FitUser createUpdatedEntity(EntityManager em) {
        FitUser fitUser = new FitUser()
            .legalId(UPDATED_LEGAL_ID)
            .bday(UPDATED_BDAY)
            .phone(UPDATED_PHONE)
            .emergencyPhone(UPDATED_EMERGENCY_PHONE);
        return fitUser;
    }

    @BeforeEach
    public void initTest() {
        fitUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createFitUser() throws Exception {
        int databaseSizeBeforeCreate = fitUserRepository.findAll().size();
        // Create the FitUser
        restFitUserMockMvc.perform(post("/api/fit-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fitUser)))
            .andExpect(status().isCreated());

        // Validate the FitUser in the database
        List<FitUser> fitUserList = fitUserRepository.findAll();
        assertThat(fitUserList).hasSize(databaseSizeBeforeCreate + 1);
        FitUser testFitUser = fitUserList.get(fitUserList.size() - 1);
        assertThat(testFitUser.getLegalId()).isEqualTo(DEFAULT_LEGAL_ID);
        assertThat(testFitUser.getBday()).isEqualTo(DEFAULT_BDAY);
        assertThat(testFitUser.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testFitUser.getEmergencyPhone()).isEqualTo(DEFAULT_EMERGENCY_PHONE);
    }

    @Test
    @Transactional
    public void createFitUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fitUserRepository.findAll().size();

        // Create the FitUser with an existing ID
        fitUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFitUserMockMvc.perform(post("/api/fit-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fitUser)))
            .andExpect(status().isBadRequest());

        // Validate the FitUser in the database
        List<FitUser> fitUserList = fitUserRepository.findAll();
        assertThat(fitUserList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFitUsers() throws Exception {
        // Initialize the database
        fitUserRepository.saveAndFlush(fitUser);

        // Get all the fitUserList
        restFitUserMockMvc.perform(get("/api/fit-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fitUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].legalId").value(hasItem(DEFAULT_LEGAL_ID)))
            .andExpect(jsonPath("$.[*].bday").value(hasItem(DEFAULT_BDAY.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE)))
            .andExpect(jsonPath("$.[*].emergencyPhone").value(hasItem(DEFAULT_EMERGENCY_PHONE)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllFitUsersWithEagerRelationshipsIsEnabled() throws Exception {
        when(fitUserRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restFitUserMockMvc.perform(get("/api/fit-users?eagerload=true"))
            .andExpect(status().isOk());

        verify(fitUserRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllFitUsersWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(fitUserRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restFitUserMockMvc.perform(get("/api/fit-users?eagerload=true"))
            .andExpect(status().isOk());

        verify(fitUserRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getFitUser() throws Exception {
        // Initialize the database
        fitUserRepository.saveAndFlush(fitUser);

        // Get the fitUser
        restFitUserMockMvc.perform(get("/api/fit-users/{id}", fitUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(fitUser.getId().intValue()))
            .andExpect(jsonPath("$.legalId").value(DEFAULT_LEGAL_ID))
            .andExpect(jsonPath("$.bday").value(DEFAULT_BDAY.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE))
            .andExpect(jsonPath("$.emergencyPhone").value(DEFAULT_EMERGENCY_PHONE));
    }
    @Test
    @Transactional
    public void getNonExistingFitUser() throws Exception {
        // Get the fitUser
        restFitUserMockMvc.perform(get("/api/fit-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFitUser() throws Exception {
        // Initialize the database
        fitUserRepository.saveAndFlush(fitUser);

        int databaseSizeBeforeUpdate = fitUserRepository.findAll().size();

        // Update the fitUser
        FitUser updatedFitUser = fitUserRepository.findById(fitUser.getId()).get();
        // Disconnect from session so that the updates on updatedFitUser are not directly saved in db
        em.detach(updatedFitUser);
        updatedFitUser
            .legalId(UPDATED_LEGAL_ID)
            .bday(UPDATED_BDAY)
            .phone(UPDATED_PHONE)
            .emergencyPhone(UPDATED_EMERGENCY_PHONE);

        restFitUserMockMvc.perform(put("/api/fit-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFitUser)))
            .andExpect(status().isOk());

        // Validate the FitUser in the database
        List<FitUser> fitUserList = fitUserRepository.findAll();
        assertThat(fitUserList).hasSize(databaseSizeBeforeUpdate);
        FitUser testFitUser = fitUserList.get(fitUserList.size() - 1);
        assertThat(testFitUser.getLegalId()).isEqualTo(UPDATED_LEGAL_ID);
        assertThat(testFitUser.getBday()).isEqualTo(UPDATED_BDAY);
        assertThat(testFitUser.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testFitUser.getEmergencyPhone()).isEqualTo(UPDATED_EMERGENCY_PHONE);
    }

    @Test
    @Transactional
    public void updateNonExistingFitUser() throws Exception {
        int databaseSizeBeforeUpdate = fitUserRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFitUserMockMvc.perform(put("/api/fit-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fitUser)))
            .andExpect(status().isBadRequest());

        // Validate the FitUser in the database
        List<FitUser> fitUserList = fitUserRepository.findAll();
        assertThat(fitUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFitUser() throws Exception {
        // Initialize the database
        fitUserRepository.saveAndFlush(fitUser);

        int databaseSizeBeforeDelete = fitUserRepository.findAll().size();

        // Delete the fitUser
        restFitUserMockMvc.perform(delete("/api/fit-users/{id}", fitUser.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FitUser> fitUserList = fitUserRepository.findAll();
        assertThat(fitUserList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
