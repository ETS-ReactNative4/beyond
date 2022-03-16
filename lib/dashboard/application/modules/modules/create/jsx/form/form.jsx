function Form() {
    const {application, close, model, template, texts} = useCreateModuleContext();
    if (!template) return null;

    const [error, setError] = React.useState();
    const [initial, setInitial] = React.useState(true);

    const styles = template === 'page' || template === 'widget' || template === 'layout';
    const [state, setState] = React.useState({styles: styles});

    const onSubmit = async event => {
        event.preventDefault();
        try {
            if (application.application.routes().includes(model.bundle.route)) {
                setError(`${texts.form.errors.route} ${model.bundle.route}`);
                return;
            }

            const response = await model.bundle.publish();
            if (response.error) {
                setError(response.error);
                return;
            }

            close();
            const url = `/application/${application.application.id}`;
            const qs = new URLSearchParams({
                aside: 'module',
                module: model.bundle.moduleId
            }).toString();

            routing.replaceState(`${url}?${qs}`);
        }
        catch (exc) {
            setError(exc.error);
        }
    };

    const handleChange = event => {
        const target = event.currentTarget;
        const value = {};
        let fieldValue = target.value;

        if (target.name === 'name') {
            fieldValue = fieldValue.replace(/ /g, '-');
        }

        //Seteamos el valor por defecto del estado
        if (initial) {
            model.bundle.set('styles', state.styles);
            setInitial(false);
        }

        value[target.name] = fieldValue;
        const newState = {...state, ...value};
        model.bundle.set(target.name, fieldValue);
        setState(newState);
    };

    const props = {state, setState, handleChange};
    return (
        <>
            {error && <BeyondAlert type="error" message={error}/>}
            <AsideForm/>
            <div className="ds-create-module__template-form">
                <BeyondForm onSubmit={onSubmit}>
                    <FormPage {...props}/>
                    <FormWidget {...props}/>
                    <FormLayout {...props}/>
                    <FormCode {...props}/>
                    <FormBridge {...props}/>
                    <FormTypescript {...props}/>
                </BeyondForm>
            </div>
        </>
    );
}
