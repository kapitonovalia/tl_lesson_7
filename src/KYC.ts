import {UserLatvia} from "./UserLatvia";
import {UserEstonia} from "./UserEstonia";
import {Contract} from "./Contract";

export class KYC {
    private static signed: boolean;
    static activateMobileIDForEstonia(user: UserEstonia): void {
        if (user.age >= 16) {
            user.mobileIDAuthorization = true;
        } else {
            throw new Error("User is too young");
        }
    }

    static activateEParakstsForLatvia(user: UserLatvia): void {
        if (user.age >= 18) {
            user.activateEParakstsForLatvia = true;
        } else {
            throw new Error("User is too young");
        }
    }
    static signForEstonia(user: UserEstonia): void {
        if (user.mobileIDAuthorization === true) {
            this.signed = true;
        } else {
            throw new Error("Mobile ID authorization is not active for this user.");
        }
    }
    static signForLatvia(user: UserLatvia): void {
        if (user.activateEParakstsForLatvia === true) {
            this.signed = true;
        } else {
            throw new Error("EParaksts is not activated for this user.");
        }
    }
}
