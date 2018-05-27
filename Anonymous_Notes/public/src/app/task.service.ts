import { Injectable,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService{
  data: BehaviorSubject<any[]> = new BehaviorSubject([])
  constructor(private http:HttpClient) { }
  getNotes(): any{
    console.log("getting Notes")
    return this.http.get('/notes')
  }
  addNote(note: any): void{
    console.log("in addnote", note)
    this.http.post('/addnote',note).subscribe(
      data =>{
        console.log("there is data", data)
      }
    )
    this.http.get('/notes').subscribe(
      thing =>{
        const tempData = this.data.getValue();
        tempData.pop()
        tempData.push(thing)
        console.log(tempData)
        this.data.next(tempData)
      }
    )
  }

}
