import {ReactWidgetController} from '@beyond-js/kernel/react-widget/ts';
import {Layout} from './views/layout';

export /*bundle*/
class Controller extends ReactWidgetController {
    get Widget() {
        return Layout;
    }
}