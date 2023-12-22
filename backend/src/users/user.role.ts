export class UserRole {
  associationName: string;
  associationID: number;
  role: string;

  constructor(associationName: string, associationID: number, role: string) {
    this.associationName = associationName;
    this.associationID = associationID;
    this.role = role;
  }
}
