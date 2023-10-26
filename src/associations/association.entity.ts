export class Association {
    id: number

    idUsers: number[]

    name: string

    constructor(id: number, name: string) {
        this.id  = id
        this.name = name
        this.idUsers = []
    }
}