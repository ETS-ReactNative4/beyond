function Empty({texts, type}) {
    const {bundleFilter, workspace} = useDSWorkspaceContext();
    const label = bundleFilter ? 'filter' : 'application';
    const title = type === 'all' ? texts.empty[label].title : texts.empty.filter.title;
    const description = type === 'all' ? texts.empty[label].description : texts.empty.filter.description;
    const addModule = () => workspace.setState({addModule: true});

    return (
        <div className="ds-empty-container mt-100">
            <header>
                <h1 className="primary-color" dangerouslySetInnerHTML={{__html: title}}/>
                <h2 dangerouslySetInnerHTML={{__html: description}}/>
            </header>
            <BeyondButton onClick={addModule} className="primary icon-on-primary">
                {texts.actions.add}
                <DashboardIcon icon="add" className="circle"/>
            </BeyondButton>
        </div>
    );
}
