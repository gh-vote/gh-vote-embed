import {Component, Input, OnInit} from '@angular/core'
import {Option, Poll} from '../../model/poll'

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.sass']
})
export class PollComponent implements OnInit {

  @Input()
  poll!: Poll

  options!: Option[]

  constructor() {
  }

  ngOnInit(): void {
    this.options = Object.values(this.poll.options)
  }

}
