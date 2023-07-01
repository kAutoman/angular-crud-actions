
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})

export class EventListComponent implements OnInit {
  Employee: any = [];
  Guests: any = [];
  submitted = false;
  employeeForm: FormGroup;
  editForm: FormGroup;
  employeeData: [];
  editingId:0;

  constructor(
    private apiService: ApiService,
    public fb: FormBuilder,
  ) {
    this.readEmployee();
    this.mainForm();
  }


  
  ngOnInit() {
    this.updateEmployee();
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      date: ['', [Validators.required]],
      guests: ['', [Validators.required]],
    });
  }

  // Choose options with select-dropdown
  updateEditProfile(e) {
    // this.editForm.get('designation').setValue(e, {
    //   onlySelf: true,
    // });
  }

  // Getter to access form control
  get myEditForm() {
    return this.editForm.controls;
  }

  getEvent(id) {
    this.editingId = id;
    this.apiService.getEvent(id).subscribe((data) => {
      this.editForm.setValue({
        name: data['name'],
        date: data['date'],
        guests: [],
      });
    });
  }

  updateEmployee() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      date: ['', [Validators.required]],
      guests: ['', [Validators.required]],
    });
  }

  onEditSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        this.apiService.updateEvent(this.editingId, this.editForm.value).subscribe({
          complete: () => {
            location.href="/events"
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
    }
  }

  mainForm() {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      date: ['', [Validators.required]],
      guests: ['', [Validators.required]],
    });
  }

  // Choose designation with select dropdown
  updateProfile(e) {
    // this.employeeForm.get('designation').setValue(e, {
    //   onlySelf: true,
    // });
  }

  // Getter to access form control
  get myForm() {
    return this.employeeForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.employeeForm.valid) {
      return false;
    } else {
      return this.apiService.createEvent(this.employeeForm.value).subscribe({
        complete: () => {
          console.log('Event successfully created!'),
          location.href="/events"
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  readEmployee() {
    this.apiService.getEvents().subscribe((data) => {
      this.Employee = data;
    });
    this.apiService.getEmployees().subscribe((data) => {
      this.Guests = data;
    });
  }

  removeEvent(employee, index) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteEmployee(employee.id).subscribe((data) => {
        this.Employee.splice(index, 1);
      });
    }
  }
}
