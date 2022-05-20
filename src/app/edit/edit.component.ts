import { Component, OnInit } from '@angular/core';
import { FormsModule, Validators, ReactiveFormsModule, FormGroup, FormControl, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  sampleForm!: FormGroup;
  programmingFormArray!: FormArray;
  checkArr: any = [
    { name: 'Angular', checked: false },
    { name: 'React', checked: false },
    { name: 'Node.JS', checked: false },
    { name: 'JavaScript', checked: false },
    { name: 'Flutter', checked: false },
    { name: 'Java', checked: false },
  ]
  checkOutput: any = []
  experience: any
  editData: any = []
  genders: any = ['Male', 'Female', 'Others']
  submitted: boolean = false
  temp: boolean = false
  sum: any = 0
  exp: boolean = false
  arr: any = []
  allData:any=[]
  currentId:any
  constructor(private route: ActivatedRoute,private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    let id = this.route.snapshot.params;
    this.currentId = id['id']
    this.currentId=parseInt(this.currentId)+1
    console.log(this.currentId)
    if (localStorage.getItem('editData') == null) {
      this.editData = [];
    }
    else {
      this.editData = localStorage.getItem('editData')
      this.editData = JSON.parse(this.editData)
      console.log(this.editData)
    }
    if (localStorage.getItem('form') == null) {
      this.allData = [];
    }
    else {
      this.allData = localStorage.getItem('form')
      this.allData = JSON.parse(this.allData)
      console.log(this.allData)
    }
    console.log(this.editData)
    this.createForm();


    this.sampleForm.patchValue({
      firstName: this.editData.firstName,
      lastName: this.editData.lastName,
      gender: this.editData.gender,
      email: this.editData.email,
      address: this.editData.address,
      country: this.editData.country,
      state: this.editData.state,
      pinCode: this.editData.pinCode,
    });
    this.checkArr.map((item: any, i: Number) => {
      if (this.editData.skills.includes(item.name)) {
        console.log(item)
        item['checked'] = true
        this.sampleForm.patchValue({
          skills: this.checkArr
        })
      }
    })
    console.log(this.sampleForm.get('skills')?.value)

    console.log(this.editData.experience.length);

    for (let i = 0; i < this.editData.experience.length; i++) {
      console.log(this.editData.experience[i]);
      this.addCurrentData(this.editData.experience[i]);
    }
  }


  get f(): { [key: string]: AbstractControl } {
    return this.sampleForm.controls;
  }
  get t() { return this.f['experience'] as FormArray; }

  get s() {
    return this.f['skills'] as FormArray;
  }
  get experienceArray() {
    return this.sampleForm.get('experience') as FormArray
  }
  addCurrentData(data: any) {
    console.log(data)
    // console.log(this.RT);

    this.experienceArray.push(this.formBuilder.group({
      companyName: [data.companyName, Validators.required],
      duration: [data.duration],
      responsibilities: data.responsibilities
    }));
  }
  createForm() {
    this.sampleForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', Validators.required],
      skills: new FormControl(this.checkOutput, Validators.required),
      experience: this.formBuilder.array([])

    });
  }


  get formData() {
    console.log(this.sampleForm.get("skills"));
    return <FormArray>this.sampleForm.get("skills");
  }

  addCheck(item: any, event: any) {
    console.log(event.target.checked)
    console.log(this.sampleForm.get("skills"));
    if (event.target.checked) {
      this.checkOutput.push(item);
    }
    else {
        this.checkOutput.splice(this.checkOutput.indexOf(item), 1)
    }
    console.log(this.checkOutput)
    if (this.checkOutput.length < 3) {
      this.temp = true
    } else {
      this.temp = false
    }
  }

  getExperience() {
    this.experience.map((item: any) => {

      this.sum += item.duration
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

  removeExp(i: any) {
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


  update() {
    console.log(this.sampleForm.value)
    this.allData.forEach((element:any,i:Number) => {
      console.log(element.id)
      console.log(this.currentId)

      if(element.id==(this.currentId)){
        this.allData.splice(i, 1, this.sampleForm.value);
        console.log(this.allData)
      }
    });
    localStorage.setItem('form',JSON.stringify(this.allData))
    this.router.navigate(['list'])
    
  }

}
