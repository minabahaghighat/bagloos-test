import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formModel } from '../shared/models/form.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  registerForm!: FormGroup;
  fields:any=[];
   model:any={} ;
  registerUserInfo: any=[];
  editUserInfo: boolean=false;


  constructor(private userService:UserService) { }


  ngOnInit() {
    this.userService.getUserInfoModel().subscribe((res:formModel)=>{
      this.model=res;
      this.buildForm();
    });

   this.getUserInfoRegister();
    
  }


  getUserInfoRegister(){
    this.userService.getUserInfoRegister().subscribe((res)=>{
      this.registerUserInfo=res;
    })
  }

  buildForm() {
    this.registerForm = new FormGroup({
      firstname: new FormControl(''),
      lastName: new FormControl(''),
      age: new FormControl(''),
      address: new FormControl(''),
      birthday: new FormControl(''),
      accessLevelType: new FormControl(''),
    });
    const formGroupFields = this.getFormControlsFields();
    this.registerForm = new FormGroup(formGroupFields);

    
  }


 

  getFormControlsFields() {
    let formGroupFields : any={};
    for (const field of Object.keys(this.model)) {
      const fieldProps = this.model[field];
        formGroupFields[field] = new FormControl(fieldProps.value);
      this.fields.push({ ...fieldProps, fieldName: field });
      const validators = this.addValidator(fieldProps.rules);
      formGroupFields[field] = new FormControl(fieldProps.value, validators);
    }

    return formGroupFields;
}


private addValidator(rules:any) {
  if (!rules) {
    return [];
  }

  let validators:any = Object.keys(rules).map((rule) => {
    switch (rule) {
      case "required":
        return Validators.required;
    }
    return false;
  });
  return validators;
}



handleSubmitForm(){
  this.userService.postUserInfo(this.registerForm.value).subscribe((res)=>{
    if(res){
      this.getUserInfoRegister();
    }
    
  })
  
}


  


handleDeleteUserInfo(userInfo:any){
    this.registerUserInfo.filter((items:any)=>{
        if(userInfo.id==items.id){
          if(window.confirm('Are you sure, you want to update?')){
            this.userService.deleteUserInfoRegister(items.id).subscribe((data)=>{
              this.getUserInfoRegister();
              
            })

          }
        }else{
          return
        }

    })

}



handleEditUserInfo(userInfo:any){
  userInfo.editUserInfo=true;
}


handleNewUserInfo(userInfo:any){
  this.registerUserInfo.filter((items:any)=>{

    if(userInfo.id==items.id){
      if(window.confirm('Are you sure, you want to update?')){
        this.userService.updateUserInfoRegister(userInfo.id, userInfo).subscribe(data => {
          console.log(data);
          
        })
      }
      items.editUserInfo=false;

    }else{
      return
    }
  })
}
}
