import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  updateUserForm!: FormGroup;
  allUsers: any;
  showDublicateUsername: boolean = false;
  userId!: number;
  userData: any;

  constructor(
    private fb: FormBuilder,
    private editUser: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((id) => {
      this.userId = Number(id.get('id'));
    });
    this.updateUserForm = this.fb.group({
      email: ['', [Validators.email]],
      first_name: [''],
      last_name: [''],
      username: [''],
      password: [''],
      phone_number: [null],
      department: [''],
    });
    this.getUser(this.userId);
  }

  getUser(id: number) {
    this.editUser.getUserById(id).subscribe((res) => {
      this.setFormValue(res);
    });
  }

  setFormValue(data: any) {
    this.updateUserForm.get('email')?.setValue(data.email);
    this.updateUserForm.get('first_name')?.setValue(data.first_name);
    this.updateUserForm.get('last_name')?.setValue(data.last_name);
    this.updateUserForm.get('username')?.setValue(data.username);
    this.updateUserForm.get('password')?.setValue(data.password);
    this.updateUserForm.get('phone_number')?.setValue(data.phone_number);
    this.updateUserForm.get('department')?.setValue(data.department);
  }

  updateUser(form: FormGroup) {
    if (form.valid) {
      this.editUser
        .editUser(this.userId, {
          id: this.userId,
          email: this.updateUserForm.get('email')?.value,
          first_name: this.updateUserForm.get('first_name')?.value,
          last_name: this.updateUserForm.get('last_name')?.value,
          username: this.updateUserForm.get('username')?.value,
          password: this.updateUserForm.get('password')?.value,
          phone_number: this.updateUserForm.get('phone_number')?.value,
          department: this.updateUserForm.get('department')?.value,
        })
        .subscribe(
          () => {},
          (err) => {
            console.log(err);
          },
          () => {
            Swal.fire({
              title: 'This user has been updated',
              icon: 'success',
              timer: 1000,
            }).then(() => {
              this.router.navigateByUrl('/');
            });
          }
        );
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
