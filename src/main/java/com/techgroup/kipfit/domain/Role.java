package com.techgroup.kipfit.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Role.
 */
@Entity
@Table(name = "role")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Role implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "role_id")
    private Integer roleId;

    @Column(name = "role_name")
    private String roleName;

    @OneToMany(mappedBy = "role")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<FitUser> fitUsers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public Role roleId(Integer roleId) {
        this.roleId = roleId;
        return this;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public Role roleName(String roleName) {
        this.roleName = roleName;
        return this;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Set<FitUser> getFitUsers() {
        return fitUsers;
    }

    public Role fitUsers(Set<FitUser> fitUsers) {
        this.fitUsers = fitUsers;
        return this;
    }

    public Role addFitUser(FitUser fitUser) {
        this.fitUsers.add(fitUser);
        fitUser.setRole(this);
        return this;
    }

    public Role removeFitUser(FitUser fitUser) {
        this.fitUsers.remove(fitUser);
        fitUser.setRole(null);
        return this;
    }

    public void setFitUsers(Set<FitUser> fitUsers) {
        this.fitUsers = fitUsers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Role)) {
            return false;
        }
        return id != null && id.equals(((Role) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Role{" +
            "id=" + getId() +
            ", roleId=" + getRoleId() +
            ", roleName='" + getRoleName() + "'" +
            "}";
    }
}
