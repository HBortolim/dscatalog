package com.hmbsoftwares.dscatalog.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hmbsoftwares.dscatalog.entities.Category;
import com.hmbsoftwares.dscatalog.repositories.CategoryRepository;

//registra essa classe como um componente que vai participar do sistema de injeção de dependência automatizado do spring
@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository repository;
	
	public List<Category> findAll(){
		return repository.findAll();
	}
}
