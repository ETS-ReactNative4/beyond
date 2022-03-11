import * as React from "react";
import {Model} from "@testing/web-app/model/bridge";
import {Header} from "@testing/web-app/header/code";

export /*bundle*/
function Page(): JSX.Element {
    const [state, setState] = React.useState({fetching: false, list: []});
    const model = new Model();

    const fetch = async () => {
        const list = await model.list();
        setState({list: list, fetching: false});
    }

    React.useEffect(() => {
        fetch();
    }, []);

    if (!state.list.length) {
        return <div>Cargando...</div>;
    }

    const output = [];
    state.list.forEach(item => {
        output.push(
            <li key={item.id}>
                {`${item.name} ${item.lastname}`}
            </li>
        )
    });

    const header = Header({message: 'Usuarios'});

    return (
        <>
            {header}
            <button onClick={fetch}>Actualizar</button>
            <ul>
                {output}
            </ul>
        </>
    );
}