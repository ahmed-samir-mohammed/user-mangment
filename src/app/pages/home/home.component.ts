import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userList: any;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAllUserData();
  }

  getAllUserData() {
    this.userService.getUsers().subscribe((res) => {
      this.userList = res;
    });
  }

  deleteUser(id: number) {
    Swal.fire({
      title: 'Are you sure to delete this user?',
      icon: 'question',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then(() => {
      this.userService.deleteUser(id).subscribe(
        () => {},
        (err) => {
          console.log(err);
        },
        () => {
          this.getAllUserData();
        }
      );
    });
  }
}
