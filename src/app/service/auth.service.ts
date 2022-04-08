import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {Token} from '../model/token'
import {Redirect} from '../model/redirect'
import {API_URL} from '../../global'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {
  }

  authorize(clientId: string, redirectUri: string = location.href): Observable<Redirect> {
    return this.http.get<Redirect>(API_URL + '/authorize', {
      params: {redirect_uri: encodeURIComponent(redirectUri)}
    })
  }

  token(session: string): Observable<Token> {
    return this.http.post<Token>(API_URL + '/token', {
      session: session
    })
  }
}
