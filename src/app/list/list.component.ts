import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
 userData:any
 totalExp:any=[]
 editData:any
  constructor(private router :Router ) { }

  ngOnInit(): void {

    this.userData=localStorage.getItem('form')
    this.userData=JSON.parse(this.userData)
    console.log(this.userData)

    this.userData.map((item:any)=>{
      let exp=0
        item.experience.map((it:any)=>{
        exp+=it.duration
      })
      this.totalExp.push(exp)
      console.log(this.totalExp)
    })
  }
  edit(i:any){
   console.log(i)

   if (localStorage.getItem('form') == null) {
    this.editData= [];
  }
  else{
    this.userData = localStorage.getItem('form')
    this.userData = JSON.parse(this.userData)
    this.editData=this.userData[i]
    console.log(this.editData)
    localStorage.setItem('editData',JSON.stringify(this.editData))
  //  console.log(JSON.stringify(this.userData));
   }
   this.router.navigate([`/edit/${i}`])   
  }
  delete(i:any){
   this.userData.splice(i,1)
   localStorage.setItem('form',JSON.stringify(this.userData))

   this.ngOnInit()
  }

}
