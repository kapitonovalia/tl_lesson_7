import {UserEstonia} from "./UserEstonia";
import {UserLatvia} from "./UserLatvia";

export class Contract {
    title: string;
    signed: boolean;

    constructor(title: string) {
        this.title = title;
        this.signed = false;
    }
}
