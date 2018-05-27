import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { CLEAN_PROMISE } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(private _taskService: TaskService) {}
  notes: any[] = []
  img = ''
  display: string = 'all'
  ngOnInit() {
    this.img = "https://cdn-images-1.medium.com/max/1600/1*9EBHIOzhE1XfMYoKz1JcsQ.gif"
    this._taskService.data.subscribe(
      (data) =>{
        console.log(data)
        if(data.length == 0){//if observable is blank(usually when page first loads), then manually get data and display it
          this._taskService.getNotes().subscribe(
            data =>{
              if(data.length == 0){
                console.log("zero")
              }
              else{
                this.notes.push(data)
                this.display = 'none'
              }
            }
          )
        }
        else{
          this.notes = data
        }
      }
    )
  }

}
