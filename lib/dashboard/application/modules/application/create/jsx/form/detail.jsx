function DetailApp({type}) {
    const {texts: {errors, form: texts, actions}, model, fetching} = useCreateAppContext();

    const [state, setState] = React.useState({});
    const btnAttrs = {};
    const handleName = event => handleChange(event, / /g);

    const handleChange = (event, pattern) => {
        const target = event.target;
        let {name, value} = target;
        if (pattern) value = value.replace(pattern, '-');
        model[name] = value;
        setState({...state, ...{[name]: model[name]}});
    };

    if (!model.valid) btnAttrs.disabled = true;
    return (
        <div className="ds-create-app__fields">
            {model.error &&
                <BeyondAlert title="Ha ocurrido un error" type="error">{errors[model.error]}</BeyondAlert>
            }
            <div className="item">
                <BeyondInput
                    name="scope" label={texts.scope}
                    placeholder={texts.scope} value={state.scope} onChange={handleName}/>
                <BeyondInput
                    name="name" label={texts.name}
                    placeholder={texts.name} required
                    value={state.name} onChange={handleName}/>
                <BeyondInput
                    name="title" label={texts.title}
                    placeholder={texts.title}
                    value={state.title} onChange={handleChange}/>
                <div className="flex-container">
                    {model.useNavigatePort && <PortField identifier="navigate" name="navigatePort"/>}
                    {model.useInspectPort && <PortField identifier="inspect" name="inspectPort"/>}
                </div>

                <BeyondInput
                    value={state.description}
                    placeholder={texts.description}
                    name="description" label={texts.description}
                    onChange={handleChange}/>
            </div>
            <footer className="footer ds-modal__actions">
                <div className="actions">
                    <BeyondButton {...btnAttrs} className="btn-large btn primary" type="submit">
                        {fetching
                         ? <BeyondSpinner className="on-primary" fetching={true}/>
                         : actions.submit
                        }
                    </BeyondButton>
                </div>
            </footer>
        </div>
    );
}
