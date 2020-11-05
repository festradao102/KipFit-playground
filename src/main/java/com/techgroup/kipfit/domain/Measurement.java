package com.techgroup.kipfit.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Measurement.
 */
@Entity
@Table(name = "measurement")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Measurement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "metabolicage")
    private Integer metabolicage;

    @Column(name = "bmr")
    private Integer bmr;

    @Column(name = "bone_mass")
    private Integer boneMass;

    @Column(name = "height")
    private Integer height;

    @Column(name = "weight")
    private Integer weight;

    @Column(name = "fat_percentage")
    private Integer fatPercentage;

    @Column(name = "neck")
    private Integer neck;

    @Column(name = "right_arm")
    private Integer rightArm;

    @Column(name = "left_arm")
    private Integer leftArm;

    @Column(name = "wrist")
    private Integer wrist;

    @Column(name = "core")
    private Integer core;

    @Column(name = "hip")
    private Integer hip;

    @Column(name = "thorax")
    private Integer thorax;

    @Column(name = "right_thigh")
    private Integer rightThigh;

    @Column(name = "left_thigh")
    private Integer leftThigh;

    @Column(name = "right_calve")
    private Integer rightCalve;

    @Column(name = "left_calve")
    private Integer leftCalve;

    @Column(name = "date_created")
    private Instant dateCreated;

    @ManyToOne
    @JsonIgnoreProperties(value = "measurements", allowSetters = true)
    @NotFound(action = NotFoundAction.IGNORE)
    private Subscriber subscriber;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getMetabolicage() {
        return metabolicage;
    }

    public Measurement metabolicage(Integer metabolicage) {
        this.metabolicage = metabolicage;
        return this;
    }

    public void setMetabolicage(Integer metabolicage) {
        this.metabolicage = metabolicage;
    }

    public Integer getBmr() {
        return bmr;
    }

    public Measurement bmr(Integer bmr) {
        this.bmr = bmr;
        return this;
    }

    public void setBmr(Integer bmr) {
        this.bmr = bmr;
    }

    public Integer getBoneMass() {
        return boneMass;
    }

    public Measurement boneMass(Integer boneMass) {
        this.boneMass = boneMass;
        return this;
    }

    public void setBoneMass(Integer boneMass) {
        this.boneMass = boneMass;
    }

    public Integer getHeight() {
        return height;
    }

    public Measurement height(Integer height) {
        this.height = height;
        return this;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public Integer getWeight() {
        return weight;
    }

    public Measurement weight(Integer weight) {
        this.weight = weight;
        return this;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Integer getFatPercentage() {
        return fatPercentage;
    }

    public Measurement fatPercentage(Integer fatPercentage) {
        this.fatPercentage = fatPercentage;
        return this;
    }

    public void setFatPercentage(Integer fatPercentage) {
        this.fatPercentage = fatPercentage;
    }

    public Integer getNeck() {
        return neck;
    }

    public Measurement neck(Integer neck) {
        this.neck = neck;
        return this;
    }

    public void setNeck(Integer neck) {
        this.neck = neck;
    }

    public Integer getRightArm() {
        return rightArm;
    }

    public Measurement rightArm(Integer rightArm) {
        this.rightArm = rightArm;
        return this;
    }

    public void setRightArm(Integer rightArm) {
        this.rightArm = rightArm;
    }

    public Integer getLeftArm() {
        return leftArm;
    }

    public Measurement leftArm(Integer leftArm) {
        this.leftArm = leftArm;
        return this;
    }

    public void setLeftArm(Integer leftArm) {
        this.leftArm = leftArm;
    }

    public Integer getWrist() {
        return wrist;
    }

    public Measurement wrist(Integer wrist) {
        this.wrist = wrist;
        return this;
    }

    public void setWrist(Integer wrist) {
        this.wrist = wrist;
    }

    public Integer getCore() {
        return core;
    }

    public Measurement core(Integer core) {
        this.core = core;
        return this;
    }

    public void setCore(Integer core) {
        this.core = core;
    }

    public Integer getHip() {
        return hip;
    }

    public Measurement hip(Integer hip) {
        this.hip = hip;
        return this;
    }

    public void setHip(Integer hip) {
        this.hip = hip;
    }

    public Integer getThorax() {
        return thorax;
    }

    public Measurement thorax(Integer thorax) {
        this.thorax = thorax;
        return this;
    }

    public void setThorax(Integer thorax) {
        this.thorax = thorax;
    }

    public Integer getRightThigh() {
        return rightThigh;
    }

    public Measurement rightThigh(Integer rightThigh) {
        this.rightThigh = rightThigh;
        return this;
    }

    public void setRightThigh(Integer rightThigh) {
        this.rightThigh = rightThigh;
    }

    public Integer getLeftThigh() {
        return leftThigh;
    }

    public Measurement leftThigh(Integer leftThigh) {
        this.leftThigh = leftThigh;
        return this;
    }

    public void setLeftThigh(Integer leftThigh) {
        this.leftThigh = leftThigh;
    }

    public Integer getRightCalve() {
        return rightCalve;
    }

    public Measurement rightCalve(Integer rightCalve) {
        this.rightCalve = rightCalve;
        return this;
    }

    public void setRightCalve(Integer rightCalve) {
        this.rightCalve = rightCalve;
    }

    public Integer getLeftCalve() {
        return leftCalve;
    }

    public Measurement leftCalve(Integer leftCalve) {
        this.leftCalve = leftCalve;
        return this;
    }

    public void setLeftCalve(Integer leftCalve) {
        this.leftCalve = leftCalve;
    }

    public Instant getDateCreated() {
        return dateCreated;
    }

    public Measurement dateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
        return this;
    }

    public void setDateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Subscriber getSubscriber() {
        return subscriber;
    }

    public Measurement subscriber(Subscriber subscriber) {
        this.subscriber = subscriber;
        return this;
    }

    public void setSubscriber(Subscriber subscriber) {
        this.subscriber = subscriber;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Measurement)) {
            return false;
        }
        return id != null && id.equals(((Measurement) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Measurement{" +
            "id=" + getId() +
            ", metabolicage=" + getMetabolicage() +
            ", bmr=" + getBmr() +
            ", boneMass=" + getBoneMass() +
            ", height=" + getHeight() +
            ", weight=" + getWeight() +
            ", fatPercentage=" + getFatPercentage() +
            ", neck=" + getNeck() +
            ", rightArm=" + getRightArm() +
            ", leftArm=" + getLeftArm() +
            ", wrist=" + getWrist() +
            ", core=" + getCore() +
            ", hip=" + getHip() +
            ", thorax=" + getThorax() +
            ", rightThigh=" + getRightThigh() +
            ", leftThigh=" + getLeftThigh() +
            ", rightCalve=" + getRightCalve() +
            ", leftCalve=" + getLeftCalve() +
            ", dateCreated='" + getDateCreated() + "'" +
            "}";
    }
}
