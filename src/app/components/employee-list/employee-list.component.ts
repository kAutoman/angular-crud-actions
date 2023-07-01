
import { Component, OnInit, NgZone } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule  } from '@angular/forms';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})

export class EmployeeListComponent implements OnInit {
  Employee: any = [];
  submitted = false;
  employeeForm: FormGroup;
  EmployeeProfile: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin'];
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
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      allergies: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
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

  getEmployee(id) {
    this.editingId = id;
    this.apiService.getEmployee(id).subscribe((data) => {
      this.editForm.setValue({
        firstName: data['firstName'],
        lastName: data['lastName'],
        email: data['email'],
        allergies: data['allergies'],
        birthday: data['birthday'],
      });
    });
  }

  updateEmployee() {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      allergies: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
    });
  }

  onEditSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        this.apiService.updateEmployee(this.editingId, this.editForm.value).subscribe({
          complete: () => {
            location.href="/"
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
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      allergies: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
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
      return this.apiService.createEmployee(this.employeeForm.value).subscribe({
        complete: () => {
          console.log('Employee successfully created!'),
          location.href="/guests"
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  readEmployee() {
    this.apiService.getEmployees().subscribe((data) => {
      this.Employee = data;
    });
  }

  removeEmployee(employee, index) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteEmployee(employee.id).subscribe((data) => {
        this.Employee.splice(index, 1);
      });
    }
  }
}
