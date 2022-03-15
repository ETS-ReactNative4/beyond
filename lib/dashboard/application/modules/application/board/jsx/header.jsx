export function Header() {
    let {texts, texts: {actions}, application} = useAppContext();
    const model = application?.application;
    const [state, setState] = React.useState({});
    const [processed, setProcessed] = React.useState(application.moduleManager.processed);
    const [showDescription, toggleDescription] = React.useState();
    if (!model) return null;

    const {declarations} = model;
    const {itemsProcessed, total} = declarations;
    const openNavigator = event => {
        event.preventDefault();
        event.stopPropagation();
        workspace.openNavigator(model.id, model.url, true);
    };
    useBinder([model, declarations], () => setState({}));
    useBinder([application.moduleManager], () => setProcessed(application.moduleManager.processed));

    const generateDeclarations = () => declarations.update();
    const openDistributions = event => {
        event.preventDefault();
    };
    const compile = event => {
        event.stopPropagation()
        event.preventDefault();
        workspace.openBoard('compile', {id: application.application.id})
    };

    return (
        <div className="application__detail">
            <section className="board__header">
                <header>
                    <h2>{model.name} <small>{`(id: ${model.id})`}</small></h2>
                    <span className="pathname">{model.path}</span>
                    {
                        model.url &&
                        <div>
                            <a onClick={openNavigator}
                               href={model.url} className="link" target="_blank">
                                {model.url}
                            </a>
                        </div>

                    }
                </header>
                <div className="board__header__actions flex-center flex-container">
                    <div className="scanned__section  flex-center flex-container">
                        <span className="title">{texts.scanner.title}</span>
                        <div className="detail_item">
                            {processed} / {application.moduleManager.total}
                        </div>
                        <DSProcessButton
                            title={texts.actions.scanAll}
                            onClick={application.moduleManager.loadAll}
                            className="on-primary circle" icon="scan"/>
                    </div>
                    <DSIconButton
                        onClick={openDistributions}
                        icon="distributions"
                        title={texts.actions.distributions}/>
                    <DSIconButton onClick={compile} icon="compile" title={texts.actions.compile}/>
                    <BeeActions bee={model.bee} texts={actions}/>
                    <BeyondButton onClick={generateDeclarations} className="btn primary">
                        {!declarations.processing ?
                            <>{actions.declarations}</> :
                            <>
                                <BeyondSpinner className="on-primary"/>
                                {`${actions.generatingDeclarations} ${itemsProcessed}/${total}`}
                            </>
                        }
                    </BeyondButton>
                </div>

            </section>

            <section className="pd-base">

                <span className="link" onClick={() => toggleDescription(!showDescription)}> More details</span>
                {showDescription && <Description/>}
            </section>
        </div>
    );
}
