package com.techgroup.kipfit.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ObjectiveType.
 */
@Entity
@Table(name = "objective_type")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ObjectiveType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "objective_name")
    private String objectiveName;

    @Column(name = "description")
    private String description;

    @ManyToOne (fetch = FetchType.EAGER)
    @JsonIgnoreProperties(value = "objectiveTypes", allowSetters = true)
    private Plan plan;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getObjectiveName() {
        return objectiveName;
    }

    public ObjectiveType objectiveName(String objectiveName) {
        this.objectiveName = objectiveName;
        return this;
    }

    public void setObjectiveName(String objectiveName) {
        this.objectiveName = objectiveName;
    }

    public String getDescription() {
        return description;
    }

    public ObjectiveType description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Plan getPlan() {
        return plan;
    }

    public ObjectiveType plan(Plan plan) {
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
        if (!(o instanceof ObjectiveType)) {
            return false;
        }
        return id != null && id.equals(((ObjectiveType) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ObjectiveType{" +
            "id=" + getId() +
            ", objectiveName='" + getObjectiveName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
