import {module} from "beyond_context";

export /*bundle*/
class User {
    id: number;
    user: string;
    name: string;
    password: string;

    async login(user: string, password: string) {
        const response = (await module.execute('/users/login', {user: user, password: password}));
        return <string>response;
    }
}