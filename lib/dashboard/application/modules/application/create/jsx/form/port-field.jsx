function PortField({name, identifier}) {
    const {texts: {form: texts}, model} = useCreateAppContext();
    const [valid, setValid] = React.useState();
    const clsPortLabel = `fade-in ${valid === 'success' ? 'form__text-success' : 'form__text-error'}`;

    const handleChange = (event, pattern) => {
        const target = event.target;
        let {name, value} = target;
        if (pattern) value = value.replace(pattern, '-');
        model[name] = value;
        if (value.length === 4) {
            checkPort();
        }
    };

    const checkPort = async () => {
        const port = model[name];
        if (!port) return;
        const isValid = await model.checkPort(port);
        setValid(isValid ? 'success' : 'error');
    };

    return (
        <BeyondInput
            name={name} label={texts.ports[identifier].label}
            className="icon-right form__field-port"
            type="text"
            placeholder={texts.ports[identifier].label}
            maxLength={4}
            value={model[name]} onChange={handleChange}>
            <DSIconButton icon="refresh" className="primary" title={texts.ports.tooltip}/>
            {valid && <span className={clsPortLabel}>{texts.ports[valid]}</span>}
        </BeyondInput>
    )
}