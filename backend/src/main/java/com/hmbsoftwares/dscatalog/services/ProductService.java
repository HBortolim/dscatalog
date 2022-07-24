package com.hmbsoftwares.dscatalog.services;

import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hmbsoftwares.dscatalog.dto.CategoryDTO;
import com.hmbsoftwares.dscatalog.dto.ProductDTO;
import com.hmbsoftwares.dscatalog.entities.Category;
import com.hmbsoftwares.dscatalog.entities.Product;
import com.hmbsoftwares.dscatalog.repositories.CategoryRepository;
import com.hmbsoftwares.dscatalog.repositories.ProductRepository;
import com.hmbsoftwares.dscatalog.services.exceptions.DatabaseException;
import com.hmbsoftwares.dscatalog.services.exceptions.ResourceNotFoundException;

//registra essa classe como um componente que vai participar do sistema de injeção de dependência automatizado do spring
@Service
public class ProductService {
	
	@Autowired
	private ProductRepository repository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(Long categoryId,Pageable pageable){
		Category category = (categoryId == 0) ? null : categoryRepository.getOne(categoryId);
		Page<Product> page = repository.find(category,pageable);
		return page.map(ProductDTO::new);
	}

	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		Optional<Product> obj = repository.findById(id);
		Product entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found!"));
		return new ProductDTO(entity, entity.getCategories());
	}

	@Transactional
	public ProductDTO insertProduct(ProductDTO dto) {
		Product entity = new Product();
		copyDtoToEntity(dto,entity);
		entity = repository.save(entity);
		return new ProductDTO(entity);
	}

	@Transactional
	public ProductDTO updateProduct(Long id, ProductDTO dto) {
		try {
			Product entity = repository.getOne(id);
			copyDtoToEntity(dto,entity);
			entity = repository.save(entity);
			return new ProductDTO(entity);
		}
		catch(javax.persistence.EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found "+ id);
		}
	}

	public void deleteProduct(Long id) {
		try {
			repository.deleteById(id);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found "+ id);
		}
		catch(DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation!");
		}		
	}
	private void copyDtoToEntity(ProductDTO dto, Product entity) {
		
		entity.setName(dto.getName());
		entity.setDescription(dto.getDescription());
		entity.setDate(dto.getDate());
		entity.setImgUrl(dto.getImgUrl());
		entity.setPrice(dto.getPrice());
		
		entity.getCategories().clear();
		for(CategoryDTO catDto : dto.getCategories()) {
			Category category = categoryRepository.getOne(catDto.getId());
			entity.getCategories().add(category);
		}
	}
	
}
