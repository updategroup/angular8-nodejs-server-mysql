import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { Post } from '../models/post';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const headers = new HttpHeaders({'Content-Type': 'application/json'})
@Injectable({
  providedIn: 'root'
})
export class PostService {
  public configCategory = new Subject<string>();
  public configTextSearch = new Subject<string>();
  public _categoryText = '';
  public _txtSeach = '';
  url = {
    list: environment.apiUrl + 'blog/post/all',
    save: environment.apiUrl + 'blog/post/save',
    delete: environment.apiUrl + 'blog/post/delete',
    getId: environment.apiUrl + 'blog/post/getById',
    category: environment.apiUrl + 'blog/category/all',
    active: environment.apiUrl + 'blog/post/active',
    count: environment.apiUrl + 'blog/post/count',
    slug: environment.apiUrl + 'blog/post/slug',
    contenPage: environment.apiUrl + 'blog/post/contenPage'
  };

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.url.list);
  }

  getCategory(): Observable<any> {
    return this.http.get(this.url.category);
  }

  save(data: Post): Observable<any> {
    return this.http.post(this.url.save, data, httpOptions);
  }

  delete(id): Observable<any> {
    return this.http.get(this.url.delete, {headers: headers, params: {id: id}});
  }

  getById(id): Observable<any> {
    return this.http.get(this.url.getId,  {headers: headers, params: {id: id}});
  }
  activePost(param: any): Observable<boolean> {
    return this.http.get<boolean>(this.url.active,  {headers: headers, params: param});
  }

  countPost(): Observable<number> {
    return this.http.get<number>(this.url.count);
  }

  getBySlug(slug: string): Observable<any> {
    return this.http.get(this.url.slug,  {headers: headers, params: {slug: slug}});
  }

  getContenPage(param): Observable<any>{
    return this.http.get(this.url.contenPage, {headers: headers, params: param});
  }
}