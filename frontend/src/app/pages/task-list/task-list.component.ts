import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../core/services/task.service';
import { AuthService } from '../../core/services/auth.service';
import { Task, TaskStatus } from '../../models/task.model';

interface Toast { id: number; message: string; type: 'success' | 'error'; }

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
    tasks      = signal<Task[]>([]);
    loading    = signal(true);
    deleting   = signal<number | null>(null);
    toasts     = signal<Toast[]>([]);
    toastId    = 0;

    // Pagination
    page       = signal(0);
    pageSize   = signal(10);
    totalPages = signal(0);
    totalItems = signal(0);

    // Filters
    statusFilter = signal<TaskStatus | ''>('');
    sortBy       = signal('createdAt');
    sortDir      = signal<'asc' | 'desc'>('desc');

    constructor(
        private taskSvc: TaskService,
        public  auth: AuthService,
        private router: Router
    ) {}

    ngOnInit() { this.load(); }

    load() {
        this.loading.set(true);
        const status = this.statusFilter() || undefined;
        this.taskSvc.getAll(this.page(), this.pageSize(), status as TaskStatus, this.sortBy(), this.sortDir())
            .subscribe({
                next: res => {
                    this.tasks.set(res.content);
                    this.totalPages.set(res.totalPages);
                    this.totalItems.set(res.totalElements);
                    this.loading.set(false);
                },
                error: () => {
                    this.showToast('Failed to load tasks.', 'error');
                    this.loading.set(false);
                }
            });
    }

    applyFilter() { this.page.set(0); this.load(); }

    goPage(p: number) { this.page.set(p); this.load(); }

    pages() { return Array.from({ length: this.totalPages() }, (_, i) => i); }

    delete(id: number) {
        if (!confirm('Delete this task?')) return;
        this.deleting.set(id);
        this.taskSvc.delete(id).subscribe({
            next: () => {
                this.showToast('Task deleted.', 'success');
                this.deleting.set(null);
                this.load();
            },
            error: () => {
                this.showToast('Could not delete task.', 'error');
                this.deleting.set(null);
            }
        });
    }

    edit(id: number) { this.router.navigate(['/tasks/edit', id]); }

    badgeClass(status: TaskStatus) {
        return {
            'badge-todo':     status === 'TODO',
            'badge-progress': status === 'IN_PROGRESS',
            'badge-done':     status === 'DONE'
        };
    }

    badgeIcon(status: TaskStatus) {
        return { TODO: 'radio_button_unchecked', IN_PROGRESS: 'pending', DONE: 'check_circle' }[status];
    }

    formatDate(d: string) {
        return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    showToast(message: string, type: 'success' | 'error') {
        const id = ++this.toastId;
        this.toasts.update(t => [...t, { id, message, type }]);
        setTimeout(() => this.toasts.update(t => t.filter(x => x.id !== id)), 3500);
    }
}