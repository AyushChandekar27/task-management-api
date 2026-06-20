import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Task, TaskRequest, TaskStatus, PageResponse } from '../../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
    private readonly API = 'http://localhost:8080/api/tasks';

    constructor(private http: HttpClient) {}

    getAll(page = 0, size = 10, status?: TaskStatus, sortBy = 'createdAt', sortDir = 'desc') {
        let params = new HttpParams()
            .set('page', page)
            .set('size', size)
            .set('sortBy', sortBy)
            .set('sortDir', sortDir);
        if (status) params = params.set('status', status);
        return this.http.get<PageResponse<Task>>(this.API, { params });
    }

    getById(id: number) {
        return this.http.get<Task>(`${this.API}/${id}`);
    }

    create(dto: TaskRequest) {
        return this.http.post<Task>(this.API, dto);
    }

    update(id: number, dto: TaskRequest) {
        return this.http.put<Task>(`${this.API}/${id}`, dto);
    }

    delete(id: number) {
        return this.http.delete<void>(`${this.API}/${id}`);
    }
}