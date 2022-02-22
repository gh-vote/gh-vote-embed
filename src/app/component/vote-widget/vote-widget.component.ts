import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {AuthService} from '../../service/auth.service'
import {TokenProvider} from '../../provider/token.provider'

@Component({
  selector: 'gh-vote',
  templateUrl: './vote-widget.component.html',
  styleUrls: ['./vote-widget.component.sass'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class VoteWidgetComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public tokenProvider: TokenProvider
  ) {
  }

  ngOnInit(): void {
  }

  loginWithRedirect(): void {
    this.authService.authorize('Iv1.946ad5067422a7b2').subscribe(r => {
      console.log(r)
      window.open(r.url, '_self')
    })
  }

  logout(): void {
  }

}
