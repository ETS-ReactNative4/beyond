class Control extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const iconsList = DS_ICONS;
        const iconsName = Object.keys(iconsList);

        return (
            <div className="icon-container">
                <h1>Icons</h1>
                <pre>
                    {'<DsIcon  icon="Nombre del ícono"/>'}
                </pre>
                <div className="icon-list">
                    {iconsName.map((iconName, index) => {
                        return (
                            <div className="icon-element" key={index}>
                                {iconName}
                                <DsIcon className="" icon={iconName}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        );

    }

}