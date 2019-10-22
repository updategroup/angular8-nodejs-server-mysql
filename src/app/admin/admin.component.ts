import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../service/authentication.service';
import {User} from '../models/user';
import {Router} from '@angular/router';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    activeSibar = false;
    currentUser: User;

    constructor(private authenticationService: AuthenticationService,
                private router: Router) {
        this.authenticationService.currentUser.subscribe(data => {
            this.currentUser = data;
            if (this.currentUser.role !== 'ADMIN') {
              this.router.navigate(['']);
            }
        });
    }


    ngOnInit() {

    }

    changeSibar() {
        this.activeSibar = !this.activeSibar;
        console.log(this.activeSibar);
    }
}
