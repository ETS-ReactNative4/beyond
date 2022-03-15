/**
 * Represents the Panel View.
 *
 * Each panel can contain multiple boards/tabs. The view suscribes by itself
 * to the model changes and is updated from that changes without wait for
 * appContext changes.
 * @param panel
 * @returns {JSX.Element}
 * @constructor
 */
export function PanelView({panel}) {
    const [state, setState] = React.useState({total: panel.tabs.size, activeTab: panel.activeItem});
    const {activeTab} = state;

    const tab = panel.tabs.get(activeTab);
    const ref = React.useRef(null);
    useBinder([panel], () => {
        setState({...state, total: panel.tabs.size, activeTab: panel.activeItem})
    });

    React.useEffect(() => {
        const onClick = event => panel.setActive();
        ref.current?.addEventListener('click', onClick);
        return () => ref.current?.removeEventListener('click', onClick);
    }, []);

    if (!tab || tab.type === 'editor' && !panel.editor) {
        return null;
    }
    const Control = tab.type === 'editor' ? EditorView : tab.control;
    const tabs = [];
    panel.tabs.forEach((item, id) => {
        tabs.push(<PanelTab key={`tab-${panel.id}-${id}`} id={id} panel={panel} item={item}/>);
    });

    const specs = {panel: panel}
    if (tab.type === 'editor') specs.editor = panel.editor;
    return (
        <div ref={ref} className="ds__panel">
            <section className="ds__tabs-container">
                {tabs}
            </section>
            <BeyondScrollContainer className="panel__container">
                <Control {...specs} specs={tab.specs}/>
            </BeyondScrollContainer>
        </div>
    )
}
