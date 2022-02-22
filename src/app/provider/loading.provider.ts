import {Injectable} from '@angular/core'
import {ObservableData} from '../model/observable-data'
import {tap} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoadingProvider {

  loading: ObservableData<boolean> = new ObservableData<boolean>({initialValue: true})

  constructor() {
    this.loading.observable
      .pipe(tap(l => console.debug('loading', l)))
      .subscribe()
  }

}
