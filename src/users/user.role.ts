export class UserRole {
  associationName: string;
  role: string;

  constructor(associationName: string, role: string) {
    this.associationName = associationName;
    this.role = role;
  }
}
