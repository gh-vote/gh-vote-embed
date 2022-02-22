import {Injectable} from '@angular/core'
import {ObservableData} from '../model/observable-data'
import {TOKEN_KEY} from '../../global'

@Injectable({
  providedIn: 'root'
})
export class TokenProvider {

  token: ObservableData<string> = new ObservableData<string>({
    initialValue: localStorage.getItem(TOKEN_KEY) || undefined,
    nullable: true
  })

  constructor() {
    this.token.observable.subscribe(t => {
      if (t) {
        localStorage.setItem(TOKEN_KEY, t)
      } else {
        localStorage.removeItem(TOKEN_KEY)
      }
    })
  }

}
