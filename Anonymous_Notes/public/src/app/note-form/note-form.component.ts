import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {
  newnote = {
    note: ""
  }
  constructor(private _taskService: TaskService) { }

  onSubmit(form){
    this._taskService.addNote(this.newnote)
    this.newnote = {note: ""}
  }
  ngOnInit() {
  }

}
