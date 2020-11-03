package com.techgroup.kipfit.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import com.techgroup.kipfit.domain.enumeration.ExercisesSetTypeName;

/**
 * A ExercisesSetType.
 */
@Entity
@Table(name = "exercises_set_type")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ExercisesSetType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_name")
    private ExercisesSetTypeName typeName;

    @ManyToOne
    @JsonIgnoreProperties(value = "exercisesSetTypes", allowSetters = true)
    private ExercisesSet exercisesSet;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ExercisesSetTypeName getTypeName() {
        return typeName;
    }

    public ExercisesSetType typeName(ExercisesSetTypeName typeName) {
        this.typeName = typeName;
        return this;
    }

    public void setTypeName(ExercisesSetTypeName typeName) {
        this.typeName = typeName;
    }

    public ExercisesSet getExercisesSet() {
        return exercisesSet;
    }

    public ExercisesSetType exercisesSet(ExercisesSet exercisesSet) {
        this.exercisesSet = exercisesSet;
        return this;
    }

    public void setExercisesSet(ExercisesSet exercisesSet) {
        this.exercisesSet = exercisesSet;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ExercisesSetType)) {
            return false;
        }
        return id != null && id.equals(((ExercisesSetType) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ExercisesSetType{" +
            "id=" + getId() +
            ", typeName='" + getTypeName() + "'" +
            "}";
    }
}
