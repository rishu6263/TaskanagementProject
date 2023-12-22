package com.in28minutes.rest.webservices.restfulwebservices.todo;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.in28minutes.rest.webservices.restfulwebservices.todo.repository.TodoRepository;

@RestController
public class TodoJpaController {
private TodoService todoservice;
private TodoRepository repository;
	
	
	
	public TodoJpaController(TodoService todoservice,TodoRepository repository) {
		super();
		this.todoservice = todoservice;
		this.repository=repository;
	}



	@GetMapping("/users/{username}/todos")
	public List<Todo> retriveAllTodos(@PathVariable String username ) {
		//return todoservice.findByUsername(username);
		return repository.findByUsername(username);
	}
	@GetMapping("/users/{username}/todos/{id}")
	public Todo retriveTodo(@PathVariable String username,@PathVariable int id ) {
		//return todoservice.findById(id);
		return repository.findById(id).get();
	}
	@DeleteMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Todo> deleteTodo(@PathVariable String username,@PathVariable int id ) {
		//todoservice.deleteById(id);
		repository.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	@PutMapping("/users/{username}/todos/{id}")
	public Todo updateTodo(@PathVariable String username,@PathVariable int id, @RequestBody Todo todo) {
		//todoservice.updateTodo(todo);
		repository.save(todo);
		return todo;
	}
	@PostMapping("/users/{username}/todos/{id}")
	public Todo createTodo(@PathVariable String username,@PathVariable int id, @RequestBody Todo todo) {
		
		todo.setUsername(username);
		todo.setId(null);
		repository.save(todo);
		//todoservice.addTodo(username, todo.getDescription(), todo.getTargetDate(), todo.isDone());
		return todo;
	}
}

