import { Task } from './task';

export class User {
    constructor(public _id: string, public name: string, public surname: string, public email: string, public tasks: Task[]) { }
}
