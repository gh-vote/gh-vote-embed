import {Injectable} from '@angular/core'
import {ObservableData} from '../model/observable-data'
import {Config} from '../model/config'
import {tap} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ConfigProvider {

  config: ObservableData<Config> = new ObservableData<Config>()

  constructor() {
    this.config.observable
      .pipe(tap(config => console.debug({config})))
      .subscribe()
  }

}
