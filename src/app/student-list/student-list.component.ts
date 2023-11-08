import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../shared/student/student.service';
import { Student } from '../shared/student/student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
})
export class StudentListComponent implements OnInit {
  constructor(private studentservice: StudentService) {}
  studentsArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  students: Student[] = [];
  student: Student = new Student(0, '', '', '');
  deleteMessage = false;
  studentlist: any;
  isupdated = false;
  ngOnInit() {
    this.isupdated = false;
    this.dtOptions = {
      pageLength: 6,
      stateSave: true,
      lengthMenu: [
        [6, 16, 20, -1],
        [6, 16, 20, 'All'],
      ],
      processing: true,
    };
    this.studentservice.getStudentList().subscribe((data) => {
      this.students = data;
    });
  }
  deleteStudent(id: number) {
    this.studentservice.deleteStudent(id).subscribe(
      (data) => {
        console.log(data);
        this.deleteMessage = true;
        this.studentservice.getStudentList().subscribe((data) => {
          this.students = data;
        });
      },
      (error) => console.log(error)
    );
  }
  updateStudent(id: number) {
    this.studentservice.getStudent(id).subscribe(
      (data) => {
        this.studentlist = data;
      },
      (error) => console.log(error)
    );
  }
  studentupdateform = new FormGroup({
    student_id: new FormControl(),
    student_name: new FormControl(),
    student_email: new FormControl(),
    student_branch: new FormControl(),
  });
  updateStu() {
    this.student = new Student(0, '', '', '');
    this.student.student_id = this.StudentId?.value;
    this.student.student_name = this.StudentName?.value;
    this.student.student_email = this.StudentEmail?.value;
    this.student.student_branch = this.StudentBranch?.value;
    console.log(this.StudentBranch?.value);
    this.studentservice
      .updateStudent(this.student, this.student.student_id)
      .subscribe(
        (data) => {
          this.isupdated = true;
          this.studentservice.getStudentList().subscribe((data) => {
            this.students = data;
          });
        },
        (error) => console.log(error)
      );
  }
  get StudentName() {
    return this.studentupdateform.get('student_name');
  }
  get StudentEmail() {
    return this.studentupdateform.get('student_email');
  }
  get StudentBranch() {
    return this.studentupdateform.get('student_branch');
  }
  get StudentId() {
    return this.studentupdateform.get('student_id');
  }
  changeisUpdate() {
    this.isupdated = false;
  }
}
