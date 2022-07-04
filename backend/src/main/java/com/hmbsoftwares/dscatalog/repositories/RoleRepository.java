package com.hmbsoftwares.dscatalog.repositories;

import com.hmbsoftwares.dscatalog.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
}