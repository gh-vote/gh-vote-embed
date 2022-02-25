import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Option} from '../../model/poll'

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.sass', '../../style/global.sass']
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
    return this.option.voteCount * 100 / this.totalVotes
  }

}
