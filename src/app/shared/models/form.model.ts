export class formModel{
    accessLevelType!:descriptionFormModel;
    address!:descriptionFormModel;
    age!:descriptionFormModel;
    firstname!:descriptionFormModel;
    lastname!:descriptionFormModel;
    birthday!:descriptionFormModel;

    
}


export class descriptionFormModel{
    label!:String;
    rules:any;
    type!:string;
    value!:string;
    
}