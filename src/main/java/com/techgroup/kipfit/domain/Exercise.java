package com.techgroup.kipfit.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Exercise.
 */
@Entity
@Table(name = "exercise")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Exercise implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "position")
    private String position;

    @Column(name = "instructions")
    private String instructions;

    @Column(name = "video_path")
    private String videoPath;

    @OneToMany(mappedBy = "exercise", fetch=FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<ExerciseType> exerciseTypes;

    @ManyToMany(mappedBy = "exercises" ,fetch = FetchType.EAGER)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<ExercisesSet> exercisesSets = new HashSet<>();

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

    public Exercise name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return position;
    }

    public Exercise position(String position) {
        this.position = position;
        return this;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getInstructions() {
        return instructions;
    }

    public Exercise instructions(String instructions) {
        this.instructions = instructions;
        return this;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public String getVideoPath() {
        return videoPath;
    }

    public Exercise videoPath(String videoPath) {
        this.videoPath = videoPath;
        return this;
    }

    public void setVideoPath(String videoPath) {
        this.videoPath = videoPath;
    }

    public Set<ExerciseType> getExerciseTypes() {
        return exerciseTypes;
    }

    public Exercise exerciseTypes(Set<ExerciseType> exerciseTypes) {
        this.exerciseTypes = exerciseTypes;
        return this;
    }

    public Exercise addExerciseType(ExerciseType exerciseType) {
        this.exerciseTypes.add(exerciseType);
        exerciseType.setExercise(this);
        return this;
    }

    public Exercise removeExerciseType(ExerciseType exerciseType) {
        this.exerciseTypes.remove(exerciseType);
        exerciseType.setExercise(null);
        return this;
    }

    public void setExerciseTypes(Set<ExerciseType> exerciseTypes) {
        this.exerciseTypes = exerciseTypes;
    }

    public Set<ExercisesSet> getExercisesSets() {
        return exercisesSets;
    }

    public Exercise exercisesSets(Set<ExercisesSet> exercisesSets) {
        this.exercisesSets = exercisesSets;
        return this;
    }

    public Exercise addExercisesSet(ExercisesSet exercisesSet) {
        this.exercisesSets.add(exercisesSet);
        exercisesSet.getExercises().add(this);
        return this;
    }

    public Exercise removeExercisesSet(ExercisesSet exercisesSet) {
        this.exercisesSets.remove(exercisesSet);
        exercisesSet.getExercises().remove(this);
        return this;
    }

    public void setExercisesSets(Set<ExercisesSet> exercisesSets) {
        this.exercisesSets = exercisesSets;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Exercise)) {
            return false;
        }
        return id != null && id.equals(((Exercise) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Exercise{" +
                "id=" + getId() +
                ", name='" + getName() + "'" +
                ", position='" + getPosition() + "'" +
                ", instructions='" + getInstructions() + "'" +
                ", videoPath='" + getVideoPath() + "'" +
                "}";
    }
}

