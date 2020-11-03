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
 * A Subscriber.
 */
@Entity
@Table(name = "subscriber")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Subscriber implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "initial_date")
    private Instant initialDate;

    @Column(name = "medical_conditions")
    private String medicalConditions;

    @Column(name = "payment_freq")
    private String paymentFreq;

    @OneToOne
    @JoinColumn(unique = true)
    private SubscriptionPayment subscriptionPayment;

    @OneToMany(mappedBy = "subscriber")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Measurement> measurements = new HashSet<>();

    @OneToMany(mappedBy = "subscriber")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Plan> plans = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "subscriber_guided_training",
               joinColumns = @JoinColumn(name = "subscriber_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "guided_training_id", referencedColumnName = "id"))
    private Set<GuidedTraining> guidedTrainings = new HashSet<>();

    @OneToOne(mappedBy = "subscriber")
    @JsonIgnore
    private FitUser fitUser;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getInitialDate() {
        return initialDate;
    }

    public Subscriber initialDate(Instant initialDate) {
        this.initialDate = initialDate;
        return this;
    }

    public void setInitialDate(Instant initialDate) {
        this.initialDate = initialDate;
    }

    public String getMedicalConditions() {
        return medicalConditions;
    }

    public Subscriber medicalConditions(String medicalConditions) {
        this.medicalConditions = medicalConditions;
        return this;
    }

    public void setMedicalConditions(String medicalConditions) {
        this.medicalConditions = medicalConditions;
    }

    public String getPaymentFreq() {
        return paymentFreq;
    }

    public Subscriber paymentFreq(String paymentFreq) {
        this.paymentFreq = paymentFreq;
        return this;
    }

    public void setPaymentFreq(String paymentFreq) {
        this.paymentFreq = paymentFreq;
    }

    public SubscriptionPayment getSubscriptionPayment() {
        return subscriptionPayment;
    }

    public Subscriber subscriptionPayment(SubscriptionPayment subscriptionPayment) {
        this.subscriptionPayment = subscriptionPayment;
        return this;
    }

    public void setSubscriptionPayment(SubscriptionPayment subscriptionPayment) {
        this.subscriptionPayment = subscriptionPayment;
    }

    public Set<Measurement> getMeasurements() {
        return measurements;
    }

    public Subscriber measurements(Set<Measurement> measurements) {
        this.measurements = measurements;
        return this;
    }

    public Subscriber addMeasurement(Measurement measurement) {
        this.measurements.add(measurement);
        measurement.setSubscriber(this);
        return this;
    }

    public Subscriber removeMeasurement(Measurement measurement) {
        this.measurements.remove(measurement);
        measurement.setSubscriber(null);
        return this;
    }

    public void setMeasurements(Set<Measurement> measurements) {
        this.measurements = measurements;
    }

    public Set<Plan> getPlans() {
        return plans;
    }

    public Subscriber plans(Set<Plan> plans) {
        this.plans = plans;
        return this;
    }

    public Subscriber addPlan(Plan plan) {
        this.plans.add(plan);
        plan.setSubscriber(this);
        return this;
    }

    public Subscriber removePlan(Plan plan) {
        this.plans.remove(plan);
        plan.setSubscriber(null);
        return this;
    }

    public void setPlans(Set<Plan> plans) {
        this.plans = plans;
    }

    public Set<GuidedTraining> getGuidedTrainings() {
        return guidedTrainings;
    }

    public Subscriber guidedTrainings(Set<GuidedTraining> guidedTrainings) {
        this.guidedTrainings = guidedTrainings;
        return this;
    }

    public Subscriber addGuidedTraining(GuidedTraining guidedTraining) {
        this.guidedTrainings.add(guidedTraining);
        guidedTraining.getSubscribers().add(this);
        return this;
    }

    public Subscriber removeGuidedTraining(GuidedTraining guidedTraining) {
        this.guidedTrainings.remove(guidedTraining);
        guidedTraining.getSubscribers().remove(this);
        return this;
    }

    public void setGuidedTrainings(Set<GuidedTraining> guidedTrainings) {
        this.guidedTrainings = guidedTrainings;
    }

    public FitUser getFitUser() {
        return fitUser;
    }

    public Subscriber fitUser(FitUser fitUser) {
        this.fitUser = fitUser;
        return this;
    }

    public void setFitUser(FitUser fitUser) {
        this.fitUser = fitUser;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Subscriber)) {
            return false;
        }
        return id != null && id.equals(((Subscriber) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Subscriber{" +
            "id=" + getId() +
            ", initialDate='" + getInitialDate() + "'" +
            ", medicalConditions='" + getMedicalConditions() + "'" +
            ", paymentFreq='" + getPaymentFreq() + "'" +
            "}";
    }
}
