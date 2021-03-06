import {ApplicationRef, DoBootstrap, Injector, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {createCustomElement} from '@angular/elements'
import {VoteWidgetComponent} from './component/vote-widget/vote-widget.component'
import {HttpClientModule} from '@angular/common/http'
import {SessionProvider} from './provider/session.provider'
import {ActivatedRoute, RouterModule} from '@angular/router'
import {APP_BASE_HREF} from '@angular/common'
import {PollComponent} from './component/poll/poll.component'
import {OptionComponent} from './component/option/option.component'
import {FormsModule} from '@angular/forms'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PollSkeletonComponent } from './component/poll-skeleton/poll-skeleton.component'

@NgModule({
  declarations: [
    VoteWidgetComponent,
    PollComponent,
    OptionComponent,
    PollSkeletonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  entryComponents: [
    VoteWidgetComponent
  ]
})
export class AppModule implements DoBootstrap {

  constructor(
    private injector: Injector,
    private sessionProvider: SessionProvider,
    private route: ActivatedRoute
  ) {
    const a = decodeURIComponent(window.location.search)
      .replace('?', '')
      .split('&')
      .map(param => param.split('='))
      .reduce((values: any, [key, value]) => {
        values[key] = value
        return values
      }, {})
    if (a['session']) {
      this.sessionProvider.session.set(a['session'])
    }
  }

  ngDoBootstrap(appRef: ApplicationRef) {
    const el = createCustomElement(VoteWidgetComponent, {
      injector: this.injector
    })
    customElements.define('gh-vote', el)
  }

}
