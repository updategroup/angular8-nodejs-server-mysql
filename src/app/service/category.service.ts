import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {Category} from '../models/category';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const headers= new HttpHeaders({'Content-Type': 'application/json'})
@Injectable()
export class CategoryService {
  url = {
    list: environment.apiUrl + 'blog/category/all',
    save: environment.apiUrl + 'blog/category/save',
    delete: environment.apiUrl + 'blog/category/delete',
    getId: environment.apiUrl + 'blog/category/getById',
    count: environment.apiUrl + 'blog/category/count'
  };

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.url.list);
  }

  save(data: Category): Observable<any> {
    return this.http.post(this.url.save, data, httpOptions);
  }

  delete(id): Observable<any> {
    return this.http.get(this.url.delete, {headers: headers, params: id});
  }

  getById(id): Observable<any> {
    return this.http.get(this.url.getId,{headers: headers, params: id});
  }

  countCategory(): Observable<number> {
    return this.http.get<number>(this.url.count);
  }
}