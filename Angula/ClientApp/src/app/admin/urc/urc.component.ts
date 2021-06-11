import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-urc',
  templateUrl: './urc.component.html',
  styleUrls: ['./urc.component.css']
})
export class URCComponent implements OnInit {
  formsearch: FormGroup;
  showModal: boolean;
  constructor(private formBuilder: FormBuilder) { }
  show()
  {
    this.showModal = true; // Show-Hide Modal Check
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
  closepopup(result: string){
    if(result==="true"){
      this.hide();
    }
  }
  ngOnInit() {
    this.formsearch =this.formBuilder.group({
      name: ['', Validators.required],
      regno: ['', Validators.required],
      phone: [''],
      groupcustome: [''],
      daterecall: [''],
      statusCall: [''],
      contractno: [''],
      cluster: [''],
    });
  }
  onSubmit(){
    console.log(this.formsearch.value);
  }
  export_excel(){

  }
}
