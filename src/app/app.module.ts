import {ApplicationRef, DoBootstrap, Injector, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {createCustomElement} from '@angular/elements'
import {VoteWidgetComponent} from './component/vote-widget/vote-widget.component'
import {AuthHttpInterceptor, AuthModule} from '@auth0/auth0-angular'
import {HTTP_INTERCEPTORS} from '@angular/common/http'

@NgModule({
  declarations: [
    VoteWidgetComponent
  ],
  imports: [
    BrowserModule,
    AuthModule.forRoot({
      domain: 'https://github.com/login/oauth',
      clientId: 'Iv1.946ad5067422a7b2',
      redirectUri: window.location.origin,
      httpInterceptor: {
        allowedList: [
          '/api/*'
        ]
      }
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true},
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
