package com.hmbsoftwares.dscatalog.services;

import static org.mockito.Mockito.doThrow;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.hmbsoftwares.dscatalog.dto.ProductDTO;
import com.hmbsoftwares.dscatalog.entities.Category;
import com.hmbsoftwares.dscatalog.entities.Product;
import com.hmbsoftwares.dscatalog.repositories.CategoryRepository;
import com.hmbsoftwares.dscatalog.repositories.ProductRepository;
import com.hmbsoftwares.dscatalog.services.exceptions.DatabaseException;
import com.hmbsoftwares.dscatalog.services.exceptions.ResourceNotFoundException;
import com.hmbsoftwares.dscatalog.tests.Factory;

@ExtendWith(SpringExtension.class)
public class ProductServiceTests {
	
	private long existingId;
	private long nonExistingId;
	private long dependentId;
	private PageImpl<Product> page;
	private Product Product;
	private Category category;
	private ProductDTO ProductDTO;

	@InjectMocks
	private ProductService service;
	
	@Mock
	private ProductRepository repository;
	
	@Mock
	private CategoryRepository categoryRepository;
	
	@BeforeEach
	void setUp() throws Exception{
		existingId = 1L;
		nonExistingId = 1000L;
		dependentId = 4L;
		Product = Factory.createProduct();
		category = Factory.createCategory();
		page = new PageImpl<>(List.of(Product));
		ProductDTO = Factory.createProductDTO();
		
		
		Mockito.when(repository.findAll((Pageable)ArgumentMatchers.any())).thenReturn(page);
		
		Mockito.when(repository.save(ArgumentMatchers.any())).thenReturn(Product);
		
		Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(Product));
		
		Mockito.when(repository.findById(nonExistingId)).thenReturn(Optional.empty());
		
		Mockito.when(repository.getOne(existingId)).thenReturn(Product);
		
		Mockito.when(repository.getOne(nonExistingId)).thenThrow(ResourceNotFoundException.class);
		
		Mockito.when(categoryRepository.getOne(existingId)).thenReturn(category);
		
		Mockito.when(categoryRepository.getOne(nonExistingId)).thenThrow(ResourceNotFoundException.class);
		
		Mockito.doNothing().when(repository).deleteById(existingId);
		
		doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExistingId);
		
		doThrow(DataIntegrityViolationException.class).when(repository).deleteById(dependentId);
	}
	
	@Test
	public void deleteShoulDoNothingWhenIdExists() {
		
		Assertions.assertDoesNotThrow(() -> {
			service.deleteProduct(existingId);
		});
		
		Mockito.verify(repository,Mockito.times(1)).deleteById(existingId);
	}
	
	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
		
		Assertions.assertThrows(ResourceNotFoundException.class,() -> {
			service.deleteProduct(nonExistingId);
		});
		
		Mockito.verify(repository,Mockito.times(1)).deleteById(nonExistingId);
	}
	
	@Test
	public void  deleteShouldThrowDatabaseExceptionWhenIdDependentId() {
		Assertions.assertThrows(DatabaseException.class,() -> {
			service.deleteProduct(dependentId);
		});
		
		Mockito.verify(repository,Mockito.times(1)).deleteById(dependentId);
	}
	
	@Test
	public void findAllPagedShouldReturnPage() {
		
		Pageable pageable = PageRequest.of(0, 10);
		
		Page<ProductDTO> result = service.findAllPaged(pageable);
		
		Assertions.assertNotNull(result);
		Mockito.verify(repository).findAll(pageable);
	}
	
	@Test
	public void findByIdShouldReturnProductDTOWhenIdExists() {
		ProductDTO result = service.findById(existingId);
		
		Assertions.assertNotNull(result);
		Assertions.assertDoesNotThrow(()->{
			service.findById(existingId);
		});
		Mockito.verify(repository,Mockito.times(2)).findById(existingId);
	}
	
	@Test
	public void findByIdShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
		
		Assertions.assertThrows(ResourceNotFoundException.class, ()-> {
			service.findById(nonExistingId);
		});
		Mockito.verify(repository).findById(nonExistingId);
	}
	
	@Test
	public void updateShouldReturnProductDTOWhenIdExists() {
		
		ProductDTO result = service.updateProduct(existingId, ProductDTO);
		
		Assertions.assertNotNull(result);
		Assertions.assertDoesNotThrow(()-> {
			service.updateProduct(existingId, ProductDTO);
		});
		Mockito.verify(repository,Mockito.times(2)).getOne(existingId);
		Mockito.verify(repository,Mockito.times(2)).save(Product);
	}
	
	@Test
	public void updateShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
		Assertions.assertThrows(ResourceNotFoundException.class, ()-> {
			service.updateProduct(nonExistingId, ProductDTO);
		});
		
		Mockito.verify(repository).getOne(nonExistingId);
	}
	
	
	
}
