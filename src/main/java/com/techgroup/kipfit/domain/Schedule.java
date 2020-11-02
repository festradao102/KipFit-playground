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
 * A Schedule.
 */
@Entity
@Table(name = "schedule")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Schedule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "week_day")
    private String weekDay;

    @Column(name = "start_hour")
    private Instant startHour;

    @Column(name = "end_hour")
    private Instant endHour;

    @ManyToMany(mappedBy = "schedules")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<GuidedTraining> guidedTrainings = new HashSet<>();

    @ManyToMany(mappedBy = "schedules")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<FitUser> fitUsers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWeekDay() {
        return weekDay;
    }

    public Schedule weekDay(String weekDay) {
        this.weekDay = weekDay;
        return this;
    }

    public void setWeekDay(String weekDay) {
        this.weekDay = weekDay;
    }

    public Instant getStartHour() {
        return startHour;
    }

    public Schedule startHour(Instant startHour) {
        this.startHour = startHour;
        return this;
    }

    public void setStartHour(Instant startHour) {
        this.startHour = startHour;
    }

    public Instant getEndHour() {
        return endHour;
    }

    public Schedule endHour(Instant endHour) {
        this.endHour = endHour;
        return this;
    }

    public void setEndHour(Instant endHour) {
        this.endHour = endHour;
    }

    public Set<GuidedTraining> getGuidedTrainings() {
        return guidedTrainings;
    }

    public Schedule guidedTrainings(Set<GuidedTraining> guidedTrainings) {
        this.guidedTrainings = guidedTrainings;
        return this;
    }

    public Schedule addGuidedTraining(GuidedTraining guidedTraining) {
        this.guidedTrainings.add(guidedTraining);
        guidedTraining.getSchedules().add(this);
        return this;
    }

    public Schedule removeGuidedTraining(GuidedTraining guidedTraining) {
        this.guidedTrainings.remove(guidedTraining);
        guidedTraining.getSchedules().remove(this);
        return this;
    }

    public void setGuidedTrainings(Set<GuidedTraining> guidedTrainings) {
        this.guidedTrainings = guidedTrainings;
    }

    public Set<FitUser> getFitUsers() {
        return fitUsers;
    }

    public Schedule fitUsers(Set<FitUser> fitUsers) {
        this.fitUsers = fitUsers;
        return this;
    }

    public Schedule addFitUser(FitUser fitUser) {
        this.fitUsers.add(fitUser);
        fitUser.getSchedules().add(this);
        return this;
    }

    public Schedule removeFitUser(FitUser fitUser) {
        this.fitUsers.remove(fitUser);
        fitUser.getSchedules().remove(this);
        return this;
    }

    public void setFitUsers(Set<FitUser> fitUsers) {
        this.fitUsers = fitUsers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Schedule)) {
            return false;
        }
        return id != null && id.equals(((Schedule) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Schedule{" +
            "id=" + getId() +
            ", weekDay='" + getWeekDay() + "'" +
            ", startHour='" + getStartHour() + "'" +
            ", endHour='" + getEndHour() + "'" +
            "}";
    }
}
