package com.techgroup.kipfit.repository;

import com.techgroup.kipfit.domain.SystemParameter;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the SystemParameter entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SystemParameterRepository extends JpaRepository<SystemParameter, Long> {
}
