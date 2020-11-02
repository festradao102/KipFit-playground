package com.techgroup.kipfit.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A GuidedTraining.
 */
@Entity
@Table(name = "guided_training")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class GuidedTraining implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "trainer_name")
    private String trainerName;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "date")
    private Instant date;

    @Column(name = "active_state")
    private Boolean activeState;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "guided_training_schedule",
               joinColumns = @JoinColumn(name = "guided_training_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "schedule_id", referencedColumnName = "id"))
    private Set<Schedule> schedules = new HashSet<>();

    @ManyToMany(mappedBy = "guidedTrainings")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Subscriber> subscribers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public GuidedTraining name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTrainerName() {
        return trainerName;
    }

    public GuidedTraining trainerName(String trainerName) {
        this.trainerName = trainerName;
        return this;
    }

    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public GuidedTraining capacity(Integer capacity) {
        this.capacity = capacity;
        return this;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Instant getDate() {
        return date;
    }

    public GuidedTraining date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Boolean isActiveState() {
        return activeState;
    }

    public GuidedTraining activeState(Boolean activeState) {
        this.activeState = activeState;
        return this;
    }

    public void setActiveState(Boolean activeState) {
        this.activeState = activeState;
    }

    public Set<Schedule> getSchedules() {
        return schedules;
    }

    public GuidedTraining schedules(Set<Schedule> schedules) {
        this.schedules = schedules;
        return this;
    }

    public GuidedTraining addSchedule(Schedule schedule) {
        this.schedules.add(schedule);
        schedule.getGuidedTrainings().add(this);
        return this;
    }

    public GuidedTraining removeSchedule(Schedule schedule) {
        this.schedules.remove(schedule);
        schedule.getGuidedTrainings().remove(this);
        return this;
    }

    public void setSchedules(Set<Schedule> schedules) {
        this.schedules = schedules;
    }

    public Set<Subscriber> getSubscribers() {
        return subscribers;
    }

    public GuidedTraining subscribers(Set<Subscriber> subscribers) {
        this.subscribers = subscribers;
        return this;
    }

    public GuidedTraining addSubscriber(Subscriber subscriber) {
        this.subscribers.add(subscriber);
        subscriber.getGuidedTrainings().add(this);
        return this;
    }

    public GuidedTraining removeSubscriber(Subscriber subscriber) {
        this.subscribers.remove(subscriber);
        subscriber.getGuidedTrainings().remove(this);
        return this;
    }

    public void setSubscribers(Set<Subscriber> subscribers) {
        this.subscribers = subscribers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GuidedTraining)) {
            return false;
        }
        return id != null && id.equals(((GuidedTraining) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GuidedTraining{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", trainerName='" + getTrainerName() + "'" +
            ", capacity=" + getCapacity() +
            ", date='" + getDate() + "'" +
            ", activeState='" + isActiveState() + "'" +
            "}";
    }
}
