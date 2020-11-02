package com.techgroup.kipfit.repository;

import com.techgroup.kipfit.domain.ObjectiveType;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ObjectiveType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ObjectiveTypeRepository extends JpaRepository<ObjectiveType, Long> {
}
