package com.techgroup.kipfit.web.rest;

import com.techgroup.kipfit.KipfitApp;
import com.techgroup.kipfit.domain.Schedule;
import com.techgroup.kipfit.repository.ScheduleRepository;

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
 * Integration tests for the {@link ScheduleResource} REST controller.
 */
@SpringBootTest(classes = KipfitApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ScheduleResourceIT {

    private static final String DEFAULT_WEEK_DAY = "AAAAAAAAAA";
    private static final String UPDATED_WEEK_DAY = "BBBBBBBBBB";

    private static final Instant DEFAULT_START_HOUR = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_HOUR = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_HOUR = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_HOUR = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restScheduleMockMvc;

    private Schedule schedule;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Schedule createEntity(EntityManager em) {
        Schedule schedule = new Schedule()
            .weekDay(DEFAULT_WEEK_DAY)
            .startHour(DEFAULT_START_HOUR)
            .endHour(DEFAULT_END_HOUR);
        return schedule;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Schedule createUpdatedEntity(EntityManager em) {
        Schedule schedule = new Schedule()
            .weekDay(UPDATED_WEEK_DAY)
            .startHour(UPDATED_START_HOUR)
            .endHour(UPDATED_END_HOUR);
        return schedule;
    }

    @BeforeEach
    public void initTest() {
        schedule = createEntity(em);
    }

    @Test
    @Transactional
    public void createSchedule() throws Exception {
        int databaseSizeBeforeCreate = scheduleRepository.findAll().size();
        // Create the Schedule
        restScheduleMockMvc.perform(post("/api/schedules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(schedule)))
            .andExpect(status().isCreated());

        // Validate the Schedule in the database
        List<Schedule> scheduleList = scheduleRepository.findAll();
        assertThat(scheduleList).hasSize(databaseSizeBeforeCreate + 1);
        Schedule testSchedule = scheduleList.get(scheduleList.size() - 1);
        assertThat(testSchedule.getWeekDay()).isEqualTo(DEFAULT_WEEK_DAY);
        assertThat(testSchedule.getStartHour()).isEqualTo(DEFAULT_START_HOUR);
        assertThat(testSchedule.getEndHour()).isEqualTo(DEFAULT_END_HOUR);
    }

    @Test
    @Transactional
    public void createScheduleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = scheduleRepository.findAll().size();

        // Create the Schedule with an existing ID
        schedule.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restScheduleMockMvc.perform(post("/api/schedules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(schedule)))
            .andExpect(status().isBadRequest());

        // Validate the Schedule in the database
        List<Schedule> scheduleList = scheduleRepository.findAll();
        assertThat(scheduleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSchedules() throws Exception {
        // Initialize the database
        scheduleRepository.saveAndFlush(schedule);

        // Get all the scheduleList
        restScheduleMockMvc.perform(get("/api/schedules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(schedule.getId().intValue())))
            .andExpect(jsonPath("$.[*].weekDay").value(hasItem(DEFAULT_WEEK_DAY)))
            .andExpect(jsonPath("$.[*].startHour").value(hasItem(DEFAULT_START_HOUR.toString())))
            .andExpect(jsonPath("$.[*].endHour").value(hasItem(DEFAULT_END_HOUR.toString())));
    }
    
    @Test
    @Transactional
    public void getSchedule() throws Exception {
        // Initialize the database
        scheduleRepository.saveAndFlush(schedule);

        // Get the schedule
        restScheduleMockMvc.perform(get("/api/schedules/{id}", schedule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(schedule.getId().intValue()))
            .andExpect(jsonPath("$.weekDay").value(DEFAULT_WEEK_DAY))
            .andExpect(jsonPath("$.startHour").value(DEFAULT_START_HOUR.toString()))
            .andExpect(jsonPath("$.endHour").value(DEFAULT_END_HOUR.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingSchedule() throws Exception {
        // Get the schedule
        restScheduleMockMvc.perform(get("/api/schedules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSchedule() throws Exception {
        // Initialize the database
        scheduleRepository.saveAndFlush(schedule);

        int databaseSizeBeforeUpdate = scheduleRepository.findAll().size();

        // Update the schedule
        Schedule updatedSchedule = scheduleRepository.findById(schedule.getId()).get();
        // Disconnect from session so that the updates on updatedSchedule are not directly saved in db
        em.detach(updatedSchedule);
        updatedSchedule
            .weekDay(UPDATED_WEEK_DAY)
            .startHour(UPDATED_START_HOUR)
            .endHour(UPDATED_END_HOUR);

        restScheduleMockMvc.perform(put("/api/schedules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSchedule)))
            .andExpect(status().isOk());

        // Validate the Schedule in the database
        List<Schedule> scheduleList = scheduleRepository.findAll();
        assertThat(scheduleList).hasSize(databaseSizeBeforeUpdate);
        Schedule testSchedule = scheduleList.get(scheduleList.size() - 1);
        assertThat(testSchedule.getWeekDay()).isEqualTo(UPDATED_WEEK_DAY);
        assertThat(testSchedule.getStartHour()).isEqualTo(UPDATED_START_HOUR);
        assertThat(testSchedule.getEndHour()).isEqualTo(UPDATED_END_HOUR);
    }

    @Test
    @Transactional
    public void updateNonExistingSchedule() throws Exception {
        int databaseSizeBeforeUpdate = scheduleRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restScheduleMockMvc.perform(put("/api/schedules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(schedule)))
            .andExpect(status().isBadRequest());

        // Validate the Schedule in the database
        List<Schedule> scheduleList = scheduleRepository.findAll();
        assertThat(scheduleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSchedule() throws Exception {
        // Initialize the database
        scheduleRepository.saveAndFlush(schedule);

        int databaseSizeBeforeDelete = scheduleRepository.findAll().size();

        // Delete the schedule
        restScheduleMockMvc.perform(delete("/api/schedules/{id}", schedule.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Schedule> scheduleList = scheduleRepository.findAll();
        assertThat(scheduleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
