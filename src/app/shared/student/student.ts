export class Student {
  student_id?: number;
  student_name: string;
  student_email: string;
  student_branch: string;

  constructor(id: number, name: string, email: string, branch: string) {
    this.student_id = id;
    this.student_name = name;
    this.student_email = email;
    this.student_branch = branch;
  }
}
