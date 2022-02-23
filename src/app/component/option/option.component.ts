import {Component, Input, OnInit} from '@angular/core'
import {Option} from '../../model/poll'

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.sass']
})
export class OptionComponent implements OnInit {

  @Input()
  option!: Option

  @Input()
  totalVotes!: number

  @Input()
  show: boolean = false

  constructor() {
  }

  ngOnInit(): void {
  }

  percentage(): number {
    return this.option.voteCount * 100 / this.totalVotes
  }

}
