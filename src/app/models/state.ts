import { Task } from './task';
export class State {
    constructor (public _id:string, public name:string, public tasks:Task[]){}
}
