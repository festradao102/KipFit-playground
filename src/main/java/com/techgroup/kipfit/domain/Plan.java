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
 * A Plan.
 */
@Entity
@Table(name = "plan")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Plan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "objective")
    private String objective;

    @Column(name = "date_created")
    private Instant dateCreated;

    @Column(name = "creator_name")
    private String creatorName;

    @Column(name = "active")
    private Boolean active;

    @OneToMany(mappedBy = "plan")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Routine> routines;

    @OneToMany(mappedBy = "plan", fetch = FetchType.EAGER)
    // @Fetch (fetch = FetchMode.SUBSELECT)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<ObjectiveType> objectiveTypes;

    @ManyToOne
    @JsonIgnoreProperties(value = {"plans", "measurements"}, allowSetters = true)
    //@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
    private Subscriber subscriber;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getObjective() {
        return objective;
    }

    public Plan objective(String objective) {
        this.objective = objective;
        return this;
    }

    public void setObjective(String objective) {
        this.objective = objective;
    }

    public Instant getDateCreated() {
        return dateCreated;
    }

    public Plan dateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
        return this;
    }

    public void setDateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
    }

    public String getCreatorName() {
        return creatorName;
    }

    public Plan creatorName(String creatorName) {
        this.creatorName = creatorName;
        return this;
    }

    public void setCreatorName(String creatorName) {
        this.creatorName = creatorName;
    }

    public Boolean isActive() {
        return active;
    }

    public Plan active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Set<Routine> getRoutines() {
        return routines;
    }

    public Plan routines(Set<Routine> routines) {
        this.routines = routines;
        return this;
    }

    public Plan addRoutine(Routine routine) {
        this.routines.add(routine);
        routine.setPlan(this);
        return this;
    }

    public Plan removeRoutine(Routine routine) {
        this.routines.remove(routine);
        routine.setPlan(null);
        return this;
    }

    public void setRoutines(Set<Routine> routines) {
        this.routines = routines;
    }

    public Set<ObjectiveType> getObjectiveTypes() {
        return objectiveTypes;
    }

    public Plan objectiveTypes(Set<ObjectiveType> objectiveTypes) {
        this.objectiveTypes = objectiveTypes;
        return this;
    }

    public Plan addObjectiveType(ObjectiveType objectiveType) {
        this.objectiveTypes.add(objectiveType);
        objectiveType.setPlan(this);
        return this;
    }

    public Plan removeObjectiveType(ObjectiveType objectiveType) {
        this.objectiveTypes.remove(objectiveType);
        objectiveType.setPlan(null);
        return this;
    }

    public void setObjectiveTypes(Set<ObjectiveType> objectiveTypes) {
        this.objectiveTypes = objectiveTypes;
    }

    public Subscriber getSubscriber() {
        return subscriber;
    }

    public Plan subscriber(Subscriber subscriber) {
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
        if (!(o instanceof Plan)) {
            return false;
        }
        return id != null && id.equals(((Plan) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Plan{" +
            "id=" + getId() +
            ", objective='" + getObjective() + "'" +
            ", dateCreated='" + getDateCreated() + "'" +
            ", creatorName='" + getCreatorName() + "'" +
            ", active='" + isActive() + "'" +
            "}";
    }
}
