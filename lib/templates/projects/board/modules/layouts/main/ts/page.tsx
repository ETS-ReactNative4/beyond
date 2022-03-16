import * as React from "react";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "menu-layout": any;
            "beyond-layout-children": any;
        }
    }
}

export /*bundle*/
class Widget extends React.Component {
    constructor(props) {
        super(props);
        this.setBody();
    }

    setBody() {
        const style = `background: linear-gradient(180deg, ${this.getRandomColor()} 0%, ${this.getRandomColor()} 100%) ;`;
        document.querySelector('body').setAttribute('style', style);
    }

    getRandomColor() {
        const h = Math.random() * (300 - 180) + 180;
        const s = 50;
        const l = Math.random() * (50 - 20) + 20;
        return `hsl( ${h}, ${s}%, ${l}%)`;
    }

    render() {
        return (
            <div className="app-main-layout">
                <beyond-layout-children/>
            </div>
        );
    }
}