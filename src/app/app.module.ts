import {ApplicationRef, DoBootstrap, Injector, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {createCustomElement} from '@angular/elements'
import {VoteWidgetComponent} from './component/vote-widget/vote-widget.component'

@NgModule({
  declarations: [
    VoteWidgetComponent
  ],
  imports: [
    BrowserModule
  ],
  entryComponents: [
    VoteWidgetComponent
  ]
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {
  }

  ngDoBootstrap(appRef: ApplicationRef) {
    const el = createCustomElement(VoteWidgetComponent, {
      injector: this.injector
    })
    customElements.define('gh-vote', el)
  }

}
