import { email, minLength, required } from "@rxweb/reactive-form-validators";

export class LoginFormModel {
    constructor(data: LoginFormModel | null) {
        if (data) {
            this.email = data.email;
            this.password = data.password;
        }
    }
    @required({message:'Email is required'})
    @email({message:'Email type is invalid'})
    email!: string;

    @required({message:'Password is required'})
    @minLength({value:6,message:'Password must be more than 6 characters'})
    password!: string;
}