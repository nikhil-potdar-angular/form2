import { Component, OnInit } from '@angular/core';
import { FormsModule, Validators, ReactiveFormsModule, FormGroup, FormControl, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sampleForm!: FormGroup;
  programmingFormArray!: FormArray;
  checkArr:any=['Angular','React','Node.JS','JavaScript','Flutter','Java']
  checkOutput:any=[]
  experience:any
  userData:any=[]
  genders:any=['Male','Female','Others']
  submitted:boolean=false
  temp:boolean=false
  sum:any=0
  exp:boolean=false
  id:any=0

  constructor(private router:Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.sampleForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      email: new FormControl('', [Validators.required,Validators.email, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      address:['', Validators.required],
      country:['', Validators.required],
      state: ['', Validators.required],
      pinCode:['', Validators.required],
      skills: new FormControl(this.checkOutput, Validators.required),
      experience: this.formBuilder.array([this.createItem()])

    });
  }
 
  get f(): { [key: string]: AbstractControl } {
    return this.sampleForm.controls;
  }
  get t() { return this.f['experience'] as FormArray; }
  get formData() {
    console.log(this.sampleForm.get("skills"));
    return <FormArray>this.sampleForm.get("skills");
  }

  addCheck(item:any,event:any){
    console.log(event.target.checked)
    console.log(this.sampleForm.get("skills"));
    if(event.target.checked){
      this.checkOutput.push(item);
    }
    else{
      
      this.checkOutput.splice(this.checkOutput.indexOf(item),1)
    }
    console.log(this.checkOutput)
    if(this.checkOutput.length<3){
      this.temp=true
    } else{
      this.temp=false
    }
  }
 
  getExperience(){
    this.experience.map((item:any)=>{
       
       this.sum+=item.duration
    })
    
    this.sampleForm.patchValue({
      experience: this.sum
    })
  }
   
   createItem() {
    return this.formBuilder.group({
      companyName: [''],
      duration: [''],
      responsibilities: [''],
   })
  }
  
  removeExp(i:any){
      console.log(i);
      const remove = this.sampleForm.get('experience') as FormArray;
      remove.removeAt(i);
  }
  
  addItem() {
    this.experience = this.sampleForm.get('experience') as FormArray;
    // this.experience.push(new FormControl());
    this.experience.push(this.createItem());
    console.log(this.experience.value)

    // if(this.experience.value.length < 2  ){
    //   this.exp=true
    // }
    // else{
    //   this.exp=false
    // }
    // if(this.experience.value.length >5){
    //   this.exp=true
    // }
    // else{
    //   this.exp=false
    // }
  }
  
  get experienceArray(){
    return this.sampleForm.get('experience') as FormArray
  }
  
  onSubmit() {
    this.submitted=true
    // if (this.sampleForm.invalid) {
    //   return;
    // }
    if (localStorage.getItem('form') == null) {
       
       this.sampleForm.value.id=this.id+1
       this.userData.push(this.sampleForm.value)
      localStorage.setItem('form',JSON.stringify(this.userData))

     }
     else{
      this.userData = localStorage.getItem('form')
      this.userData = JSON.parse(this.userData)
      this.id=this.userData[this.userData.length-1].id
      this.sampleForm.value.id=this.id+1
      this.userData.push(this.sampleForm.value)
      console.log(this.userData)
      localStorage.setItem('form',JSON.stringify(this.userData))
      console.log(this.sampleForm.value)
  
     }
    
  //   if (localStorage.getItem('form') == null) {
  //   this.userData= [];
  //    }
  //   else{
  //   this.userData = localStorage.getItem('form')
  //   this.userData = JSON.parse(this.userData)
  //   this.id=this.userData[this.userData.length-1].id
  //   this.sampleForm.value.id=this.id+1

  //   this.userData.push(this.sampleForm.value)
  //   console.log(this.userData)
  //   localStorage.setItem('form',JSON.stringify(this.userData))
  //  }
    this.submitted = false;
    this.router.navigate(['/list'])
  }
}

