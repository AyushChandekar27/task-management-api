package com.taskmanager.service;

import com.taskmanager.dto.TaskRequestDTO;
import com.taskmanager.dto.TaskResponseDTO;
import com.taskmanager.enums.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskService {
    Page<TaskResponseDTO> getAllTasks(TaskStatus status, Pageable pageable);
    TaskResponseDTO getTaskById(Long id);
    TaskResponseDTO createTask(TaskRequestDTO dto);
    TaskResponseDTO updateTask(Long id, TaskRequestDTO dto);
    void deleteTask(Long id);
}