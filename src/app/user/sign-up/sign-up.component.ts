import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../../models/user';
import {AuthenticationService} from '../../service/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    user = new User();
    errEmail = false;
    showSpinner= false;

    constructor(private authenticationService: AuthenticationService,
                private router: Router) {
    }

    ngOnInit() {
    }

    register(user) {
        this.showSpinner= true;
        this.authenticationService.register(user).subscribe(data => {
            if (!data.type && data.email) {
                this.showSpinner=false;
                this.errEmail = true;
                setTimeout(() => {
                   this.errEmail = false;
                   this.user = new User();
                }, 3000);
            } else {
                this.router.navigate(['/login']);
            }
        });
    }
}
