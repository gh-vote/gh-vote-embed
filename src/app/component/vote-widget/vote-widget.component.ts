import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser'

@Component({
  selector: 'gh-vote',
  templateUrl: './vote-widget.component.html',
  styleUrls: ['./vote-widget.component.sass'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class VoteWidgetComponent implements OnInit {

  constructor(private ref: ChangeDetectorRef, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
  }

}
