import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TaskService } from '../../core/services/task.service';

@Component({
    selector: 'app-task-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {
    form!: FormGroup;
    isEdit  = signal(false);
    taskId  = signal<number | null>(null);
    loading = signal(false);
    fetching = signal(false);
    error   = signal('');

    constructor(
        private fb: FormBuilder,
        private taskSvc: TaskService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.form = this.fb.group({
            title:       ['', [Validators.required, Validators.minLength(2)]],
            description: [''],
            status:      ['TODO', Validators.required]
        });

        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEdit.set(true);
            this.taskId.set(+id);
            this.fetching.set(true);
            this.taskSvc.getById(+id).subscribe({
                next: task => {
                    this.form.patchValue(task);
                    this.fetching.set(false);
                },
                error: () => {
                    this.error.set('Could not load task.');
                    this.fetching.set(false);
                }
            });
        }
    }

    get f() { return this.form.controls; }

    submit() {
        if (this.form.invalid) { this.form.markAllAsTouched(); return; }
        this.loading.set(true);
        this.error.set('');
        const dto = this.form.value;

        const req = this.isEdit()
            ? this.taskSvc.update(this.taskId()!, dto)
            : this.taskSvc.create(dto);

        req.subscribe({
            next: () => this.router.navigate(['/tasks']),
            error: () => {
                this.error.set('Something went wrong. Please try again.');
                this.loading.set(false);
            }
        });
    }
}