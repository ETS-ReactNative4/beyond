export function ApplicationBoard(props) {
    const [displayView, setDisplayView] = React.useState(localStorage.getItem('beyond.lists.view') ?? 'table');
    const [state, setState] = React.useState({});
    const {panel, workspace} = useDSWorkspaceContext();
    const {id, moduleId} = props?.specs ?? {};

    React.useEffect(() => {
        if (!id) return;

        const onChange = () => {
            const {ready, texts} = controller;
            setState(state => ({...state, controller, ready}));
            if (ready) {
                let {application: {application}} = controller;
                panel.setTabName(`app.${application.id}`, application.name);
            }
        };
        controller.start(workspace, id, moduleId);
        controller.bind('change', onChange);
        if (controller.ready) onChange();
        return () => controller.unbind('change', onChange);
    }, [id]);

    if (!state.ready || controller.currentId !== id) return <Preloader/>;
    const value = {application: controller.application, texts: controller.texts, displayView, setDisplayView, id}

    return (
        <AppContext.Provider value={value}>
            <div className="ds__board">
                <Header/>

                <HeaderList/>
                <ModulesList/>

            </div>
        </AppContext.Provider>
    );
}
