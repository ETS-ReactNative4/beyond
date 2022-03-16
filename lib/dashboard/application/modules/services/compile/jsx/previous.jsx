function PreviousCompilations({open}) {

    const {texts, builder} = useCompilerContext();

    const [modal, toggleModal] = React.useState(open);

    React.useEffect(() => toggleModal(open), [open])
    const show = () => {
        toggleModal(!modal);
    };

    if (!builder.builds || !Object.keys(builder.builds).length) return null;

    const onDelete = () => {
        //TODO: add delete functionality
    }

    const builds = [];

    if (builder.builds) {
        for (const key in builder.builds) {
            if (!builder.builds.hasOwnProperty(key)) continue;
            const build = builder.builds[key];

            builds.push(
                <li data-id={key} key={key}>
                    <div>
                        <h5 className="primary-color upper">{build.platform}</h5>
                        <strong>{texts.builds.path}:</strong> <span>{build.base}</span>
                    </div>
                    <DSIconButton className="primary" icon="delete" onClick={onDelete}/>

                </li>
            );
        }
    }

    return (
        <>
            <div className="column__right-content">
                <button className="btn link" onClick={show}>{texts.builds.message}</button>
            </div>
            {
                modal &&
                <BeyondModal className="md ds-modal ds-modal-compilation" show>
                    <header className="ds-modal_header">
                        <section>
                            <h4>{texts.builds.title}</h4>
                            <h5 className="primary-color">
                                {texts.builds.subtitle}
                            </h5>
                        </section>
                    </header>
                    <div className="ds-modal_content">
                        <ul className="list-builds">{builds}</ul>
                    </div>
                </BeyondModal>
            }
        </>

    );

}
