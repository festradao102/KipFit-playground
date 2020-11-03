package com.techgroup.kipfit.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A SystemParameter.
 */
@Entity
@Table(name = "system_parameter")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SystemParameter implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "gym_name")
    private String gymName;

    @Column(name = "logo_path")
    private String logoPath;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGymName() {
        return gymName;
    }

    public SystemParameter gymName(String gymName) {
        this.gymName = gymName;
        return this;
    }

    public void setGymName(String gymName) {
        this.gymName = gymName;
    }

    public String getLogoPath() {
        return logoPath;
    }

    public SystemParameter logoPath(String logoPath) {
        this.logoPath = logoPath;
        return this;
    }

    public void setLogoPath(String logoPath) {
        this.logoPath = logoPath;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SystemParameter)) {
            return false;
        }
        return id != null && id.equals(((SystemParameter) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SystemParameter{" +
            "id=" + getId() +
            ", gymName='" + getGymName() + "'" +
            ", logoPath='" + getLogoPath() + "'" +
            "}";
    }
}
