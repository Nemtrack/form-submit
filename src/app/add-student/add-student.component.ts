import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Student } from '../shared/student/student';
import { StudentService } from '../shared/student/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
})
export class AddStudentComponent implements OnInit {
  student: Student = {
    student_id: 0,
    student_name: '',
    student_email: '',
    student_branch: '',
  };
  submitted = false;

  constructor(private studentservice: StudentService) {}

  ngOnInit() {
    this.submitted = false;

    this.studentsaveform = new FormGroup({
      student_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      student_email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      student_branch: new FormControl(null, Validators.required),
    });
  }

  studentsaveform: FormGroup = new FormGroup({});

  saveStudent() {
    if (this.studentsaveform) {
      this.student = {
        student_name: this.studentsaveform.get('student_name')!.value,
        student_email: this.studentsaveform.get('student_email')!.value,
        student_branch: this.studentsaveform.get('student_branch')!.value,
        student_id: 0,
      };
      this.submitted = true;
      this.save();
    }
  }

  save() {
    this.studentservice.createStudent(this.student).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    this.student = {
      student_id: 0,
      student_name: '',
      student_email: '',
      student_branch: '',
    };
  }

  get student_name() {
    if (this.studentsaveform) return this.studentsaveform.get('student_name');
    return null;
  }

  get student_email() {
    if (this.studentsaveform) return this.studentsaveform.get('student_email');
    return null;
  }

  get student_branch() {
    if (this.studentsaveform) return this.studentsaveform.get('student_branch');
    return null;
  }

  addStudentForm() {
    if (this.studentsaveform) {
      this.submitted = false;
      this.studentsaveform.reset();
    }
  }
}
