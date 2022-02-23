import {Injectable} from '@angular/core'
import {ObservableData} from '../model/observable-data'
import {tap} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SessionProvider {

  session: ObservableData<string> = new ObservableData<string>()

  constructor() {
    this.session.observable
      .pipe(tap(session => console.debug({session})))
      .subscribe()
  }

}
