import {Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ControlTypes } from './control-type.enum';
import { FormBuilderGroup } from './form-builder-group.model';

@Component({
  selector: 'form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  @Input("control-groups") controlsGroups: FormBuilderGroup[] = [];
  @Input("inner-form") innerForm: boolean = false;
  @Input("title") title?:string = '';
  @Input('show-cancel-button') showCancelButton = true;
  @Output("formSubmit") submitEventEmitter = new EventEmitter<any>();
  @Output("cancel") cancelEventEmitter = new EventEmitter<void>();
  @Output("tableDelete") tableDeleteEvent = new EventEmitter<any>();
  formGroup: FormGroup = new FormGroup({});
  controlTypes = ControlTypes;
  constructor(@Inject(MAT_DIALOG_DATA) public data:FormBuilderPropsSpec,@Inject('DIRECTION') public direction:string) {
      if(data)
      {
        if(data.controlsGroups) this.controlsGroups = data.controlsGroups;
        this.title = data.title; 
      }
  }
  onSubmit() {
    this.submitEventEmitter.emit(this.formGroup.value);
    if(this.data)
    {
      this.data.onSubmit(this.formGroup.value);
    }
  }
  onCancel(e:any) {
    e.preventDefault();
    this.cancelEventEmitter.emit();
    if(this.data)
    {
      this.data.onCancel( );
    }
  }
  ngAfterContentInit() {
    this.controlsGroups.forEach(group => {
      group.controls.forEach(control => {
        if(control.name)
        this.formGroup.addControl(control.name, new FormControl(control.value, control.validators));
      });
    });
  }
  ngOnInit(): void {
  }
  
}
export interface FormBuilderPropsSpec {
  title?:string;
  controlsGroups:FormBuilderGroup[],
  onSubmit: (result:any) => void,
  onCancel:() => void
}
