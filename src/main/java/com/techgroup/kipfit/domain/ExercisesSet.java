package com.techgroup.kipfit.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A ExercisesSet.
 */
@Entity
@Table(name = "exercises_set")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ExercisesSet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type")
    private Integer type;

    @Column(name = "rest_time")
    private Integer restTime;

    @OneToMany(mappedBy = "exercisesSet")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<ExercisesSetType> exercisesSetTypes = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "exercises_set_exercise",
               joinColumns = @JoinColumn(name = "exercises_set_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "exercise_id", referencedColumnName = "id"))
    private Set<Exercise> exercises = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "exercisesSets", allowSetters = true)
    private Routine routine;

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

    public ExercisesSet type(Integer type) {
        this.type = type;
        return this;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getRestTime() {
        return restTime;
    }

    public ExercisesSet restTime(Integer restTime) {
        this.restTime = restTime;
        return this;
    }

    public void setRestTime(Integer restTime) {
        this.restTime = restTime;
    }

    public Set<ExercisesSetType> getExercisesSetTypes() {
        return exercisesSetTypes;
    }

    public ExercisesSet exercisesSetTypes(Set<ExercisesSetType> exercisesSetTypes) {
        this.exercisesSetTypes = exercisesSetTypes;
        return this;
    }

    public ExercisesSet addExercisesSetType(ExercisesSetType exercisesSetType) {
        this.exercisesSetTypes.add(exercisesSetType);
        exercisesSetType.setExercisesSet(this);
        return this;
    }

    public ExercisesSet removeExercisesSetType(ExercisesSetType exercisesSetType) {
        this.exercisesSetTypes.remove(exercisesSetType);
        exercisesSetType.setExercisesSet(null);
        return this;
    }

    public void setExercisesSetTypes(Set<ExercisesSetType> exercisesSetTypes) {
        this.exercisesSetTypes = exercisesSetTypes;
    }

    public Set<Exercise> getExercises() {
        return exercises;
    }

    public ExercisesSet exercises(Set<Exercise> exercises) {
        this.exercises = exercises;
        return this;
    }

    public ExercisesSet addExercise(Exercise exercise) {
        this.exercises.add(exercise);
        exercise.getExercisesSets().add(this);
        return this;
    }

    public ExercisesSet removeExercise(Exercise exercise) {
        this.exercises.remove(exercise);
        exercise.getExercisesSets().remove(this);
        return this;
    }

    public void setExercises(Set<Exercise> exercises) {
        this.exercises = exercises;
    }

    public Routine getRoutine() {
        return routine;
    }

    public ExercisesSet routine(Routine routine) {
        this.routine = routine;
        return this;
    }

    public void setRoutine(Routine routine) {
        this.routine = routine;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ExercisesSet)) {
            return false;
        }
        return id != null && id.equals(((ExercisesSet) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ExercisesSet{" +
            "id=" + getId() +
            ", type=" + getType() +
            ", restTime=" + getRestTime() +
            "}";
    }
}
