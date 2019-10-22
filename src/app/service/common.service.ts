import {Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as Rx from "rxjs";

@Injectable()
export class CommonService {
    private messageSource = new BehaviorSubject("default message");
    currentMessage = this.messageSource.asObservable();
     subject = new Rx.AsyncSubject();
constructor(){
    this.subject.subscribe({
        next: (v) => console.log('observerA: ' + v)
      });
      
      this.subject.next(1);
      this.subject.next(2);
      this.subject.next(3);
      this.subject.next(4);
      
      this.subject.subscribe({
        next: (v) => console.log('observerB: ' + v)
      });
      
      this.subject.next(5);
    //   this.subject.complete();
}

    changeMessage(message: string) {
        this.subject.next(message)
        this.subject.complete();
      }
}