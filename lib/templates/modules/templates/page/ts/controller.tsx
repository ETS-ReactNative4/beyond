import {PageReactWidgetController} from '@beyond-js/kernel/react-widget/ts';
import {View} from "./view";

export /*bundle*/
class Controller extends PageReactWidgetController {
    get Widget() {
        return View;
    }
}