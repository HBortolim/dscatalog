package com.hmbsoftwares.dscatalog.repositories;

import com.hmbsoftwares.dscatalog.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
}