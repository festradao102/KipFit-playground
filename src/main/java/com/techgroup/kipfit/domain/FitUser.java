package com.techgroup.kipfit.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A FitUser.
 */
@Entity
@Table(name = "fit_user")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FitUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "legal_id")
    private String legalId;

    @Column(name = "bday")
    private Instant bday;

    @Column(name = "phone")
    private String phone;

    @Column(name = "emergency_phone")
    private String emergencyPhone;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToOne
    @JoinColumn(unique = true)
    private Subscriber subscriber;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "fit_user_schedule",
               joinColumns = @JoinColumn(name = "fit_user_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "schedule_id", referencedColumnName = "id"))
    private Set<Schedule> schedules = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "fitUsers", allowSetters = true)
    private Role role;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLegalId() {
        return legalId;
    }

    public FitUser legalId(String legalId) {
        this.legalId = legalId;
        return this;
    }

    public void setLegalId(String legalId) {
        this.legalId = legalId;
    }

    public Instant getBday() {
        return bday;
    }

    public FitUser bday(Instant bday) {
        this.bday = bday;
        return this;
    }

    public void setBday(Instant bday) {
        this.bday = bday;
    }

    public String getPhone() {
        return phone;
    }

    public FitUser phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmergencyPhone() {
        return emergencyPhone;
    }

    public FitUser emergencyPhone(String emergencyPhone) {
        this.emergencyPhone = emergencyPhone;
        return this;
    }

    public void setEmergencyPhone(String emergencyPhone) {
        this.emergencyPhone = emergencyPhone;
    }

    public User getUser() {
        return user;
    }

    public FitUser user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Subscriber getSubscriber() {
        return subscriber;
    }

    public FitUser subscriber(Subscriber subscriber) {
        this.subscriber = subscriber;
        return this;
    }

    public void setSubscriber(Subscriber subscriber) {
        this.subscriber = subscriber;
    }

    public Set<Schedule> getSchedules() {
        return schedules;
    }

    public FitUser schedules(Set<Schedule> schedules) {
        this.schedules = schedules;
        return this;
    }

    public FitUser addSchedule(Schedule schedule) {
        this.schedules.add(schedule);
        schedule.getFitUsers().add(this);
        return this;
    }

    public FitUser removeSchedule(Schedule schedule) {
        this.schedules.remove(schedule);
        schedule.getFitUsers().remove(this);
        return this;
    }

    public void setSchedules(Set<Schedule> schedules) {
        this.schedules = schedules;
    }

    public Role getRole() {
        return role;
    }

    public FitUser role(Role role) {
        this.role = role;
        return this;
    }

    public void setRole(Role role) {
        this.role = role;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FitUser)) {
            return false;
        }
        return id != null && id.equals(((FitUser) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FitUser{" +
            "id=" + getId() +
            ", legalId='" + getLegalId() + "'" +
            ", bday='" + getBday() + "'" +
            ", phone='" + getPhone() + "'" +
            ", emergencyPhone='" + getEmergencyPhone() + "'" +
            "}";
    }
}
