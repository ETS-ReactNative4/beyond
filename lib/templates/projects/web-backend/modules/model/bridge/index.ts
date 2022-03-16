import {Provider} from "$[scope]$[name]/provider/ts";

export /*actions*/ /*bundle*/
class Model {
    provider = new Provider();

    get(id: number) {
        return this.provider.get(id);
    }

    list() {
        return this.provider.list();
    }
}