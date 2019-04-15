import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css']
})
export class NgbdModalContentComponent implements OnInit {
  @Input() header;
  @Input() content;
  
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

}
