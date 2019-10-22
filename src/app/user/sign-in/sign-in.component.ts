import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user';
import {AuthenticationService} from '../../service/authentication.service';
import {first} from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    user = new User();
    returnUrl: string;
    errFail = false;
    showSpinner = false;
    currentUser = new User();

    constructor(private route: ActivatedRoute,
                private router: Router,
                private authenticationService: AuthenticationService) {
        // if (this.authenticationService.currentUserValue) {
        //     this.router.navigate(['/']);
        // }
        this.authenticationService.currentUser.subscribe(x =>{
            this.currentUser = x;
            console.log('sign in:   ',this.currentUser);
        } );
        
    }

    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || '/';
    }

    onSubmit() {
        var param = new HttpParams()
        .set('email',this.user.email)
        .set('password', this.user.password);
        this.showSpinner=true;
        this.authenticationService.login(param)
            .pipe(first())
            .subscribe(
                data => {
                    this.showSpinner=false;
                    if (data.type==false) {
                        this.errFail = true;
                        setTimeout(() => {
                            this.errFail = false;
                            this.user = new User();
                        }, 3000);
                    } else {
                        this.errFail = false;
                        this.router.navigate([this.returnUrl]);
                    }

                },
                error => {
                });
    }

}
