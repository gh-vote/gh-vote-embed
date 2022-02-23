import {Component, Input, OnInit} from '@angular/core'
import {Poll} from '../../model/poll'

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.sass']
})
export class PollComponent implements OnInit {

  @Input()
  poll!: Poll

  constructor() {
  }

  ngOnInit(): void {
  }

}
