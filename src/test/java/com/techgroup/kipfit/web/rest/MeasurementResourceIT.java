package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.KipfitApp;
import com.techgroup.kipfit.domain.Measurement;
import com.techgroup.kipfit.repository.MeasurementRepository;

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
 * Integration tests for the {@link MeasurementResource} REST controller.
 */
@SpringBootTest(classes = KipfitApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MeasurementResourceIT {

    private static final Integer DEFAULT_MEASUREMENT_ID = 1;
    private static final Integer UPDATED_MEASUREMENT_ID = 2;

    private static final Integer DEFAULT_METABOLICAGE = 1;
    private static final Integer UPDATED_METABOLICAGE = 2;

    private static final Integer DEFAULT_BMR = 1;
    private static final Integer UPDATED_BMR = 2;

    private static final Integer DEFAULT_BONE_MASS = 1;
    private static final Integer UPDATED_BONE_MASS = 2;

    private static final Integer DEFAULT_HEIGHT = 1;
    private static final Integer UPDATED_HEIGHT = 2;

    private static final Integer DEFAULT_WEIGHT = 1;
    private static final Integer UPDATED_WEIGHT = 2;

    private static final Integer DEFAULT_FAT_PERCENTAGE = 1;
    private static final Integer UPDATED_FAT_PERCENTAGE = 2;

    private static final Integer DEFAULT_NECK = 1;
    private static final Integer UPDATED_NECK = 2;

    private static final Integer DEFAULT_RIGHT_ARM = 1;
    private static final Integer UPDATED_RIGHT_ARM = 2;

    private static final Integer DEFAULT_LEFT_ARM = 1;
    private static final Integer UPDATED_LEFT_ARM = 2;

    private static final Integer DEFAULT_WRIST = 1;
    private static final Integer UPDATED_WRIST = 2;

    private static final Integer DEFAULT_CORE = 1;
    private static final Integer UPDATED_CORE = 2;

    private static final Integer DEFAULT_HIP = 1;
    private static final Integer UPDATED_HIP = 2;

    private static final Integer DEFAULT_THORAX = 1;
    private static final Integer UPDATED_THORAX = 2;

    private static final Integer DEFAULT_RIGHT_THIGH = 1;
    private static final Integer UPDATED_RIGHT_THIGH = 2;

    private static final Integer DEFAULT_LEFT_THIGH = 1;
    private static final Integer UPDATED_LEFT_THIGH = 2;

    private static final Integer DEFAULT_RIGHT_CALVE = 1;
    private static final Integer UPDATED_RIGHT_CALVE = 2;

    private static final Integer DEFAULT_LEFT_CALVE = 1;
    private static final Integer UPDATED_LEFT_CALVE = 2;

    private static final Instant DEFAULT_DATE_CREATED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_CREATED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private MeasurementRepository measurementRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMeasurementMockMvc;

    private Measurement measurement;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Measurement createEntity(EntityManager em) {
        Measurement measurement = new Measurement()
            .metabolicage(DEFAULT_METABOLICAGE)
            .bmr(DEFAULT_BMR)
            .boneMass(DEFAULT_BONE_MASS)
            .height(DEFAULT_HEIGHT)
            .weight(DEFAULT_WEIGHT)
            .fatPercentage(DEFAULT_FAT_PERCENTAGE)
            .neck(DEFAULT_NECK)
            .rightArm(DEFAULT_RIGHT_ARM)
            .leftArm(DEFAULT_LEFT_ARM)
            .wrist(DEFAULT_WRIST)
            .core(DEFAULT_CORE)
            .hip(DEFAULT_HIP)
            .thorax(DEFAULT_THORAX)
            .rightThigh(DEFAULT_RIGHT_THIGH)
            .leftThigh(DEFAULT_LEFT_THIGH)
            .rightCalve(DEFAULT_RIGHT_CALVE)
            .leftCalve(DEFAULT_LEFT_CALVE)
            .dateCreated(DEFAULT_DATE_CREATED);
        return measurement;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Measurement createUpdatedEntity(EntityManager em) {
        Measurement measurement = new Measurement()
            .metabolicage(UPDATED_METABOLICAGE)
            .bmr(UPDATED_BMR)
            .boneMass(UPDATED_BONE_MASS)
            .height(UPDATED_HEIGHT)
            .weight(UPDATED_WEIGHT)
            .fatPercentage(UPDATED_FAT_PERCENTAGE)
            .neck(UPDATED_NECK)
            .rightArm(UPDATED_RIGHT_ARM)
            .leftArm(UPDATED_LEFT_ARM)
            .wrist(UPDATED_WRIST)
            .core(UPDATED_CORE)
            .hip(UPDATED_HIP)
            .thorax(UPDATED_THORAX)
            .rightThigh(UPDATED_RIGHT_THIGH)
            .leftThigh(UPDATED_LEFT_THIGH)
            .rightCalve(UPDATED_RIGHT_CALVE)
            .leftCalve(UPDATED_LEFT_CALVE)
            .dateCreated(UPDATED_DATE_CREATED);
        return measurement;
    }

    @BeforeEach
    public void initTest() {
        measurement = createEntity(em);
    }

    @Test
    @Transactional
    public void createMeasurement() throws Exception {
        int databaseSizeBeforeCreate = measurementRepository.findAll().size();
        // Create the Measurement
        restMeasurementMockMvc.perform(post("/api/measurements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measurement)))
            .andExpect(status().isCreated());

        // Validate the Measurement in the database
        List<Measurement> measurementList = measurementRepository.findAll();
        assertThat(measurementList).hasSize(databaseSizeBeforeCreate + 1);
        Measurement testMeasurement = measurementList.get(measurementList.size() - 1);
        assertThat(testMeasurement.getMetabolicage()).isEqualTo(DEFAULT_METABOLICAGE);
        assertThat(testMeasurement.getBmr()).isEqualTo(DEFAULT_BMR);
        assertThat(testMeasurement.getBoneMass()).isEqualTo(DEFAULT_BONE_MASS);
        assertThat(testMeasurement.getHeight()).isEqualTo(DEFAULT_HEIGHT);
        assertThat(testMeasurement.getWeight()).isEqualTo(DEFAULT_WEIGHT);
        assertThat(testMeasurement.getFatPercentage()).isEqualTo(DEFAULT_FAT_PERCENTAGE);
        assertThat(testMeasurement.getNeck()).isEqualTo(DEFAULT_NECK);
        assertThat(testMeasurement.getRightArm()).isEqualTo(DEFAULT_RIGHT_ARM);
        assertThat(testMeasurement.getLeftArm()).isEqualTo(DEFAULT_LEFT_ARM);
        assertThat(testMeasurement.getWrist()).isEqualTo(DEFAULT_WRIST);
        assertThat(testMeasurement.getCore()).isEqualTo(DEFAULT_CORE);
        assertThat(testMeasurement.getHip()).isEqualTo(DEFAULT_HIP);
        assertThat(testMeasurement.getThorax()).isEqualTo(DEFAULT_THORAX);
        assertThat(testMeasurement.getRightThigh()).isEqualTo(DEFAULT_RIGHT_THIGH);
        assertThat(testMeasurement.getLeftThigh()).isEqualTo(DEFAULT_LEFT_THIGH);
        assertThat(testMeasurement.getRightCalve()).isEqualTo(DEFAULT_RIGHT_CALVE);
        assertThat(testMeasurement.getLeftCalve()).isEqualTo(DEFAULT_LEFT_CALVE);
        assertThat(testMeasurement.getDateCreated()).isEqualTo(DEFAULT_DATE_CREATED);
    }

    @Test
    @Transactional
    public void createMeasurementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = measurementRepository.findAll().size();

        // Create the Measurement with an existing ID
        measurement.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMeasurementMockMvc.perform(post("/api/measurements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measurement)))
            .andExpect(status().isBadRequest());

        // Validate the Measurement in the database
        List<Measurement> measurementList = measurementRepository.findAll();
        assertThat(measurementList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMeasurements() throws Exception {
        // Initialize the database
        measurementRepository.saveAndFlush(measurement);

        // Get all the measurementList
        restMeasurementMockMvc.perform(get("/api/measurements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(measurement.getId().intValue())))
            .andExpect(jsonPath("$.[*].measurementId").value(hasItem(DEFAULT_MEASUREMENT_ID)))
            .andExpect(jsonPath("$.[*].metabolicage").value(hasItem(DEFAULT_METABOLICAGE)))
            .andExpect(jsonPath("$.[*].bmr").value(hasItem(DEFAULT_BMR)))
            .andExpect(jsonPath("$.[*].boneMass").value(hasItem(DEFAULT_BONE_MASS)))
            .andExpect(jsonPath("$.[*].height").value(hasItem(DEFAULT_HEIGHT)))
            .andExpect(jsonPath("$.[*].weight").value(hasItem(DEFAULT_WEIGHT)))
            .andExpect(jsonPath("$.[*].fatPercentage").value(hasItem(DEFAULT_FAT_PERCENTAGE)))
            .andExpect(jsonPath("$.[*].neck").value(hasItem(DEFAULT_NECK)))
            .andExpect(jsonPath("$.[*].rightArm").value(hasItem(DEFAULT_RIGHT_ARM)))
            .andExpect(jsonPath("$.[*].leftArm").value(hasItem(DEFAULT_LEFT_ARM)))
            .andExpect(jsonPath("$.[*].wrist").value(hasItem(DEFAULT_WRIST)))
            .andExpect(jsonPath("$.[*].core").value(hasItem(DEFAULT_CORE)))
            .andExpect(jsonPath("$.[*].hip").value(hasItem(DEFAULT_HIP)))
            .andExpect(jsonPath("$.[*].thorax").value(hasItem(DEFAULT_THORAX)))
            .andExpect(jsonPath("$.[*].rightThigh").value(hasItem(DEFAULT_RIGHT_THIGH)))
            .andExpect(jsonPath("$.[*].leftThigh").value(hasItem(DEFAULT_LEFT_THIGH)))
            .andExpect(jsonPath("$.[*].rightCalve").value(hasItem(DEFAULT_RIGHT_CALVE)))
            .andExpect(jsonPath("$.[*].leftCalve").value(hasItem(DEFAULT_LEFT_CALVE)))
            .andExpect(jsonPath("$.[*].dateCreated").value(hasItem(DEFAULT_DATE_CREATED.toString())));
    }

    @Test
    @Transactional
    public void getMeasurement() throws Exception {
        // Initialize the database
        measurementRepository.saveAndFlush(measurement);

        // Get the measurement
        restMeasurementMockMvc.perform(get("/api/measurements/{id}", measurement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(measurement.getId().intValue()))
            .andExpect(jsonPath("$.measurementId").value(DEFAULT_MEASUREMENT_ID))
            .andExpect(jsonPath("$.metabolicage").value(DEFAULT_METABOLICAGE))
            .andExpect(jsonPath("$.bmr").value(DEFAULT_BMR))
            .andExpect(jsonPath("$.boneMass").value(DEFAULT_BONE_MASS))
            .andExpect(jsonPath("$.height").value(DEFAULT_HEIGHT))
            .andExpect(jsonPath("$.weight").value(DEFAULT_WEIGHT))
            .andExpect(jsonPath("$.fatPercentage").value(DEFAULT_FAT_PERCENTAGE))
            .andExpect(jsonPath("$.neck").value(DEFAULT_NECK))
            .andExpect(jsonPath("$.rightArm").value(DEFAULT_RIGHT_ARM))
            .andExpect(jsonPath("$.leftArm").value(DEFAULT_LEFT_ARM))
            .andExpect(jsonPath("$.wrist").value(DEFAULT_WRIST))
            .andExpect(jsonPath("$.core").value(DEFAULT_CORE))
            .andExpect(jsonPath("$.hip").value(DEFAULT_HIP))
            .andExpect(jsonPath("$.thorax").value(DEFAULT_THORAX))
            .andExpect(jsonPath("$.rightThigh").value(DEFAULT_RIGHT_THIGH))
            .andExpect(jsonPath("$.leftThigh").value(DEFAULT_LEFT_THIGH))
            .andExpect(jsonPath("$.rightCalve").value(DEFAULT_RIGHT_CALVE))
            .andExpect(jsonPath("$.leftCalve").value(DEFAULT_LEFT_CALVE))
            .andExpect(jsonPath("$.dateCreated").value(DEFAULT_DATE_CREATED.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingMeasurement() throws Exception {
        // Get the measurement
        restMeasurementMockMvc.perform(get("/api/measurements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMeasurement() throws Exception {
        // Initialize the database
        measurementRepository.saveAndFlush(measurement);

        int databaseSizeBeforeUpdate = measurementRepository.findAll().size();

        // Update the measurement
        Measurement updatedMeasurement = measurementRepository.findById(measurement.getId()).get();
        // Disconnect from session so that the updates on updatedMeasurement are not directly saved in db
        em.detach(updatedMeasurement);
        updatedMeasurement
            .metabolicage(UPDATED_METABOLICAGE)
            .bmr(UPDATED_BMR)
            .boneMass(UPDATED_BONE_MASS)
            .height(UPDATED_HEIGHT)
            .weight(UPDATED_WEIGHT)
            .fatPercentage(UPDATED_FAT_PERCENTAGE)
            .neck(UPDATED_NECK)
            .rightArm(UPDATED_RIGHT_ARM)
            .leftArm(UPDATED_LEFT_ARM)
            .wrist(UPDATED_WRIST)
            .core(UPDATED_CORE)
            .hip(UPDATED_HIP)
            .thorax(UPDATED_THORAX)
            .rightThigh(UPDATED_RIGHT_THIGH)
            .leftThigh(UPDATED_LEFT_THIGH)
            .rightCalve(UPDATED_RIGHT_CALVE)
            .leftCalve(UPDATED_LEFT_CALVE)
            .dateCreated(UPDATED_DATE_CREATED);

        restMeasurementMockMvc.perform(put("/api/measurements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMeasurement)))
            .andExpect(status().isOk());

        // Validate the Measurement in the database
        List<Measurement> measurementList = measurementRepository.findAll();
        assertThat(measurementList).hasSize(databaseSizeBeforeUpdate);
        Measurement testMeasurement = measurementList.get(measurementList.size() - 1);
        assertThat(testMeasurement.getMetabolicage()).isEqualTo(UPDATED_METABOLICAGE);
        assertThat(testMeasurement.getBmr()).isEqualTo(UPDATED_BMR);
        assertThat(testMeasurement.getBoneMass()).isEqualTo(UPDATED_BONE_MASS);
        assertThat(testMeasurement.getHeight()).isEqualTo(UPDATED_HEIGHT);
        assertThat(testMeasurement.getWeight()).isEqualTo(UPDATED_WEIGHT);
        assertThat(testMeasurement.getFatPercentage()).isEqualTo(UPDATED_FAT_PERCENTAGE);
        assertThat(testMeasurement.getNeck()).isEqualTo(UPDATED_NECK);
        assertThat(testMeasurement.getRightArm()).isEqualTo(UPDATED_RIGHT_ARM);
        assertThat(testMeasurement.getLeftArm()).isEqualTo(UPDATED_LEFT_ARM);
        assertThat(testMeasurement.getWrist()).isEqualTo(UPDATED_WRIST);
        assertThat(testMeasurement.getCore()).isEqualTo(UPDATED_CORE);
        assertThat(testMeasurement.getHip()).isEqualTo(UPDATED_HIP);
        assertThat(testMeasurement.getThorax()).isEqualTo(UPDATED_THORAX);
        assertThat(testMeasurement.getRightThigh()).isEqualTo(UPDATED_RIGHT_THIGH);
        assertThat(testMeasurement.getLeftThigh()).isEqualTo(UPDATED_LEFT_THIGH);
        assertThat(testMeasurement.getRightCalve()).isEqualTo(UPDATED_RIGHT_CALVE);
        assertThat(testMeasurement.getLeftCalve()).isEqualTo(UPDATED_LEFT_CALVE);
        assertThat(testMeasurement.getDateCreated()).isEqualTo(UPDATED_DATE_CREATED);
    }

    @Test
    @Transactional
    public void updateNonExistingMeasurement() throws Exception {
        int databaseSizeBeforeUpdate = measurementRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMeasurementMockMvc.perform(put("/api/measurements")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(measurement)))
            .andExpect(status().isBadRequest());

        // Validate the Measurement in the database
        List<Measurement> measurementList = measurementRepository.findAll();
        assertThat(measurementList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMeasurement() throws Exception {
        // Initialize the database
        measurementRepository.saveAndFlush(measurement);

        int databaseSizeBeforeDelete = measurementRepository.findAll().size();

        // Delete the measurement
        restMeasurementMockMvc.perform(delete("/api/measurements/{id}", measurement.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Measurement> measurementList = measurementRepository.findAll();
        assertThat(measurementList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
