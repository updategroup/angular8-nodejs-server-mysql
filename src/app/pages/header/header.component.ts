import {Component, OnInit} from '@angular/core';
import {HostListener} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {User} from '../../models/user';
import {AuthenticationService} from '../../service/authentication.service';
import { PostService } from '../../service/post.service';
import { CommonService } from '../../service/common.service';

@Component({
    selector: 'app-pages-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    activeMenu: boolean = false;
    active: string = 'block';
    currentUser: User;
    _search='';

    constructor(private router: Router,
                private authenticationService: AuthenticationService,
                private postService: PostService,
                private route: ActivatedRoute,
                private commonService: CommonService
                ) {
        this.getScreenSize();
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        console.log('curren  ',this.currentUser);
    }

    @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
        if (window.innerWidth < 767) {
            this.active = 'none';
        } else {
            this.active = 'block';
        }
    }

    ngOnInit() {
    }

    openMenu() {
        this.activeMenu = !this.activeMenu;
        this.active = (this.activeMenu) ? 'block' : 'none';
    }

    openAdmin() {
        this.router.navigate(['./admin']);
    }

    get isAdmin() {
        if(this.currentUser && this.currentUser.role === 'ADMIN') return true;
    }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }

  searchPost(){
    this.router.navigate(['./search',{search:this._search } ]);
    this._search='';
  }
}
