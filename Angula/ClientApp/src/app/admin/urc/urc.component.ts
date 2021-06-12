import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { ExcelService } from 'src/app/services/excel.service';
@Component({
  selector: 'app-urc',
  templateUrl: './urc.component.html',
  styleUrls: ['./urc.component.css']
})
export class URCComponent implements OnInit {
  @ViewChild('tableexport', { static: false })
  tableexport?: ElementRef<HTMLElement>;
  title = 'exportExcelInAngular';
  dataOfFootballers: any = [{
    playerName: 'Cristiano Ronaldo',
    playerCountry: 'Pourtgal',
    playerClub: 'Juventus'
  },
  {
    playerName: 'Lionel Messi',
    playerCountry: 'Argentina',
    playerClub: 'Barcelona'
  },
  {
    playerName: 'Neymar Junior',
    playerCountry: 'Brazil',
    playerClub: 'PSG'
  },
  {
  playerName: 'Tonni Kroos',
  playerCountry: 'Germany',
  playerClub: 'Real Madrid'
  },
  {
    playerName: 'Paul Pogba',
    playerCountry: 'France',
    playerClub: 'Manchester United'
  }];

  formsearch: FormGroup;
  showModal: boolean;
  constructor(private formBuilder: FormBuilder,private excelService:ExcelService) { }
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
  export_excel():void {
    this.excelService.exportTableAsExcelFile(this.tableexport.nativeElement, 'footballer_data');
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
}
