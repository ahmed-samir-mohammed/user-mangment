import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  createUserForm!: FormGroup;
  allUsers: any;
  allUsersUesrname: string = '';
  showDublicateUsername: boolean = false;

  constructor(private fb: FormBuilder, private addUser: UserService) {}

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      email: ['', [Validators.email]],
      first_name: [''],
      last_name: [''],
      username: [''],
      password: [''],
      phone_number: [null],
      department: [''],
    });
    this.addUser.getUsers().subscribe((res) => {
      this.allUsers = res;
    });
  }

  createUser(form: FormGroup) {
    if (form.valid) {
      this.addUser
        .addNewUser({
          id: 1 + Math.random(),
          email: this.createUserForm.get('email')?.value,
          first_name: this.createUserForm.get('first_name')?.value,
          last_name: this.createUserForm.get('last_name')?.value,
          username: this.createUserForm.get('username')?.value,
          password: this.createUserForm.get('password')?.value,
          phone_number: this.createUserForm.get('phone_number')?.value,
          department: this.createUserForm.get('department')?.value,
        })
        .subscribe(
          () => {},
          (err) => {
            console.log(err);
          },
          () => {
            Swal.fire({
              title: 'This user has been added',
              icon: 'success',
              timer: 1000,
            });
          }
        );
    } else {
      Swal.fire({
        title: 'Please enter the required data',
        icon: 'error',
      });
    }
  }

  keyPressNumbers(event: {
    which: any;
    keyCode: any;
    preventDefault: () => void;
  }) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
}
