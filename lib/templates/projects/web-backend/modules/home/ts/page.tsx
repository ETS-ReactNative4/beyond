import * as React from "react";
import {Header} from "@testing/web-app/header/code";

export /*bundle*/
function Widget(): JSX.Element {
    const header = Header({message: 'Mi primer modulo con BeyondJS'});

    return <>{header}</>;
}