import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private authorizeEndpoint = '/oauth2/authorization/github';
  private tokenEndpoint = '/login/oauth2/code/github';
  private baseUrl = environment.baseUrl;
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  login() {
    console.log('login from security service');
    window.open(this.baseUrl + this.authorizeEndpoint, '_self');
  }

  updateToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  fetchToken(code: string, state: string): Observable<any> {
    console.log('fetchToken: ');
    console.log(
      this.baseUrl + this.tokenEndpoint + '?code=' + code + '&state=' + state
    );
    return this.http.get(
      this.baseUrl + this.tokenEndpoint + '?code=' + code + '&state=' + state
    );
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token != null;
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }

  logout(): Observable<any> {
    return this.http.post(this.baseUrl + '/logout', this.getToken());
  }
}
