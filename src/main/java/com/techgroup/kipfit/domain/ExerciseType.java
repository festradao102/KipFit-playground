package com.techgroup.kipfit.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Set;

import com.techgroup.kipfit.domain.enumeration.ExercisesSetTypeName;

/**
 * A ExerciseType.
 */
@Entity
@Table(name = "exercise_type")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ExerciseType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_name")
    private ExercisesSetTypeName typeName;

    @OneToMany(mappedBy = "exerciseType", fetch = FetchType.EAGER)
    @JsonIgnoreProperties(value = "exerciseType", allowSetters = true)
    private Set<Exercise> exercises;

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

    public ExerciseType typeName(ExercisesSetTypeName typeName) {
        this.typeName = typeName;
        return this;
    }

    public void setTypeName(ExercisesSetTypeName typeName) {
        this.typeName = typeName;
    }

    public Set<Exercise> getExercise() {
        return exercises;
    }

    public ExerciseType exercise(Set<Exercise> exercise) {
        this.exercises = exercise;
        return this;
    }

    public ExerciseType addExercise(Exercise exercise) {
        this.exercises.add(exercise);
        exercise.setExerciseTypes(this);
        return this;
    }

    public ExerciseType removeExercise(Exercise exercise) {
        this.exercises.remove(exercise);
        exercise.setExerciseTypes(this);
        return this;
    }

    public void setExercise(Set<Exercise> exercises) {
        this.exercises = exercises;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ExerciseType)) {
            return false;
        }
        return id != null && id.equals(((ExerciseType) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ExerciseType{" +
                "id=" + getId() +
                ", typeName='" + getTypeName() + "'" +
                "}";
    }
}


