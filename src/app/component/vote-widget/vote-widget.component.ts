import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser'
import {AuthService} from '@auth0/auth0-angular'

@Component({
  selector: 'gh-vote',
  templateUrl: './vote-widget.component.html',
  styleUrls: ['./vote-widget.component.sass'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class VoteWidgetComponent implements OnInit {

  constructor(
    private ref: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    public auth: AuthService,
  ) {
  }

  ngOnInit(): void {
  }

  loginWithRedirect(): void {
    this.auth.loginWithRedirect()
  }

  logout(): void {
    // Call this to log the user out of the application
    this.auth.logout({ returnTo: window.location.origin });
  }

}
