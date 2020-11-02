package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.KipfitApp;
import com.techgroup.kipfit.domain.SystemParameter;
import com.techgroup.kipfit.repository.SystemParameterRepository;

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
 * Integration tests for the {@link SystemParameterResource} REST controller.
 */
@SpringBootTest(classes = KipfitApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SystemParameterResourceIT {

    private static final String DEFAULT_GYM_NAME = "AAAAAAAAAA";
    private static final String UPDATED_GYM_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LOGO_PATH = "AAAAAAAAAA";
    private static final String UPDATED_LOGO_PATH = "BBBBBBBBBB";

    @Autowired
    private SystemParameterRepository systemParameterRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSystemParameterMockMvc;

    private SystemParameter systemParameter;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SystemParameter createEntity(EntityManager em) {
        SystemParameter systemParameter = new SystemParameter()
            .gymName(DEFAULT_GYM_NAME)
            .logoPath(DEFAULT_LOGO_PATH);
        return systemParameter;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SystemParameter createUpdatedEntity(EntityManager em) {
        SystemParameter systemParameter = new SystemParameter()
            .gymName(UPDATED_GYM_NAME)
            .logoPath(UPDATED_LOGO_PATH);
        return systemParameter;
    }

    @BeforeEach
    public void initTest() {
        systemParameter = createEntity(em);
    }

    @Test
    @Transactional
    public void createSystemParameter() throws Exception {
        int databaseSizeBeforeCreate = systemParameterRepository.findAll().size();
        // Create the SystemParameter
        restSystemParameterMockMvc.perform(post("/api/system-parameters")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(systemParameter)))
            .andExpect(status().isCreated());

        // Validate the SystemParameter in the database
        List<SystemParameter> systemParameterList = systemParameterRepository.findAll();
        assertThat(systemParameterList).hasSize(databaseSizeBeforeCreate + 1);
        SystemParameter testSystemParameter = systemParameterList.get(systemParameterList.size() - 1);
        assertThat(testSystemParameter.getGymName()).isEqualTo(DEFAULT_GYM_NAME);
        assertThat(testSystemParameter.getLogoPath()).isEqualTo(DEFAULT_LOGO_PATH);
    }

    @Test
    @Transactional
    public void createSystemParameterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = systemParameterRepository.findAll().size();

        // Create the SystemParameter with an existing ID
        systemParameter.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSystemParameterMockMvc.perform(post("/api/system-parameters")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(systemParameter)))
            .andExpect(status().isBadRequest());

        // Validate the SystemParameter in the database
        List<SystemParameter> systemParameterList = systemParameterRepository.findAll();
        assertThat(systemParameterList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSystemParameters() throws Exception {
        // Initialize the database
        systemParameterRepository.saveAndFlush(systemParameter);

        // Get all the systemParameterList
        restSystemParameterMockMvc.perform(get("/api/system-parameters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(systemParameter.getId().intValue())))
            .andExpect(jsonPath("$.[*].gymName").value(hasItem(DEFAULT_GYM_NAME)))
            .andExpect(jsonPath("$.[*].logoPath").value(hasItem(DEFAULT_LOGO_PATH)));
    }
    
    @Test
    @Transactional
    public void getSystemParameter() throws Exception {
        // Initialize the database
        systemParameterRepository.saveAndFlush(systemParameter);

        // Get the systemParameter
        restSystemParameterMockMvc.perform(get("/api/system-parameters/{id}", systemParameter.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(systemParameter.getId().intValue()))
            .andExpect(jsonPath("$.gymName").value(DEFAULT_GYM_NAME))
            .andExpect(jsonPath("$.logoPath").value(DEFAULT_LOGO_PATH));
    }
    @Test
    @Transactional
    public void getNonExistingSystemParameter() throws Exception {
        // Get the systemParameter
        restSystemParameterMockMvc.perform(get("/api/system-parameters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSystemParameter() throws Exception {
        // Initialize the database
        systemParameterRepository.saveAndFlush(systemParameter);

        int databaseSizeBeforeUpdate = systemParameterRepository.findAll().size();

        // Update the systemParameter
        SystemParameter updatedSystemParameter = systemParameterRepository.findById(systemParameter.getId()).get();
        // Disconnect from session so that the updates on updatedSystemParameter are not directly saved in db
        em.detach(updatedSystemParameter);
        updatedSystemParameter
            .gymName(UPDATED_GYM_NAME)
            .logoPath(UPDATED_LOGO_PATH);

        restSystemParameterMockMvc.perform(put("/api/system-parameters")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSystemParameter)))
            .andExpect(status().isOk());

        // Validate the SystemParameter in the database
        List<SystemParameter> systemParameterList = systemParameterRepository.findAll();
        assertThat(systemParameterList).hasSize(databaseSizeBeforeUpdate);
        SystemParameter testSystemParameter = systemParameterList.get(systemParameterList.size() - 1);
        assertThat(testSystemParameter.getGymName()).isEqualTo(UPDATED_GYM_NAME);
        assertThat(testSystemParameter.getLogoPath()).isEqualTo(UPDATED_LOGO_PATH);
    }

    @Test
    @Transactional
    public void updateNonExistingSystemParameter() throws Exception {
        int databaseSizeBeforeUpdate = systemParameterRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSystemParameterMockMvc.perform(put("/api/system-parameters")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(systemParameter)))
            .andExpect(status().isBadRequest());

        // Validate the SystemParameter in the database
        List<SystemParameter> systemParameterList = systemParameterRepository.findAll();
        assertThat(systemParameterList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSystemParameter() throws Exception {
        // Initialize the database
        systemParameterRepository.saveAndFlush(systemParameter);

        int databaseSizeBeforeDelete = systemParameterRepository.findAll().size();

        // Delete the systemParameter
        restSystemParameterMockMvc.perform(delete("/api/system-parameters/{id}", systemParameter.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SystemParameter> systemParameterList = systemParameterRepository.findAll();
        assertThat(systemParameterList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
