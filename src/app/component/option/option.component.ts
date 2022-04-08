import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Option} from '../../model/poll'
import {animate, state, style, transition, trigger} from '@angular/animations'

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.sass', '../../style/global.sass'],
  animations: [
    trigger('bar', [
      state('shown', style({width: '*'})),
      state('hidden', style({width: 0})),
      transition('* => shown', [
        style({width: 0}),
        animate(300, style({width: '*'}))
      ])
    ])
  ]
})
export class OptionComponent implements OnInit {

  @Input()
  option!: Option

  @Input()
  index!: number

  @Output()
  optionChange: EventEmitter<Option> = new EventEmitter<Option>()

  @Input()
  totalVotes!: number

  @Input()
  show: boolean = false

  @Input()
  enabled: boolean = false

  constructor() {
  }

  ngOnInit(): void {
  }

  percentage(): number {
    return Math.round(this.option.voteCount * 100 / this.totalVotes)
  }

}
