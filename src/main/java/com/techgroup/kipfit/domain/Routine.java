package com.techgroup.kipfit.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Routine.
 */
@Entity
@Table(name = "routine")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Routine implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type")
    private Integer type;

    @Column(name = "name")
    private String name;

    @Column(name = "freq")
    private String freq;

    @OneToMany(mappedBy = "routine")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<ExercisesSet> exercisesSets = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "routines", allowSetters = true)
    private Plan plan;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getType() {
        return type;
    }

    public Routine type(Integer type) {
        this.type = type;
        return this;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public Routine name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFreq() {
        return freq;
    }

    public Routine freq(String freq) {
        this.freq = freq;
        return this;
    }

    public void setFreq(String freq) {
        this.freq = freq;
    }

    public Set<ExercisesSet> getExercisesSets() {
        return exercisesSets;
    }

    public Routine exercisesSets(Set<ExercisesSet> exercisesSets) {
        this.exercisesSets = exercisesSets;
        return this;
    }

    public Routine addExercisesSet(ExercisesSet exercisesSet) {
        this.exercisesSets.add(exercisesSet);
        exercisesSet.setRoutine(this);
        return this;
    }

    public Routine removeExercisesSet(ExercisesSet exercisesSet) {
        this.exercisesSets.remove(exercisesSet);
        exercisesSet.setRoutine(null);
        return this;
    }

    public void setExercisesSets(Set<ExercisesSet> exercisesSets) {
        this.exercisesSets = exercisesSets;
    }

    public Plan getPlan() {
        return plan;
    }

    public Routine plan(Plan plan) {
        this.plan = plan;
        return this;
    }

    public void setPlan(Plan plan) {
        this.plan = plan;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Routine)) {
            return false;
        }
        return id != null && id.equals(((Routine) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Routine{" +
            "id=" + getId() +
            ", type=" + getType() +
            ", name='" + getName() + "'" +
            ", freq='" + getFreq() + "'" +
            "}";
    }
}
