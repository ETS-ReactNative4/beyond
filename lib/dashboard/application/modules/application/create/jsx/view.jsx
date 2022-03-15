export const ApplicationCreate = function ({closeModal}) {
    const [state, setState] = React.useState({});
    const [type, setType] = React.useState(undefined);
    const notify = NotifyManager;
    const model = createController.model;
    useBinder([createController], () => {
        const fetching = model.processing || model.application?.fetching;
        if (model.created) {
            closeModal();
            notify.success(texts?.created);
            window.setTimeout(model.clean(), 100);
            return;
        }
        setState(() => ({...state, fetching}));
    });

    const output = [];
    const {fetching} = state;

    if (createController.ready) {
        output.push(
            <React.Fragment key="content">
                <Header/>
                <Form/>
            </React.Fragment>
        );
    }
    const texts = createController.texts;

    return (
        <CreateAppContext.Provider value={{type, setType, model, texts, fetching}} key="content">
            <BeyondModal show onClose={closeModal} className="md ds-modal ds-app-create_modal">
                {output}
            </BeyondModal>
        </CreateAppContext.Provider>
    );
};