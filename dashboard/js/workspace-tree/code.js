define(["exports", "@beyond-js/dashboard-lib/models/js", "@beyond-js/dashboard-lib/models/ts", "@beyond-js/ui/modal/code", "@beyond-js/ui/popover/code", "@beyond-js/ui/alert/code", "@beyond-js/ui/image/code", "@beyond-js/ui/spinner/code", "@beyond-js/ui/form/code", "@beyond-js/ui/icon/code", "@beyond-js/dashboard/core-components/code", "@beyond-js/dashboard/context-menu/code", "@beyond-js/dashboard/ds-select/code", "@beyond-js/dashboard/hooks/code", "@beyond-js/dashboard/unnamed/workspace/components/favorites/code", "@beyond-js/dashboard/ds-contexts/code", "react", "react-dom"], function (_exports2, _js, _ts, _code, _code2, _code3, _code4, _code5, _code6, _code7, _code8, _code9, _code10, _code11, _code12, _code13, dependency_0, dependency_1) {
  "use strict";

  Object.defineProperty(_exports2, "__esModule", {
    value: true
  });
  _exports2.DSTree = DSTree;
  _exports2.DSTreeContext = void 0;
  _exports2.FavoriteAction = FavoriteAction;
  _exports2.FilesTree = void 0;
  _exports2.ModalAction = ModalAction;
  _exports2.useDSTreeContext = _exports2.hmr = _exports2.branchFactory = _exports2.TreeFactory = void 0;
  //BEYOND UI
  //APP
  //CONTEXT AND WORKSPACE OBJECTS
  const dependencies = new Map();
  dependencies.set('react', dependency_0);
  dependencies.set('react-dom', dependency_1);
  const {
    beyond
  } = globalThis;
  const bundle = beyond.bundles.obtain('@beyond-js/dashboard/workspace-tree/code', false, {}, dependencies);
  const {
    container
  } = bundle;
  const module = container.is === 'module' ? container : void 0;

  const __pkg = bundle.package();

  const React = dependencies.get('react');
  const ReactDOM = dependencies.get('react-dom');

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }
  /**********
  ds-tree.jsx
  **********/


  const DSTreeContext = new React.createContext();
  _exports2.DSTreeContext = DSTreeContext;

  const useDSTreeContext = () => React.useContext(DSTreeContext);
  /**
   * Tree tabs is used to add the left padding in each subtree branch.
   * @type {string}
   */


  _exports2.useDSTreeContext = useDSTreeContext;
  const TREE_TABS = 5;
  /**
   * Main tree file
   *
   * @param title
   * @param className
   * @param controls
   * @param tree
   * @returns {JSX.Element}
   * @constructor
   */

  function DSTree({
    title,
    className,
    controls = {},
    tree
  }) {
    const [opened, setOpened] = React.useState(true);
    const cls = `${opened ? '' : 'is-hidden'}${title ? '' : ' no-header'}`;
    const {
      texts
    } = (0, _code13.useDSAsideContext)();

    if (!tree) {
      console.error("are you trying to instance a DSTree component without a tree?", tree);
      return null;
    }

    const [items, setItems] = React.useState(tree.items);
    (0, _code11.useBinder)([tree], () => setItems(tree.items));
    return /*#__PURE__*/React.createElement(DSTreeContext.Provider, {
      value: {
        actions: {},
        controls,
        tree,
        texts: texts.tree
      }
    }, /*#__PURE__*/React.createElement("section", {
      tabIndex: "0",
      className: `${cls} ds-tree__container${className ? ` ${className}` : ''}`
    }, title && /*#__PURE__*/React.createElement(DSTreeHeader, {
      tree: tree,
      opened: opened,
      title: title,
      setOpened: setOpened
    }), /*#__PURE__*/React.createElement("div", {
      className: "ds-tree"
    }, /*#__PURE__*/React.createElement(BranchList, {
      className: "first-tree",
      opened: opened,
      tree: tree
    }))));
  }
  /************************
  actions\bundle\action.jsx
  ************************/


  function FormAction({
    children
  }) {
    const {
      texts: {
        actions
      },
      formValues,
      fetching,
      object,
      errors,
      setFetching,
      reset,
      closeModal
    } = useAddBundleContext();
    const totalErrors = Object.keys(errors).length;
    const {
      name,
      type,
      route,
      bundle,
      layoutId
    } = formValues;

    const onClick = e => e.stopPropagation();

    const saveBundle = async specs => {
      try {
        setFetching(true);
        await object.addBundle(specs);
        setFetching(false);
        closeModal(false);
        reset();
      } catch (e) {
        console.error(e);
      }
    };

    const onSave = e => {
      e.preventDefault();
      e.stopPropagation();
      const specs = {
        bundles: bundle
      };

      if (bundle === 'widget') {
        specs.element = {
          name: name
        };
        if (type === 'layout') specs.id = layoutId;
        if (type === 'page') specs.route = route;
      }

      saveBundle(specs);
    };

    const attrs = {};
    const isWidgetValid = bundle === 'widget' && !!name && !!type;
    const isPageValid = isWidgetValid && type === 'page' && !!route;
    const isBundleValid = !!bundle && (isWidgetValid || bundle !== 'widget');
    if (fetching || !isWidgetValid && !isBundleValid) attrs.disabled = true;
    if (isWidgetValid && type === 'page' && !isPageValid) attrs.disabled = true;
    if (totalErrors) attrs.disabled = true;
    return /*#__PURE__*/React.createElement("div", {
      onClick: onClick,
      className: "ds-modal__content"
    }, /*#__PURE__*/React.createElement("form", {
      onSubmit: onSave
    }, children, /*#__PURE__*/React.createElement("div", {
      className: `actions end`
    }, /*#__PURE__*/React.createElement(_code6.BeyondButton, _extends({
      type: "submit"
    }, attrs, {
      onClick: onSave,
      className: "primary"
    }), fetching ? /*#__PURE__*/React.createElement(_code5.BeyondSpinner, {
      fetching: true,
      className: "on-primary"
    }) : actions.save))));
  }
  /*********************************
  actions\bundle\add-bundle-form.jsx
  *********************************/


  const AddBundleContext = React.createContext();

  const useAddBundleContext = () => React.useContext(AddBundleContext);

  function AddBundleForm({
    closeModal,
    item: {
      object
    }
  }) {
    const {
      texts: {
        tree: {
          bundle: texts
        }
      }
    } = (0, _code13.useDSAsideContext)();
    const [fetching, setFetching] = React.useState(false);
    const specs = {
      state: {
        name: '',
        route: '',
        type: false,
        layoudId: ''
      },
      validations: {
        name: {
          validation: value => !!value.match(/[a-z]+-[a-z]+/g),
          message: texts.widget.inputs.name.error
        },
        layoudId: {
          validation: value => !!value.match(/[a-z]+-*/g),
          message: texts.widget.inputs.layoutId.error
        },
        route: {
          validation: value => !!value.match(/^\/[a-z_-]+(\/\$\{[a-z]+\})*/g),
          message: texts.widget.inputs.route.error
        }
      }
    };
    const [formValues, handleChange, reset, errors, setValue] = (0, _code8.useForm)(specs);
    const {
      bundle
    } = formValues;
    const Control = bundle === 'widget' ? WidgetForm : MainForm;
    return /*#__PURE__*/React.createElement(AddBundleContext.Provider, {
      value: {
        closeModal,
        fetching,
        setFetching,
        object,
        setValue,
        reset,
        errors,
        texts,
        handleChange,
        formValues
      }
    }, /*#__PURE__*/React.createElement(Control, null));
  }
  /************************
  actions\bundle\header.jsx
  ************************/


  const Header = ({
    title,
    back
  }) => {
    return /*#__PURE__*/React.createElement("header", {
      className: "ds-modal_header"
    }, back && /*#__PURE__*/React.createElement(_code8.DSIconButton, {
      icon: "backArrow",
      onClick: back,
      className: "circle secondary"
    }), /*#__PURE__*/React.createElement("h4", null, title));
  };
  /***************************
  actions\bundle\main-form.jsx
  ***************************/


  function MainForm() {
    const {
      formValues,
      texts,
      setValue
    } = useAddBundleContext();
    const {
      bundle
    } = formValues;

    const onHandleChange = (e, item) => {
      e.stopPropagation();
      const target = e.currentTarget;
      const parent = target.closest('ul');
      const selected = parent.querySelector('li.selected');
      if (selected) selected.classList.remove('selected');
      target.classList.add('selected');
      setValue({
        bundle: item
      });
    };

    const props = {};
    if (!bundle) props.disabled = true;
    const items = ['widget', 'code', 'start', 'backend'].map(item => /*#__PURE__*/React.createElement("li", {
      key: item,
      onClick: e => onHandleChange(e, item)
    }, /*#__PURE__*/React.createElement("span", {
      className: "circle"
    }), /*#__PURE__*/React.createElement("span", null, item)));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Header, {
      title: texts.widget.title
    }), /*#__PURE__*/React.createElement(FormAction, null, /*#__PURE__*/React.createElement("ul", {
      className: "selectable__list"
    }, items)));
  }
  /*****************************
  actions\bundle\widget-form.jsx
  *****************************/


  function WidgetForm() {
    const {
      handleChange,
      texts: {
        widget: texts
      },
      fetching,
      setValue,
      formValues,
      reset,
      errors
    } = useAddBundleContext();
    const {
      name,
      route,
      layoutId,
      type
    } = formValues;

    const handleChangeSelect = ele => setValue({
      type: ele.value
    });

    const options = [{
      value: 'page',
      label: 'Page'
    }, {
      value: 'layout',
      label: 'Layout'
    }, {
      value: 'widget',
      label: 'Widget'
    }];

    const toReturn = () => reset();

    const attrs = {
      onChange: handleChange
    };
    if (fetching) attrs.disabled = true;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Header, {
      back: toReturn,
      title: texts.title
    }), /*#__PURE__*/React.createElement(FormAction, null, /*#__PURE__*/React.createElement("div", {
      className: "group-inputs"
    }, /*#__PURE__*/React.createElement("div", {
      className: "input-field"
    }, /*#__PURE__*/React.createElement("input", _extends({
      name: "name",
      placeholder: texts.inputs.name.label,
      value: name
    }, attrs, {
      required: true,
      disabled: fetching
    })), errors.name && /*#__PURE__*/React.createElement("span", {
      className: "error-message"
    }, texts.inputs.name.error)), /*#__PURE__*/React.createElement("div", {
      className: "form-select"
    }, /*#__PURE__*/React.createElement("label", null, texts.inputs.type.label), /*#__PURE__*/React.createElement("div", {
      className: "relative__container"
    }, /*#__PURE__*/React.createElement(_code10.DSSelect, {
      label: texts.inputs.type.placeholder,
      options: options,
      value: type,
      onSelect: handleChangeSelect
    }))), type === 'page' && /*#__PURE__*/React.createElement("div", {
      className: "input-field"
    }, /*#__PURE__*/React.createElement("label", null, texts.inputs.route.label), /*#__PURE__*/React.createElement("input", _extends({
      required: true,
      name: "route",
      value: route,
      placeholder: texts.inputs.route.label
    }, attrs)), errors.route && /*#__PURE__*/React.createElement("span", {
      className: "error-message"
    }, texts.inputs.route.error)), type === 'layout' && /*#__PURE__*/React.createElement("div", {
      className: "input-field"
    }, /*#__PURE__*/React.createElement("label", null, texts.inputs.layoutId.label), /*#__PURE__*/React.createElement("input", _extends({
      required: true,
      name: "layoutId",
      value: layoutId ?? '',
      placeholder: texts.inputs.layoutId.label
    }, attrs)), errors.route && /*#__PURE__*/React.createElement("span", {
      className: "error-message"
    }, texts.inputs.layoutId.error)))));
  }
  /*****************************
  actions\favorites\favorite.jsx
  *****************************/

  /**
   * Favorite icon button
   *
   * It is used by sources branches and subtree branches
   * @param item
   * @returns {JSX.Element|null}
   * @constructor
   */


  function FavoriteAction({
    item
  }) {
    const [state, setState] = React.useState({
      isFavorite: item.isFavorite
    });
    const {
      showModal,
      confirmDelete,
      isFavorite
    } = state;
    let {
      texts: {
        favorites: texts
      }
    } = useDSTreeContext();

    const toggleFavorite = event => {
      event.stopPropagation();
      event.preventDefault();
      const newState = item.isFavorite ? {
        confirmDelete: true
      } : {
        showModal: true
      };
      setState({ ...state,
        ...newState
      });
    };

    const favoriteIcon = isFavorite ? 'bookmark' : 'bookmark-border';
    (0, _code11.useBinder)([item], () => setState({ ...state,
      isFavorite: true
    }));

    const onConfirm = async () => {
      await item.removeFavoriteItem();
      setState({ ...state,
        isFavorite: false,
        confirmDelete: false
      });
    };

    const toggleModal = () => setState(state => ({ ...state,
      showModal: !showModal
    }));

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_code8.DSIcon, {
      className: "bookmark-icon",
      onClick: toggleFavorite,
      icon: favoriteIcon
    }), showModal && /*#__PURE__*/React.createElement(AddFavoriteForm, {
      item: item,
      toggleModal: toggleModal,
      setFavorite: () => setState({
        isFavorite: true
      })
    }), confirmDelete && /*#__PURE__*/React.createElement(_code.BeyondConfirmModal, {
      show: true,
      className: "xs ds-modal",
      onCancel: () => setState({
        confirmDelete: false
      }),
      onConfirm: onConfirm,
      text: texts.favorites.actions.delete
    }));
  }
  /*************************
  actions\favorites\list.jsx
  *************************/


  function FavoritesList({
    setList
  }) {
    const {
      workspace: {
        application: {
          favorites
        }
      }
    } = (0, _code13.useDSWorkspaceContext)();
    let {
      texts: {
        favorites: texts
      }
    } = useDSTreeContext();
    const items = [];
    const [addNew, setAddNew] = React.useState('');
    const showInput = addNew || !favorites.items.size;
    /**
     * If there are no items in the favorites list the form is shown directly
     *
     * @type {string|boolean}
     */

    if (showInput) return /*#__PURE__*/React.createElement(NewForm, {
      setList: setList,
      setAddNew: setAddNew
    });
    favorites.items.forEach(item => {
      items.push( /*#__PURE__*/React.createElement("li", {
        key: item.id,
        onClick: event => {
          event.stopPropagation();
          const target = event.currentTarget;
          const parent = target.closest('ul');
          setList(item.id);
          parent.querySelectorAll('li.selected').forEach(li => li.classList.remove('selected'));
          event.currentTarget.classList.add('selected');
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "circle"
      }), /*#__PURE__*/React.createElement("span", null, item.name)));
    });

    const onAdd = event => {
      event.stopPropagation();
      event.preventDefault();
      setAddNew(true);
      setList('');
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("ul", {
      className: "selectable__list"
    }, items), /*#__PURE__*/React.createElement("div", {
      className: "text-right"
    }, /*#__PURE__*/React.createElement("a", {
      className: "link",
      onClick: onAdd
    }, texts.actions.new)));
  }
  /**************************
  actions\favorites\modal.jsx
  **************************/


  function AddFavoriteForm({
    item,
    toggleModal,
    setFavorite
  }) {
    let {
      texts
    } = useDSTreeContext();
    const [state, setState] = React.useState({});
    const {
      fetching,
      list
    } = state;
    const props = {};
    if (!list) props.disabled = true;

    const onSave = event => {
      event.stopPropagation();
      event.preventDefault();
      setFavorite(true);
      toggleModal();
      item.addFavorite(list);
    };

    const onClick = event => event.stopPropagation();

    return /*#__PURE__*/React.createElement(_code.BeyondModal, {
      show: true,
      onClose: toggleModal,
      className: "xs ds-modal ds-tree__forms"
    }, /*#__PURE__*/React.createElement("header", {
      onClick: onClick,
      className: "ds-modal_header"
    }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h4", null, texts.favorites.title))), /*#__PURE__*/React.createElement("div", {
      onClick: onClick,
      className: "ds-modal__content"
    }, /*#__PURE__*/React.createElement("form", {
      onSubmit: onSave
    }, /*#__PURE__*/React.createElement(FavoritesList, {
      setFetching: value => setState({
        fetching: value
      }),
      setList: value => setState({
        list: value
      })
    }), /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, /*#__PURE__*/React.createElement(_code6.BeyondButton, _extends({}, props, {
      onClick: onSave,
      className: "primary"
    }), fetching ? /*#__PURE__*/React.createElement(_code5.BeyondSpinner, {
      fetching: true,
      className: "on-primary"
    }) : texts.actions.save)))));
  }
  /*****************************
  actions\favorites\new-form.jsx
  *****************************/


  function NewForm({
    setList,
    setAddNew
  }) {
    const {
      workspace: {
        application: {
          favorites
        }
      }
    } = (0, _code13.useDSWorkspaceContext)();
    let {
      texts: {
        favorites: texts
      }
    } = useDSTreeContext();

    const handleName = event => {
      event.stopPropagation();
      setList(event.currentTarget.value);
    };

    const onClick = event => {
      event.stopPropagation();
      event.preventDefault();
      setAddNew(false);
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", {
      autoComplete: "off",
      name: "name",
      label: "Nombre de la lista",
      placeholder: "Nombre de la lista",
      required: true,
      onChange: handleName
    }), !!favorites.items.size && /*#__PURE__*/React.createElement("div", {
      className: "text-right"
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      className: "link",
      onClick: onClick
    }, texts.actions.select)));
  }
  /*****************
  actions\inline.jsx
  *****************/

  /**
   * Component to show inline actions in a branch or tree.
   *
   * The actions must be defined in the inline Actions property of the module.
   * The component manages the functionality to show modal or a confirm modal if it's required
   * @param {object} item  Tree or Branch object
   * @param {boolean} fetching defines if the element it's consulting or processing data
   * @param {function} setModalAction it's passed by header object to manage the modal functionality
   * @param {object} inline additional inlines actions defined from the item directly
   * @returns {JSX.Element}
   * @constructor
   */


  function DSActions({
    item,
    fetching,
    setModalAction,
    inline = []
  }) {
    const onClickInlineAction = (event, action) => {
      event.preventDefault();
      event.stopPropagation();

      if (action.modal) {
        setModalAction(action);
        return;
      }

      if (action.action) action.action();else item[action.name]();
    };

    inline = item.inlineActions?.concat(inline);
    let inlineOutput = inline?.map(action => /*#__PURE__*/React.createElement(_code8.DSIcon, {
      key: `inline-${action.name}`,
      icon: action.icon,
      onClick: event => onClickInlineAction(event, action)
    }));
    if (fetching) inlineOutput = /*#__PURE__*/React.createElement(_code5.BeyondSpinner, {
      active: true,
      className: "primary"
    });
    return /*#__PURE__*/React.createElement("div", {
      className: "branch__actions"
    }, inlineOutput, item.favoriteAction !== false && /*#__PURE__*/React.createElement(FavoriteAction, {
      item: item,
      openModalAction: setModalAction
    }));
  }
  /***********************
  actions\modal-create.jsx
  ***********************/


  function DSModalCreate({
    action,
    item,
    closeModal
  }) {
    const {
      texts
    } = useDSTreeContext();
    const [state, setState] = React.useState({
      label: ''
    });
    const {
      error,
      fetching,
      label
    } = state;
    const props = {};
    if (fetching) props.disabled = true;
    const actions = texts.actions;
    const actionTexts = texts.itemActions[action.name];

    const onChange = event => {
      event.stopPropagation();
      setState({ ...state,
        label: event.currentTarget.value
      });
    };

    const onSave = async event => {
      event.preventDefault();
      event.stopPropagation();
      setState({
        fetching: true
      });

      try {
        const response = await item.create(label);
        setState({
          fetching: false,
          label: ''
        });
        response.error ? setState({
          error: response.message
        }) : closeModal();
      } catch (e) {
        setState({
          fetching: false
        });
        setState({ ...state,
          error: e.message
        });
      }
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
      className: "ds-modal_header"
    }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h4", null, actionTexts.title))), /*#__PURE__*/React.createElement("div", {
      className: "ds-modal__content"
    }, error && /*#__PURE__*/React.createElement(_code3.BeyondAlert, {
      type: "error"
    }, texts.errors.hasOwnProperty(error) ? texts.errors[error] : texts.errors.default), /*#__PURE__*/React.createElement("form", {
      onSubmit: onSave
    }, /*#__PURE__*/React.createElement("label", null, actionTexts.label), /*#__PURE__*/React.createElement("input", {
      name: "name",
      value: label,
      placeholder: actionTexts.placeholder,
      onChange: onChange,
      type: "text",
      className: "form-control"
    }), /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, /*#__PURE__*/React.createElement(_code6.BeyondButton, _extends({}, props, {
      onClick: onSave,
      className: "primary"
    }), fetching ? /*#__PURE__*/React.createElement(_code5.BeyondSpinner, {
      fetching: true,
      className: "on-primary"
    }) : actions.create)))));
  }
  /****************
  actions\modal.jsx
  ****************/

  /**
   * Shows a modal and includes the control for the action to execute
   * @param action
   * @param item {branch|tree} Element treated, can be a branch or tree
   * @param closeModal
   * @returns {JSX.Element|null}
   * @constructor
   */


  function ModalAction({
    action,
    item,
    closeModal
  }) {
    if (!action.name) {
      throw Error('the action does not has a name');
    }

    const controls = {
      default: ActionBranch,
      create: DSModalCreate,
      rename: RenameItem,
      static: AddStatic,
      addBundle: AddBundleForm
    };
    if (!action) return null; //TODO: @julio check if is necessary controls object

    const Control = controls[action.name];
    if (!Control) return null;
    const cls = `ds-modal ds-tree__forms${action?.className ? ` ${action.className}` : ' xs'}`;
    return /*#__PURE__*/React.createElement(_code.BeyondModal, {
      show: true,
      onClose: closeModal,
      className: cls
    }, /*#__PURE__*/React.createElement("div", {
      onClick: event => event.stopPropagation()
    }, /*#__PURE__*/React.createElement(Control, {
      action: action,
      item: item,
      closeModal: closeModal
    })));
  }
  /*****************
  actions\rename.jsx
  *****************/


  function RenameItem({
    item,
    closeModal
  }) {
    let {
      texts
    } = useDSTreeContext();
    const {
      actions
    } = texts.files;
    const [state, setState] = React.useState({
      label: item.label
    });
    const {
      label,
      fetching,
      error
    } = state;
    const props = {};
    if (fetching) props.disabled = true;

    const onClick = () => setState({
      label: label
    });

    const onSave = event => {
      event.preventDefault();
      event.stopPropagation();
      setState({
        fetching: true
      });

      if (item.rename(label)) {
        closeModal(false);
        setState({
          fetching: false
        });
        return;
      }

      setState({
        error: true
      });
    };

    const onChange = event => {
      event.preventDefault();
      event.stopPropagation();
      setState({
        label: event.currentTarget.value
      });
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
      onClick: onClick,
      className: "ds-modal_header"
    }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h4", null, texts.rename))), /*#__PURE__*/React.createElement("div", {
      onClick: onClick,
      className: "ds-modal__content"
    }, /*#__PURE__*/React.createElement("form", {
      onSubmit: onSave
    }, /*#__PURE__*/React.createElement("label", null, texts.rename, " file ", item.label), /*#__PURE__*/React.createElement("input", {
      name: "name",
      value: label,
      onChange: onChange,
      type: "text",
      className: "form-control"
    }), /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, /*#__PURE__*/React.createElement(_code6.BeyondButton, _extends({}, props, {
      onClick: onSave,
      className: "primary"
    }), fetching ? /*#__PURE__*/React.createElement(_code5.BeyondSpinner, {
      fetching: true,
      className: "on-primary"
    }) : actions.save)))));
  }
  /****************************
  actions\static\add-static.jsx
  ****************************/


  function AddStatic({
    closeModal,
    item
  }) {
    const btn = React.useRef(null);
    const box = React.useRef(null);
    const {
      workspace: {
        application,
        uploader
      }
    } = (0, _code13.useDSWorkspaceContext)();
    const [state, setState] = React.useState({
      error: false,
      items: uploader.items
    });
    const {
      texts: {
        static: {
          form: texts
        }
      }
    } = useDSTreeContext();

    const update = () => {
      if (uploader.items < 1) return;
      setState({ ...state,
        ...{
          items: uploader.items
        }
      });
    };

    React.useEffect(() => {
      const getModel = () => {
        if (item.table?.name === 'modules-static') return item;
        return item.object.table.name === 'applications-static' ? application?.application : item.object.module;
      };

      uploader.create(btn.current, box.current, getModel());
    }, []);
    (0, _code11.useBinder)([uploader], update);
    return /*#__PURE__*/React.createElement("div", {
      className: "ds-static-form"
    }, /*#__PURE__*/React.createElement("header", {
      className: "ds-modal_header"
    }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h4", null, texts.header.title), /*#__PURE__*/React.createElement("h5", {
      className: "primary-color"
    }, texts.header.detail))), /*#__PURE__*/React.createElement("section", {
      className: "ds-modal__content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "jd-gallery__drop-zone",
      ref: box
    }, /*#__PURE__*/React.createElement(_code7.BeyondIcon, {
      icon: "upload"
    }), /*#__PURE__*/React.createElement("h3", {
      ref: btn
    }, texts.title), state.error && /*#__PURE__*/React.createElement("div", {
      className: "alert alert-danger"
    }, texts.errors.invalidFiles)), /*#__PURE__*/React.createElement(GalleryView, null), /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, /*#__PURE__*/React.createElement(_code6.BeyondButton, {
      onClick: closeModal,
      className: "primary"
    }, texts.actions.close))));
  }
  /******************************
  actions\static\gallery-item.jsx
  ******************************/


  function GalleryItem({
    item
  }) {
    const {
      workspace: {
        uploader,
        application: {
          application
        }
      }
    } = (0, _code13.useDSWorkspaceContext)();
    const src = item.fetched ? `${application.url}${item.pathname}` : item.src;

    const onDelete = () => uploader.deleteItem(item.filename);

    return /*#__PURE__*/React.createElement(_code4.BeyondImage, {
      className: "jd-gallery__img",
      src: src
    }, item.fetched && /*#__PURE__*/React.createElement("figcaption", null, /*#__PURE__*/React.createElement(_code7.BeyondIconButton, {
      icon: "delete",
      onClick: onDelete
    })));
  }
  /*************************
  actions\static\gallery.jsx
  *************************/


  function GalleryView() {
    const {
      workspace: {
        uploader
      }
    } = (0, _code13.useDSWorkspaceContext)();
    const {
      items
    } = uploader;
    if (!items || !items.size) return null;
    const output = [];
    items.forEach((item, i) => output.push( /*#__PURE__*/React.createElement("li", {
      key: `image-${i}`
    }, /*#__PURE__*/React.createElement(GalleryItem, {
      item: item
    }))));
    return /*#__PURE__*/React.createElement("div", {
      className: "jd-gallery__list"
    }, /*#__PURE__*/React.createElement("ul", null, output));
  }
  /*************
  arrow-tree.jsx
  *************/


  function ArrowTree({
    opened
  }) {
    const clsIcon = `tree__icon-open ${opened ? ` tree__icon--opened` : ''}`;
    return /*#__PURE__*/React.createElement(_code8.DSIcon, {
      className: clsIcon,
      icon: "arrowDropDown"
    });
  }
  /************************
  branch\actions\action.jsx
  ************************/


  function ActionBranch({
    action,
    openConfirmAction,
    openModalAction
  }) {
    const {
      name,
      icon
    } = action;
    let {
      texts
    } = useDSTreeContext();
    const [showConfirm, toggleConfirm] = React.useState(false);

    const manageAction = event => {
      event.stopPropagation();
      event.preventDefault();

      if (action.confirm) {
        openConfirmAction(action.name);
        toggleConfirm(!showConfirm);
        return;
      }
      /**
       * The control can be passed as a "control" property in the action object
       * or could be defined into the modal objects and being checked by modal boolean property.
       * The last one is the currently way. the control property instead is accepted by legacy.
       */


      if (action.control || action.modal) {
        openModalAction(action);
        return;
      }

      onConfirm();
    };

    const onConfirm = async event => {
      toggleConfirm(action.name);
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("li", {
      key: name,
      onClick: manageAction,
      "data-action": name
    }, /*#__PURE__*/React.createElement(_code8.DSIcon, {
      icon: icon,
      "data-element": name
    }), texts.actions[name]));
  }
  /**********************
  branch\ds-resources.jsx
  **********************/

  /**
   * Represents a subtree elements who has items itself.
   *
   * @param item
   * @param label
   * @param actions
   * @returns {JSX.Element}
   * @constructor
   */


  function DsResourcesBranch({
    branch,
    label,
    actions,
    className,
    level = 1
  }) {
    // all sublevels are opened by default
    const [opened, setOpened] = React.useState(!!level > 0);
    const [deleted, setDeleted] = React.useState();
    const cls = `item ds-tree item--subtree ${className ? className : ''}`;
    const titleIcon = opened ? 'folderOpen' : 'folder';
    const styles = {};
    if (level > 0) styles.paddingLeft = `${level * TREE_TABS}px`;

    const onClick = event => {
      event.stopPropagation();
      event.preventDefault();
      setOpened(!opened);
    }; // if the element is removed then is not rendered


    if (deleted) return null;
    return /*#__PURE__*/React.createElement("li", {
      className: cls
    }, /*#__PURE__*/React.createElement("section", {
      className: "item__container",
      onClick: onClick
    }, /*#__PURE__*/React.createElement("div", {
      style: styles,
      className: "item__label"
    }, /*#__PURE__*/React.createElement(_code8.DSIcon, {
      icon: titleIcon
    }), /*#__PURE__*/React.createElement("span", null, branch.label))), /*#__PURE__*/React.createElement(BranchList, {
      opened: opened,
      level: level + 1,
      tree: branch
    }));
  }
  /*****************
  branch\factory.jsx
  *****************/

  /**
   * Validates each branch checking if are Subtree or only branches.
   * @param tree
   * @param opened
   * @param level
   * @returns {JSX.Element}
   * @constructor
   */


  function BranchFactory({
    item,
    opened,
    level = 0
  }) {
    const {
      controls
    } = useDSTreeContext();
    const types = {
      processor: DSProcessorBranch,
      default: DSSourceBranch,
      source: DSSourceBranch,
      subtree: DSSubTree,
      static: DSStaticBranch,
      module: DSModuleBranch,
      bundle: DSBundleBranch,
      dependency: DSDependencyBranch,
      consumer: DSConsumerBranch,
      resources: DsResourcesBranch
    };
    const is = item.type ? item.type : item.items?.size ? 'subtree' : 'default';
    const style = {};
    if (level > 0) style.paddingLeft = 8 * (level + 1);
    let Control = types[is];
    if (!!controls[is]) Control = controls[is];
    return /*#__PURE__*/React.createElement(Control, {
      branch: item,
      level: level
    });
  }
  /****************
  branch\header.jsx
  ****************/

  /**
   *
   * @param fetching
   * @param className
   * @param item {mixed} Can be branch or Tree element.
   * @param inline
   * @param onClick
   * @param level
   * @param children
   * @returns {JSX.Element}
   * @constructor
   */


  function DSItemHeader({
    fetching,
    className,
    item,
    inline,
    onClick,
    level,
    children
  }) {
    const styles = {};
    if (level > 0) styles.paddingLeft = `${(level + 1) * TREE_TABS}px`;
    const [state, setState] = React.useState({});
    /**
     * Hede we keep using multiples useState beacause the functions to open modal and confirm need to be
     * passed to children components.
     */

    const [showContextMenu, toggleContextMenu] = React.useState();
    const [modalAction, setModalAction] = React.useState(false);
    const [confirmAction, setConfirmAction] = React.useState(false);
    const {
      workspace: {
        contextMenu
      }
    } = (0, _code13.useDSWorkspaceContext)();
    let {
      texts
    } = useDSTreeContext();
    const ref = React.useRef();
    (0, _code11.useBinder)([contextMenu], () => {
      if (!ref.current === contextMenu.target) return;
      if (showContextMenu) return;
      toggleContextMenu({
        x: contextMenu.event.clientX,
        y: contextMenu.event.clientY
      });
    }, `fired.item-item-${level}.${item.label}`);
    (0, _code11.useBinder)([contextMenu], () => toggleContextMenu(false), 'closed');
    const actions = [];

    const onConfirm = async () => {
      try {
        await item[confirmAction]();
        setConfirmAction(false);
      } catch (e) {
        console.error("error", e);
      }
    };

    item?.actions?.forEach(action => actions.push( /*#__PURE__*/React.createElement(ActionBranch, {
      key: action.name,
      openConfirmAction: setConfirmAction,
      openModalAction: setModalAction,
      action: action,
      item: item
    })));
    const cls = className ?? 'item__container';
    return /*#__PURE__*/React.createElement("section", {
      ref: ref,
      onClick: onClick,
      "data-context": `item-item-${level}.${item.label}`,
      style: styles,
      className: cls
    }, children, fetching ? /*#__PURE__*/React.createElement(_code5.BeyondSpinner, {
      active: true,
      className: "on-primary"
    }) : /*#__PURE__*/React.createElement(DSActions, {
      inline: inline,
      setModalAction: setModalAction,
      item: item
    }), showContextMenu && /*#__PURE__*/React.createElement(_code9.DSContextMenu, {
      unmount: toggleContextMenu,
      specs: showContextMenu
    }, /*#__PURE__*/React.createElement("ul", null, actions)), modalAction && /*#__PURE__*/React.createElement(ModalAction, {
      item: item,
      action: modalAction,
      closeModal: () => setModalAction(false)
    }), confirmAction && /*#__PURE__*/React.createElement(_code.BeyondConfirmModal, {
      show: true,
      className: "xs ds-modal",
      onCancel: () => setConfirmAction(false),
      onConfirm: onConfirm,
      text: texts.confirm[confirmAction]
    }));
  }
  /**************
  branch\list.jsx
  **************/


  function BranchList({
    tree,
    className,
    opened,
    level = 0
  }) {
    let clsList = `ds-tree__branches-list tree__list-level-${level}${opened ? '' : ' tree__list--hidden'}`;
    if (className) clsList += ` ${className}`;
    const {
      texts
    } = (0, _code13.useDSAsideContext)();

    const loop = (item, key) => /*#__PURE__*/React.createElement(BranchFactory, {
      level: level + 1,
      item: item,
      key: `factory-${key}}`
    });

    if (!tree?.items.size) {
      return /*#__PURE__*/React.createElement("ul", {
        className: clsList
      }, /*#__PURE__*/React.createElement("li", {
        className: "empty-tree"
      }, texts.favorites.empty.title));
    }

    return /*#__PURE__*/React.createElement("ul", {
      className: clsList
    }, [...tree.items.values()].map(loop));
  }
  /************************************
  branch\subtree\ds-subtree-actions.jsx
  ************************************/


  function DSSubtreeActions({
    branch,
    onDelete,
    onAdd
  }) {
    const {
      texts,
      showCreate,
      actions,
      object
    } = useDSTreeContext();
    const [showConfirmDelete, setShowConfirmDelete] = React.useState();

    const onCreate = event => {
      event.stopPropagation();
      showCreate({
        branch: branch
      });
    };

    const showDelete = event => {
      event.preventDefault();
      event.stopPropagation();

      if (!object && !actions?.subtree?.delete) {
        console.warn("the object manager of the tree was not correctly passed ");
        return;
      }

      setShowConfirmDelete(true);
    };

    const onConfirmDelete = event => {
      if (actions?.subtree?.delete) {
        actions.subtree.delete(branch.path, branch.specs);
        onDelete(true);
        return;
      }

      object.deleteFolder(branch.path);
      onDelete(true); //onDelete();
    };

    const hideDelete = event => setShowConfirmDelete(false);

    return /*#__PURE__*/React.createElement("nav", {
      className: "branch__actions"
    }, /*#__PURE__*/React.createElement(FavoriteAction, {
      item: branch
    }), /*#__PURE__*/React.createElement(_code2.BeyondPopover, {
      placement: "right-start",
      className: "item-actions",
      target: /*#__PURE__*/React.createElement(_code8.DSIcon, {
        icon: "moreVert"
      })
    }, /*#__PURE__*/React.createElement("ul", null, actions.create !== false && /*#__PURE__*/React.createElement("li", {
      onClick: onCreate,
      "data-element": "folder"
    }, /*#__PURE__*/React.createElement(_code8.DSIcon, {
      icon: "file"
    }), texts.createFile), /*#__PURE__*/React.createElement("li", {
      onClick: showDelete,
      "data-element": "folder"
    }, /*#__PURE__*/React.createElement(_code8.DSIcon, {
      icon: "delete"
    }), texts.delete))), showConfirmDelete && /*#__PURE__*/React.createElement(_code.BeyondConfirmModal, {
      show: true,
      className: "md ds-modal",
      onCancel: hideDelete,
      onConfirm: onConfirmDelete,
      text: '¿Desea eliminar el directorio?'
    }));
  }
  /****************************
  branch\subtree\ds-subtree.jsx
  ****************************/

  /**
   * Represents a subtree elements who has items itself.
   *
   * @param item
   * @param label
   * @param actions
   * @returns {JSX.Element}
   * @constructor
   */


  function DSSubTree({
    branch,
    label,
    actions,
    className,
    level = 1
  }) {
    // all sublevels are opened by default
    const [opened, setOpened] = React.useState(!!level > 0);
    const [deleted, setDeleted] = React.useState();
    const cls = `item ds-tree item--subtree ${className ? className : ''}`;
    const titleIcon = opened ? 'folderOpen' : 'folder';
    const styles = {};
    if (level > 0) styles.paddingLeft = `${level * TREE_TABS}px`;

    const onClick = event => {
      event.stopPropagation();
      event.preventDefault();
      setOpened(!opened);
    }; // if the element is removed then is not rendered


    if (deleted) return null;
    return /*#__PURE__*/React.createElement("li", {
      className: cls
    }, /*#__PURE__*/React.createElement(DSItemHeader, {
      item: branch,
      level: level,
      onClick: onClick
    }, /*#__PURE__*/React.createElement("div", {
      style: styles,
      className: "item__label"
    }, /*#__PURE__*/React.createElement(_code8.DSIcon, {
      icon: titleIcon
    }), /*#__PURE__*/React.createElement("span", null, branch.label))), /*#__PURE__*/React.createElement(BranchList, {
      opened: opened,
      level: level + 1,
      tree: branch
    }));
  }
  /**********************
  branch\types\bundle.jsx
  **********************/


  function DSBundleBranch({
    branch,
    level = 1
  }) {
    const [totalItems, setTotalItems] = React.useState(branch.items?.size);
    const [opened, setOpened] = React.useState();

    const onClick = async event => {
      event.stopPropagation();
      setOpened(!opened);
    };

    const onAdded = () => {
      window.setTimeout(() => setTotalItems(branch.items.size), 150);
    };

    (0, _code11.useBinder)([branch], onAdded);
    (0, _code11.useBinder)([branch], onAdded, 'branch.added');
    const clsIcon = `tree__icon-open ${opened ? ` tree__icon--opened` : ''}`;
    return /*#__PURE__*/React.createElement("li", {
      className: "item",
      tabIndex: "-1",
      "data-id": branch.id
    }, /*#__PURE__*/React.createElement(DSItemHeader, {
      item: branch,
      level: level,
      onClick: onClick
    }, /*#__PURE__*/React.createElement("div", {
      className: "item__label"
    }, /*#__PURE__*/React.createElement(_code8.DSIcon, {
      className: clsIcon,
      icon: "arrowDropDown"
    }), /*#__PURE__*/React.createElement(_code8.DSIcon, {
      icon: `bundle.${branch.label}`
    }), /*#__PURE__*/React.createElement("span", null, branch.label))), !!totalItems && /*#__PURE__*/React.createElement(BranchList, {
      opened: opened,
      level: level + 1,
      tree: branch
    }));
  }
  /************************
  branch\types\consumer.jsx
  ************************/


  function DSConsumerBranch({
    branch,
    level = 1
  }) {
    const styles = {};
    if (level > 0) styles.paddingLeft = `${level * TREE_TABS}px`;
    const [errors, setErrors] = React.useState(branch.errors);
    const [state, setState] = React.useState({});
    const [opened, setOpened] = React.useState();
    const {
      workspace: {
        openBoard
      }
    } = (0, _code13.useDSWorkspaceContext)();
    (0, _code11.useBinder)([branch, branch.compiler], () => {
      setErrors(branch.errors);
      setState({
        bundleTree: branch.bundleTree,
        fetching: branch.fetching
      });
    });

    const openErrors = event => {
      openBoard('module', {
        moduleId: branch.moduleId
      });
    };

    const onClick = async event => {
      await branch.loadBundle();
      setOpened(!opened);
    };

    const cls = `item__container ${errors > 0 ? '| has__errors' : ''} `;
    return /*#__PURE__*/React.createElement("li", {
      className: "item",
      tabIndex: "-1"
    }, /*#__PURE__*/React.createElement("section", {
      onClick: onClick,
      style: styles,
      className: cls
    }, /*#__PURE__*/React.createElement("div", {
      className: "item__label"
    }, /*#__PURE__*/React.createElement(ArrowTree, {
      opened: opened
    }), /*#__PURE__*/React.createElement(_code8.DSIcon, {
      icon: `${branch.icon}`
    }), /*#__PURE__*/React.createElement("span", null, branch.label)), /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DSActions, {
      inline: branch.inlineActions,
      item: branch
    }), errors > 0 && /*#__PURE__*/React.createElement("div", {
      onClick: openErrors,
      className: "item__errors"
    }, branch.errors))), state.bundleTree && /*#__PURE__*/React.createElement(BranchList, {
      opened: opened,
      tree: branch.bundleTree,
      level: level + 1
    }));
  }
  /**************************
  branch\types\dependency.jsx
  **************************/


  function DSDependencyBranch({
    branch,
    level = 1
  }) {
    const styles = {};
    if (level > 0) styles.paddingLeft = `${level * TREE_TABS}px`;
    const {
      workspace: {
        openFile
      }
    } = (0, _code13.useDSWorkspaceContext)();

    const onClick = event => {
      event.preventDefault(); //TODO: @julio check how get corretly the processsor dependency file

      openFile({
        type: 'dependency',
        source: {
          label: branch.label,
          id: branch.item.id,
          code: branch.item.declaration.code
        },
        processor: 'ts',
        path: branch.item.id,
        external: branch.item.external,
        dependency: branch.item
      });
    };

    return /*#__PURE__*/React.createElement("li", {
      className: "item",
      tabIndex: "-1"
    }, /*#__PURE__*/React.createElement(DSItemHeader, {
      item: branch,
      level: level,
      onClick: onClick
    }, /*#__PURE__*/React.createElement("div", {
      className: "item__label"
    }, /*#__PURE__*/React.createElement(_code8.DSIcon, {
      icon: `${branch.icon}`
    }), /*#__PURE__*/React.createElement("span", null, branch.label))));
  }
  /**********************
  branch\types\module.jsx
  **********************/


  function DSModuleBranch({
    branch,
    level = 1
  }) {
    const styles = {};
    if (level > 0) styles.paddingLeft = `${(level + 1) * TREE_TABS}px`;
    const [state, setState] = React.useState({});
    const {
      workspace: {
        openBoard
      }
    } = (0, _code13.useDSWorkspaceContext)();
    const {
      moduleManager,
      setActiveAside
    } = (0, _code13.useDSAsideContext)();
    const element = React.createRef();

    const onClick = async event => {
      event.stopPropagation();

      try {
        if (branch.loaded) {
          setState(state => ({ ...state,
            opened: !state.opened,
            totalItems: branch.items.size
          }));
          return;
        }

        setState({ ...state,
          expanding: true
        });
        await branch.expand();
        setState(state => ({ ...state,
          opened: !state.opened,
          items: branch.items,
          totalItems: branch.items.size
        }));
      } catch (e) {
        console.error(e);
      }
    };

    const inlineActions = [{
      name: 'open',
      icon: 'arrowForward',
      action: async () => {
        openBoard('module', {
          label: branch?.module.pathname,
          moduleId: branch.module.id
        });
      }
    }, {
      name: 'setActive',
      icon: 'starRegular',
      action: async () => {
        const target = element.current;
        setState({
          fetching: true
        });
        target.closest('.ds__aside__detail')?.classList.add('is-fetching');
        target.classList.toggle('item--action-processing');
        await moduleManager.setActive(branch?.module.id);
        target.classList.toggle('item--action-processing');
        target.classList.add('item--action-processed');
        target.closest('.ds__aside__detail ').classList.toggle('is-fetching');
        window.setTimeout(() => {
          setState({
            fetching: false
          });
          openBoard('module', {
            label: branch?.module.pathname,
            moduleId: branch.module.id
          });
          setActiveAside('module', {
            moduleId: branch?.module.id
          });
        }, 600);
      }
    }];
    (0, _code11.useBinder)([branch], () => setState({ ...state,
      fetching: branch.fetching
    }));
    (0, _code11.useBinder)([branch], () => {
      window.setTimeout(() => setState({ ...state,
        totalItems: branch.items.size
      }), 150);
    }, 'branch.added');
    const clsIcon = `tree__icon-open ${state.opened ? ` tree__icon--opened` : ''}`;
    return /*#__PURE__*/React.createElement("li", {
      ref: element,
      className: `item ${state.fetching ? `item--fetching` : ''}`,
      tabIndex: "-1"
    }, /*#__PURE__*/React.createElement(DSItemHeader, {
      inline: inlineActions,
      fetching: state.fetching,
      level: level,
      item: branch,
      onClick: onClick
    }, /*#__PURE__*/React.createElement("div", {
      className: "item__label"
    }, /*#__PURE__*/React.createElement(_code8.DSIcon, {
      className: clsIcon,
      icon: "arrowDropDown"
    }), /*#__PURE__*/React.createElement(_code8.DSIcon, {
      icon: `bundle.default`
    }), /*#__PURE__*/React.createElement("span", null, branch.label))), !!state.totalItems && /*#__PURE__*/React.createElement(BranchList, {
      opened: state.opened,
      level: level + 1,
      tree: branch
    }));
  }
  /********************************
  branch\types\processor-branch.jsx
  ********************************/


  function DSProcessorBranch({
    branch,
    level = 1
  }) {
    const styles = {};
    if (level > 0) styles.paddingLeft = `${(level + 1) * TREE_TABS}px`;
    const [totalItems, setTotalItems] = React.useState(branch.items?.size);
    const [opened, setOpened] = React.useState();

    const onClick = event => {
      event.stopPropagation();
      setOpened(!opened);
    };

    (0, _code11.useBinder)([branch], () => window.setTimeout(() => setTotalItems(branch.items.size), 150));
    const clsOpenIcon = `tree__icon-open${opened ? ' tree__icon--opened' : ''}`;
    return /*#__PURE__*/React.createElement("li", {
      className: "item",
      tabIndex: "-1"
    }, /*#__PURE__*/React.createElement(DSItemHeader, {
      item: branch,
      level: level,
      onClick: onClick
    }, /*#__PURE__*/React.createElement("div", {
      className: "item__label"
    }, /*#__PURE__*/React.createElement(_code8.DSIcon, {
      className: clsOpenIcon,
      icon: "arrowDropDown"
    }), /*#__PURE__*/React.createElement(_code8.DSIcon, {
      icon: `processor.${branch.label}`
    }), /*#__PURE__*/React.createElement("span", null, branch.label))), !!totalItems && /*#__PURE__*/React.createElement(BranchList, {
      opened: opened,
      level: level + 1,
      tree: branch
    }));
  }
  /**********************
  branch\types\source.jsx
  **********************/


  function DSSourceBranch({
    branch,
    level
  }) {
    const [branchName, setBranchName] = React.useState(branch.label);
    const [deleted, setDeleted] = React.useState(false);
    const {
      workspace: {
        openFile
      }
    } = (0, _code13.useDSWorkspaceContext)();
    if (!branchName) return null;
    const styles = {};
    if (level > 0) styles.paddingLeft = `${level * TREE_TABS}px`;
    (0, _code11.useBinder)([branch], () => setBranchName(branch.label));
    (0, _code11.useBinder)([branch], () => setDeleted(true));
    if (deleted) return null;
    /**
     * Opens a file
     * @param event
     */

    const onClick = event => {
      event.preventDefault();
      event.stopPropagation();
      openFile({
        type: 'source',
        applicationId: branch.application.id,
        moduleId: branch.module.id,
        source: branch.item,
        path: branch.link,
        processor: branch.extension
      });
    };

    return /*#__PURE__*/React.createElement("li", {
      className: "item",
      tabIndex: "-1"
    }, /*#__PURE__*/React.createElement(DSItemHeader, {
      item: branch,
      level: level,
      style: styles,
      onClick: onClick
    }, /*#__PURE__*/React.createElement("div", {
      className: "item__label"
    }, /*#__PURE__*/React.createElement(_code8.DSIcon, {
      icon: `file.${branch.icon}`
    }), /*#__PURE__*/React.createElement("span", null, branchName))));
  }
  /**********************
  branch\types\static.jsx
  **********************/


  function DSStaticBranch({
    branch,
    level
  }) {
    const [state, setState] = React.useState(branch.getters);
    const {
      panels,
      controller: {
        application
      }
    } = (0, _code13.useDSAsideContext)();
    const styles = {};
    if (level > 0) styles.paddingLeft = `${level * TREE_TABS}px`;
    (0, _code11.useBinder)([branch], () => setState(branch.getters));
    const {
      label,
      deleted
    } = state;
    if (!label || deleted) return null;
    /**
     * Opens a file
     * @param event
     */

    const onClick = event => {
      event.preventDefault();
      event.stopPropagation();
      const type = event.currentTarget.dataset.type;

      if (branch.icon === 'image') {
        panels.active.add('static', {
          label: type ? `${branch.label} overwrite` : branch.label,
          type,
          image: branch.source
        });
        return;
      }

      const url = `${application.application.url}${branch.item.pathname}${type ? `?${type}` : ''}`;
      window.open(url, '_blank'); // openFile(branch.item, branch.link, branch.extension);
    };

    const {
      item
    } = branch;
    const icon = item.overwrite ? 'imageOverwrite' : branch.icon;
    return /*#__PURE__*/React.createElement("li", {
      className: "item",
      tabIndex: "-1"
    }, item.overwrite && /*#__PURE__*/React.createElement("section", {
      className: "item__container item__overwrite",
      style: styles,
      "data-type": "overwrite",
      onClick: onClick
    }, /*#__PURE__*/React.createElement("div", {
      className: "item__label"
    }, /*#__PURE__*/React.createElement(_code8.DSIcon, {
      icon: `file.${icon}1`
    }), /*#__PURE__*/React.createElement("span", null, label, " "))), /*#__PURE__*/React.createElement(DSItemHeader, {
      item: branch,
      level: level,
      onClick: onClick
    }, /*#__PURE__*/React.createElement("div", {
      className: "item__label"
    }, /*#__PURE__*/React.createElement(_code8.DSIcon, {
      icon: `file.${branch.icon}`
    }), /*#__PURE__*/React.createElement("span", null, label))));
  }
  /*********
  header.jsx
  *********/


  function DSTreeHeader({
    title,
    tree,
    opened,
    setOpened
  }) {
    const onClick = event => {
      event.stopPropagation();
      event.preventDefault();
      setOpened(!opened);
      event.currentTarget.querySelector('.tree__icon-open').classList.toggle('tree__icon--opened');
    };

    const {
      object
    } = useDSTreeContext();
    const icon = tree.icon ? tree.icon : tree.type === 'bundle' ? `bundle.${object?.name}` : `tree.${tree.type}`;
    return /*#__PURE__*/React.createElement(DSItemHeader, {
      item: tree,
      onClick: onClick,
      className: "tree__title"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_code8.DSIcon, {
      className: "tree__icon-open",
      icon: "arrowDropDown"
    }), /*#__PURE__*/React.createElement(_code8.DSIcon, {
      className: "title__bundle-icon",
      icon: icon
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, title)));
  }
  /******************
  icons\tree-icon.jsx
  ******************/


  function TreeIcon({
    name,
    color
  }) {
    const cls = `icon__background icon-${name}`;
    return /*#__PURE__*/React.createElement("svg", {
      className: "ds-tree__icon",
      viewBox: "0 0 70 70"
    }, /*#__PURE__*/React.createElement("rect", {
      className: cls,
      rx: "6.2"
    }), /*#__PURE__*/React.createElement("text", {
      className: "icon__text",
      transform: "translate(8.27 40.68)"
    }, name));
  }
  /***********
  JS PROCESSOR
  ***********/

  /*********************
  FILE: branch\branch.js
  *********************/


  class Branch extends _js.ReactiveModel {
    _label;

    get label() {
      return this._label;
    }

    _id;

    get id() {
      return this._id;
    }

    _link;

    get link() {
      return this._link;
    }

    _source;

    get source() {
      return this._source;
    }

    _item;

    get item() {
      return this._item;
    }
    /**
     * TODO: Check if can be removed and added to each branch type as
     * a specific property
     */


    _specs;

    specs() {
      return this._specs;
    }

    _items = new Map();

    get items() {
      return this._items;
    }

    #application;

    get application() {
      return this.#application;
    }

    #favorites;

    get favorites() {
      return this.#favorites;
    }

    _bundle;

    get bundle() {
      return this._bundle;
    }

    _processor;

    get processor() {
      return this._processor;
    }

    #module;

    get module() {
      return this.#module;
    }

    _isFavorite = false;

    get isFavorite() {
      return this._isFavorite;
    }

    #am;

    get am() {
      return this.#am;
    }

    _favoritePathname;

    get favoritePathname() {
      return this._favoritePathname;
    }

    set isFavorite(value) {
      if (value === this._isFavorite) return;
      this._isFavorite = value;
      this.triggerEvent('favorite.changed');
      return this._isFavorite;
    }

    _pathname;

    get pathname() {
      return this._pathname;
    }

    #favoritesList = new Map();

    get favoritesList() {
      return this.#favoritesList;
    }

    constructor(item, application, specs = {}) {
      super();
      this._specs = specs;
      this.parameters = specs;
      this.#application = application;
      this._link = item.filename;
      this._label = item.label ?? item.filename;
      this._source = item;
      this._item = item;
      this.#am = specs.module;
      this._isFavorite = specs?.isFavorite ?? false;
      this._id = item.id;
      this._specs = this.specs;
      this.#favorites = _code12.FavoritesFactory.get(this.application.id, this.application);
      this._now = performance.now();
      if (item.items) this._items = item.items;
      this.#favoritesList = specs?.favoritesList;
      this.#module = specs.module;
      this._bundle = specs.bundle;
      this._processor = specs.processor;
    }

    addFavorite(item) {
      console.warn("the addFavorite method must be overwrite in the child class");
    }

    removeFavoriteItem = () => this.favoritesList.removeItem(this.pathname);
    registerFavorites = list => {
      /**
       * In the future, will be possible to have the same element in different favorites list.
       *
       */
    };
  }
  /************
  FILE: base.js
  ************/

  /**
   *  Base tree object.
   *
   *  Set the main important values for the tree and makes available the
   *  validate method who is in charge to manage the process to create
   *  the tree structure. To make it the items class needs to makes available his
   *  own processTree method checking by itself the branches and calling the addBranch
   *  method where necessary
   */


  class BaseTree extends _js.ReactiveModel {
    #items = new Map();

    get items() {
      return this.#items;
    }

    #elements = [];

    get elements() {
      return this.#elements;
    }

    #tree = new Map();

    get tree() {
      return this.#tree;
    }

    #object;

    get object() {
      return this.#object;
    }

    #type;

    get type() {
      return this.#type;
    }

    #application;

    get application() {
      return this.#application;
    }

    #bundle;

    get bundle() {
      return this.#bundle;
    }

    #processor;

    get processor() {
      return this.#processor;
    }

    #module;

    get module() {
      return this.#module;
    }

    #favorites;

    get favorites() {
      return this.#favorites;
    }
    /**
     *
     * @param type
     * @param application
     * @param object
     * @param elements
     * @param module
     * @param bundle
     */


    constructor(type, application, object, elements, module, bundle) {
      super();

      if (this.constructor === BaseTree) {
        throw new Error("Can't instantiate abstract class!");
      }
      /**
       * TODO: @julio try to make a better logic to minimize the number of parameters.
       */


      this.#module = type === 'module' ? object : module;
      this.#application = application;
      this.#elements = elements;
      this.#type = type;
      this.#object = object;
      this.#bundle = bundle;
      this.#favorites = _code12.FavoritesFactory.get(this.application.id, this.application);
      this.favorites.bind('loaded', this.checkFavorites.bind(this));
      this.validate();
    }
    /**
     * Query to Favorites Model to check if the item was marked as favorite
     */


    checkFavorites() {
      this.items.forEach(item => {
        item.isFavorite = this.favorites.isFavorite(item.pathname);
      });
      this.unbind('loaded', this.checkFavorites);
    }

    addBranch(map, key, item) {
      map.set(key, item);
    }

    processItem() {// this class may be implemented by items class.
    }

    get branchType() {
      return 'source';
    }

    validate() {
      const tree = new Map();
      this.#elements.forEach(item => this.processItem(tree, item)); // this function is used to order the map elements sending the tree elements at the end.

      const sort = ([fkey, fvalue], [sKey, sValue]) => {
        if (sValue instanceof Map) return -1;
        return 1;
      };

      const orderRecursively = map => {
        map.forEach((value, key) => {
          if (value instanceof Map) {
            const mapOrdered = orderRecursively(new Map([...value.entries()].sort(sort)));
            map.set(key, mapOrdered);
          }
        });
        return new Map([...map.entries()].sort(sort));
      };

      this.#tree = orderRecursively(tree);
      this.#items = orderRecursively(tree);
    }

    __setType(type) {
      this.#type = type;
    }
    /**
     * Iterates recursively into the folders structure and returns the
     * subtree created.
     *
     * @param branch the main or parent branch
     * @param tree
     * @param folders
     * @returns {BaseTree}
     */


    subfolderProcess(branch, tree, folders) {
      const folder = folders.shift();
      const subtree = tree.has(folder) ? tree.get(folder) : branchFactory.get('subtree', branch, this.application, folder);

      if (!folders.length) {
        const type = this.type === 'static' ? 'static' : 'source';
        subtree.items.set(branch.filename, branchFactory.get(type, branch, this.application, {
          module: this.#module,
          moduleId: this.#module?.id
        }));
        return subtree;
      }

      const items = this.subfolderProcess(branch, subtree.items, folders);
      subtree.items.set(items.label, items); // tree.set(folder, process(subtree.items, folders, index + 1))

      return subtree;
    }

    update(items) {
      items.forEach(item => this.#elements.push(item));
      this.validate();
      this.triggerEvent();
    }

  }
  /************
  FILE: tree.js
  ************/

  /**
   * Default tree
   *
   * TODO: @julio check if it's necessary
   */


  class Tree extends BaseTree {
    _specs = {};

    get generalSpecs() {
      return this._specs;
    }

    get type() {
      return 'tree';
    }

    addBranch(map, key, item) {
      map.set(key, item);
    }
    /**
     * Check the item and creates it as a branch.
     * @param tree
     * @param item
     */


    processItem(tree, item) {
      if (["backend-bridge", "dependency"].includes(item.is)) return;

      const setBranch = (tree, item) => this.addBranch(tree, item.filename, branchFactory.create(item));

      if ([undefined, ""].includes(item?.relative?.dirname)) {
        setBranch(tree, item);
        return;
      }

      const dirname = item.relative.dirname.replace(/\\/g, '/');
      const folders = dirname.replace(name, '').split('/');
      let subtree = tree;
      const levels = folders.length;
      let path = '';
      folders.forEach((folder, index) => {
        //if the folder item does not exist into the tree, then is created.
        path += `${folder}/`;
        subtree.set(folder, {
          label: folder,
          path,
          item,
          // we add the same item in the folder branch
          specs: this.generalSpecs,
          items: new Map()
        });

        if (levels - 1 !== index) {
          //the subtree variable is overwritten to get the last tree level
          subtree = subtree.get(folder).items;
          return;
        }

        setBranch(subtree.get(folder).items, item);
      });
    }

  }

  const FilesTree = Tree;
  /**************
  FILE: static.js
  **************/

  _exports2.FilesTree = FilesTree;

  class StaticTree extends BaseTree {
    get icons() {
      return {
        page: 'ts',
        code: 'scss',
        default: 'folder'
      };
    }

    get inlineActions() {
      return [{
        icon: 'add',
        name: 'static',
        modal: true,
        className: 'md'
      }];
    }

    get actions() {}

    processItem(tree, branch) {
      if (["backend-bridge", "dependency"].includes(branch.is)) return; // if the item.relative.dirname is undefined then
      // the file is in the relative root folder and we set as a branch

      if ([undefined, ""].includes(branch?.relative?.dirname)) {
        this.addBranch(tree, branch.filename, branchFactory.get(this.type, branch, this.application));
        return;
      }

      const dirname = branch.relative.dirname.replace(/\\/g, '/');
      const folders = dirname.replace(name, '').split('/');
      const subtree = this.subfolderProcess(branch, tree, folders);
      this.addBranch(tree, subtree.label, subtree);
    }

  }
  /*****************
  FILE: favorites.js
  *****************/


  class FavoritesTree extends BaseTree {
    get icons() {
      return {
        page: 'ts',
        code: 'scss',
        default: 'folder'
      };
    }

    get icon() {
      return 'favorite';
    }

    _module;

    get module() {
      return this._module;
    }

    get inlineActions() {
      return [{
        icon: 'delete',
        name: 'delete',
        confirm: true
      }];
    }

    constructor() {
      super(...arguments);
      this.object.bind('change', this.onChange);
    }

    onChange = () => {
      this.triggerEvent();
    };
    /**
     * Process each Favorites item
     *
     * The Favorites list item can be any type of branch. To make it possible,
     * the Favorites Tree receives an array where each element is a FavoriteChildren object.
     * The FavoritesChildren object must define all the properties required to create a new tree
     * branch with the branchFavorty.
     * @param tree
     * @param branch
     */

    processItem(tree, branch) {
      const {
        bundle,
        module
      } = branch;
      const specs = {
        bundle,
        module
      };
      const element = branchFactory.get('favorites', branch, this.application, specs);
      this.addBranch(tree, branch.label, element);
    }

    addItem(branch) {
      const item = branchFactory.get('favorites', branch, this.application, {
        favoritesList: this.object,
        bundle: this.object,
        module: this._module
      });
      this.addBranch(this._tree, branch.label, item);
    }

    delete() {
      this.object.delete();
    }

  }
  /**************
  FILE: module.js
  **************/


  class ModuleTree extends BaseTree {
    get icons() {
      return {
        page: 'ts',
        code: 'scss',
        default: 'folder'
      };
    }

    get actions() {
      return [{
        name: 'addBundle',
        modal: true,
        icon: 'add',
        className: "ds-modal md md-modal"
      }];
    }

    get inlineActions() {
      return [{
        name: 'addBundle',
        modal: true,
        icon: 'add',
        className: "ds-modal md md-modal"
      }];
    }

    _module;

    get module() {
      return this._module;
    }

    constructor() {
      super(...arguments);
    }

    processItem(tree, branch) {
      const item = branchFactory.get('bundle', branch, this.application, {
        bundle: branch,
        module: this.object
      });
      this.addBranch(tree, branch.name, item);
    }

    rename() {
      console.warn("rename");
    }

  }
  /**************
  FILE: bundle.js
  **************/


  class BundleTree extends BaseTree {
    get icons() {
      return {
        page: 'ts',
        code: 'scss',
        default: 'folder'
      };
    }

    processItem(tree, branch) {
      const item = branchFactory.get('processor', branch, this.application, {
        bundle: this.object,
        module: this.module
      });
      this.addBranch(tree, branch.name, item);
    }

  }
  /*****************
  FILE: processor.js
  *****************/


  class ProcessorTree extends BaseTree {
    get icons() {
      return {
        page: 'ts',
        code: 'scss',
        default: 'folder'
      };
    }

    get inlineActions() {
      return [{
        icon: 'add',
        name: 'create',
        modal: true
      }];
    }

    processItem(tree, branch) {
      if (["backend-bridge", "dependency"].includes(branch.is)) return; // if the item.relative.dirname is undefined then
      // the file is in the relative root folder and we set as a branch

      if ([undefined, ""].includes(branch?.relative?.dirname)) {
        this.addBranch(tree, branch.filename, branchFactory.get('source', branch, this.application, {
          bundle: this.bundle,
          module: this.module,
          processor: this.object
        }));
        return;
      }

      const dirname = branch.relative.dirname.replace(/\\/g, '/');
      const folders = dirname.replace(name, '').split('/');
      const subtree = this.subfolderProcess(branch, tree, folders);
      this.addBranch(tree, subtree.label, subtree);
    }

  }
  /****************
  FILE: template.js
  ****************/


  class TemplateTree extends BaseTree {
    get icons() {
      return {
        page: 'ts',
        code: 'scss',
        default: 'folder'
      };
    }

    get inlineActions() {
      return [{
        name: 'create',
        icon: 'add',
        modal: true
      }];
    }

    get favoriteAction() {
      return false;
    }

    #item;

    get item() {
      return this.#item;
    }

    constructor(type, application, object, elements, module, bundle) {
      super(type, application, object, elements, module, bundle);
      this.#item = object;
    }

    processItem(tree, branch) {
      if ([undefined, ""].includes(branch?.relative?.dirname)) {
        const branchItem = branchFactory.get('templateSource', branch, this.application);
        this.addBranch(tree, branch.filename, branchItem);
        return;
      }

      const dirname = branch.relative.dirname.replace(/\\/g, '/');
      const folders = dirname.replace(name, '').split('/');
      const subtree = this.subfolderProcess(branch, tree, folders);
      this.addBranch(tree, subtree.label, subtree);
    }

    async create(name) {
      const extension = name.split(["."]).slice(-1)[0];
      if (extension !== this.item.processor) return {
        error: true,
        message: 'EXT_INVALID'
      };

      try {
        const response = await this.item.createFile({
          filename: name
        });

        if (!response.status) {
          return {
            error: true,
            message: response.message
          };
        }

        this.triggerEvent('branch.added');
        return {
          status: true
        };
      } catch (e) {
        console.error(e.message);
        return {
          error: true,
          message: e.message
        };
      }
    }

  }
  /*******************
  FILE: application.js
  *******************/


  class ApplicationTree extends BaseTree {
    processItem(tree, branch) {
      const item = branchFactory.get('module', branch, this.application);

      if (!branch.module) {
        console.warn("the am could not be processed on tree", branch);
        return;
      }

      this.addBranch(tree, branch.module.pathname, item);
    }

  }
  /*****************
  FILE: consumers.js
  *****************/


  class ConsumersTree extends BaseTree {
    get icons() {
      return {
        page: 'ts',
        code: 'scss',
        default: 'folder'
      };
    }

    get inlineActions() {
      return [{
        icon: 'add',
        action: this.create
      }];
    }

    processItem(tree, branch) {
      this.addBranch(tree, branch.id, branchFactory.get('consumer', branch, this.application, {}));
    }

    create() {}

  }
  /********************
  FILE: dependencies.js
  ********************/


  class DependenciesTree extends BaseTree {
    get icons() {
      return {
        page: 'ts',
        code: 'scss',
        default: 'folder'
      };
    }

    get inlineActions() {
      return [{
        icon: 'add',
        action: this.create
      }];
    }

    processItem(tree, branch) {
      this.addBranch(tree, branch.id, branchFactory.get('dependency', branch, this.application, {}));
    }

    create() {}

  }
  /********************
  FILE: tree-factory.js
  ********************/


  const TreeFactory = new class {
    get types() {
      return {
        application: ApplicationTree,
        bundle: BundleTree,
        favorites: FavoritesTree,
        module: ModuleTree,
        processor: ProcessorTree,
        static: StaticTree,
        template: TemplateTree,
        dependencies: DependenciesTree,
        consumers: ConsumersTree
      };
    }
    /**
     * @param {string} type Type of tree to create
     * @param {array }specs 0 application, 1object, 2, elements, 3 module
     */


    get(type, specs) {
      if (!this.types.hasOwnProperty(type)) {
        throw new Error(`The tree for ${type} is not defined`);
      }

      const tree = new this.types[type](type, ...specs);

      tree.__setType(type);

      return tree;
    }

  }();
  /******************************
  FILE: branch\source\template.js
  ******************************/

  _exports2.TreeFactory = TreeFactory;

  class TemplateSourceBranch extends Branch {
    _icons = new Map([['ts', 'ts'], ['tsx', 'tsx'], ['scss', 'scss'], ['txt', 'txt'], ['start', 'start'], ['default', 'txt']]);

    get actions() {
      return [{
        name: 'rename',
        icon: 'edit',
        modal: true
      }, {
        name: 'delete',
        icon: 'delete',
        confirm: true
      }];
    }

    get icons() {
      return this._icons;
    }

    get extension() {
      return this.label?.split(".")?.slice(-1)[0];
    }

    get icon() {
      if (!this.extension) return 'file';
      return this.icons.get(this.extension) ?? this.icons.get('default');
    }

    get type() {
      return 'source';
    }

    get module() {
      return this.item;
    }

    delete() {
      this.source.delete();
      this.triggerEvent('deleted');
    }

    rename(name) {
      if (name.split(".").slice(-1)[0] !== this.source.filename.split(".").slice(-1)[0]) {
        throw Error('ERR__EXTENSION');
      }

      const {
        dirname,
        filename
      } = this.source;
      this.source.rename({
        path: dirname,
        current: filename,
        newName: name
      }); //TODO: the name must be updated automatically by PLM.
      // is not working in this moment.

      this._label = name;
      this.triggerEvent();
      return true;
    }

    addFavorite(folder) {
      const {
        favorites
      } = this;
      this._isFavorite = true;
      const {
        id,
        dirname,
        filename,
        processor,
        relative,
        type
      } = this.item;
      favorites.add(folder, {
        pathname: `${this.item.id}${this.label}`,
        type: 'template',
        source: {
          id,
          dirname,
          filename,
          relative,
          type,
          processor
        }
      });
    }

  }
  /**************************
  FILE: branch\source\item.js
  **************************/


  class SourceBranch extends Branch {
    _icons = new Map([['ts', 'ts'], ['tsx', 'tsx'], ['scss', 'scss'], ['txt', 'txt'], ['start', 'start'], ['default', 'txt']]);

    get actions() {
      return [{
        name: 'rename',
        icon: 'edit',
        modal: true
      }, {
        name: 'delete',
        icon: 'delete',
        confirm: true
      }];
    }

    get module() {
      return this?.am;
    }

    get icons() {
      return this._icons;
    }

    get extension() {
      return this.label?.split(".")?.slice(-1)[0];
    }

    get icon() {
      if (!this.extension) return 'file';
      return this.icons.get(this.extension) ?? this.icons.get('default');
    }

    get type() {
      return 'source';
    }

    get pathname() {
      return `${this.item.id}/${this.label}`;
    }

    delete() {
      this.source.delete();
      this.triggerEvent('deleted');
    }

    rename(name) {
      if (name.split(".").slice(-1)[0] !== this.source.filename.split(".").slice(-1)[0]) {
        throw Error('ERR__EXTENSION');
      }

      const {
        dirname,
        filename
      } = this.source;
      this.source.rename({
        path: dirname,
        current: filename,
        newName: name
      }); //TODO: the name must be updated automatically by PLM. is not working in this moment.

      this._label = name;
      this.triggerEvent();
      return true;
    }

    addFavorite(folder) {
      const {
        favorites,
        processor,
        bundle,
        module
      } = this;

      if (!this.bundle || !this.processor) {
        console.warn(`the source does not have a processor or bundle`);
        return;
      }

      const {
        dirname
      } = this.item.relative;
      this._isFavorite = true;
      this._favoritePathname = `${this.item.id}/${this.label}`;
      favorites.add(folder, {
        source: {
          name: `${module.pathname}/${dirname ? `${dirname}/` : ''}`,
          id: this.item.id,
          dirname: this.item.dirname
        },
        folder: folder,
        bundle: {
          id: bundle.id,
          name: bundle.name
        },
        processor: {
          name: processor.name,
          id: processor.id
        },
        module: {
          id: module.id,
          name: module.name
        },
        pathname: `${this.item.id}/${this.label}`,
        type: 'source'
      });
    }

  }
  /*****************************
  FILE: branch\source\backend.js
  *****************************/


  class BackendSourceBranch extends Branch {
    _icons = new Map([['ts', 'ts'], ['tsx', 'tsx'], ['scss', 'scss'], ['txt', 'txt'], ['start', 'start'], ['default', 'txt']]);

    get actions() {
      return [{
        name: 'rename',
        icon: 'edit',
        modal: true
      }, {
        name: 'delete',
        icon: 'delete',
        confirm: true
      }];
    }

    get icons() {
      return this._icons;
    }

    get extension() {
      return this.label?.split(".")?.slice(-1)[0];
    }

    get icon() {
      if (!this.extension) return 'file';
      return this.icons.get(this.extension) ?? this.icons.get('default');
    }

    get type() {
      return 'source';
    }

    get pathname() {
      return `${this.item.id}/${this.label}`;
    }

    delete() {
      this.source.delete();
      this.triggerEvent('deleted');
    }

    rename(name) {
      if (name.split(".").slice(-1)[0] !== this.source.filename.split(".").slice(-1)[0]) {
        throw Error('ERR__EXTENSION');
      }

      const {
        dirname,
        filename
      } = this.source;
      this.source.rename({
        path: dirname,
        current: filename,
        newName: name
      }); //TODO: the name must be updated automatically by PLM.
      // is not working in this moment.

      this._label = name;
      this.triggerEvent();
      return true;
    }

    addFavorite(folder) {
      const {
        application: {
          favorites
        },
        processor,
        template,
        module
      } = this;
      const {
        dirname,
        file
      } = this.item.relative;
      this._isFavorite = true;
      this._favoritePathname = `${this.item.id}/${this.label}`;
      favorites.add(folder, {
        source: {
          name: `${module.pathname} /${dirname ? `${dirname}/` : ''}${file}`,
          id: this.item.id,
          dirname: this.item.dirname
        },
        folder: folder,
        processor: {
          name: processor.name,
          id: processor.id
        },
        pathname: `${this.item.id}${this.label}`,
        type: 'templateSource'
      });
    }

  }
  /*********************
  FILE: branch\static.js
  *********************/


  class StaticBranch extends Branch {
    get actions() {
      return [{
        name: 'delete',
        icon: 'delete',
        confirm: true
      }];
    }

    #deleted;

    get deleted() {
      return this.#deleted;
    }

    get extension() {
      return this.item.pathname.split(".").slice(-1)[0];
    }

    get icon() {
      const icon = this.icons.hasOwnProperty(this.extension) ? this.extension : 'image';
      return this.icons[icon];
    }

    get isImage() {}

    get getters() {
      return {
        deleted: this.deleted,
        label: this.label
      };
    }

    get icons() {
      return {
        map: 'map',
        image: 'image',
        css: 'css',
        js: 'js',
        ts: 'ts',
        less: 'less',
        scss: 'scss'
      };
    }

    get type() {
      return 'static';
    }

    _reader;

    get reader() {
      return this._reader;
    }

    async delete() {
      try {
        await this.item.delete();
        this.#deleted = true;
        this.triggerEvent();
      } catch (e) {
        console.error("error", e);
      }
    }

  }
  /************************
  FILE: branch\processor.js
  ************************/


  class ProcessorBranch extends Branch {
    _icons = new Map([['ts', 'ts'], ['scss', 'scss'], ['start', 'start'], ['default', 'default']]);

    get icons() {
      return this._icons;
    }

    get extensions() {
      return {
        ts: ['ts', 'tsx'],
        js: ['js'],
        jsx: ['jsx'],
        scss: ['scss'],
        less: ['less']
      };
    }

    get type() {
      return 'processor';
    }

    get icon() {
      return this.icons.get(this.processor.name);
    }

    get actions() {
      return [{
        name: 'create',
        icon: 'add',
        modal: true
      }];
    }

    get inlineActions() {
      return [{
        name: 'create',
        icon: 'add',
        modal: true
      }];
    }

    get processor() {
      return this._processor;
    }

    _item;

    get item() {
      return this._item;
    }

    get name() {
      return this._item?.name;
    }

    _bundle;

    get bundle() {
      return this._bundle;
    }

    _module;

    get module() {
      return this._module;
    }

    get pathname() {
      return `${this.module?.pathname}/${this.label}`;
    }

    constructor(item, application, specs = {}) {
      super(item, application);
      this._bundle = specs.bundle;
      this._item = item;
      this._label = item?.label ?? item.name;
      this._processor = item;
      this._module = specs.module;
      const tree = TreeFactory.get('processor', [this.application, item, item.sources?.items, specs.module, specs.bundle]);
      this._items = tree.items;
    }

    async create(name) {
      const extension = name.split(["."]).slice(-1)[0];

      if (!this.extensions[this.name]?.includes(extension)) {
        throw Error('EXT_INVALID');
      }

      try {
        await this.processor.createFile({
          filename: name
        });
        this.triggerEvent('branch.added');
        return true;
      } catch (e) {
        console.error(e.message);
        return true;
      }
    }

    addFavorite(folder) {
      const {
        favorites
      } = this;
      let {
        item,
        processor,
        module,
        bundle
      } = this;
      module = module.module ?? module;
      this.isFavorite = true;
      const label = `${module.pathname}/${this.label}`;
      favorites.add(folder, {
        label: label,
        favoriteFolder: folder,
        bundleName: bundle.name,
        processorName: processor.name,
        bundle: {
          id: bundle.id,
          name: bundle.name
        },
        processor: {
          name: processor.name,
          id: processor.id
        },
        module: {
          id: module.id,
          name: module.name
        },
        containerId: module.id,
        pathname: label,
        type: 'processor'
      });
    }

  }
  /**********************
  FILE: branch\subtree.js
  **********************/


  class Subtree extends Branch {
    get icon() {
      return 'folder';
    }

    get type() {
      return 'subtree';
    }

    get actions() {
      return [{
        name: 'create',
        icon: 'plus'
      }, {
        name: 'rename',
        icon: 'edit'
      }];
    }

    constructor(branch, application, folder) {
      super(branch, application);
      this._label = folder;
      this._id = `${branch.id}.subtree`;
    }

  }
  /************************
  FILE: branch\resources.js
  ************************/


  class ResourcesBranch extends _js.ReactiveModel {
    get actions() {
      return [];
    }

    get inlineActions() {
      return [];
    }

    get type() {
      return 'resources';
    }

    _reader;

    get reader() {
      return this._reader;
    }

    _icons = {
      default: 'file.dependency',
      react: 'file.tsx',
      'beyond/core/ts': 'file.beyond'
    };

    get icon() {
      if (['react', 'beyond/core/ts'].includes(this.label)) {
        return this._icons[this.label];
      }

      return this._icons.default;
    }

    _label;

    get label() {
      return this._label;
    }

    _item;

    get item() {
      return this._item;
    }

    get favoriteAction() {
      return false;
    }

    _items = new Map();

    get items() {
      return this._items;
    }

    _application;

    get application() {
      return this._application;
    }

    EXCLUDED = ['@beyond-js/kernel/core/ts'];

    constructor(item, application, specs) {
      super();
      this._specs = specs;
      this._application = application;
      this._item = item;
      this._resourceType = specs.type;
      this._label = specs.type === 'dependencies' ? 'Dependencies' : 'Consumers';
      const tree = TreeFactory.get(specs.type, [this.application, item, item.items]);
      this._items = tree.items;
    }

  }
  /***********************
  FILE: branch\consumer.js
  ***********************/


  class ConsumerBranch extends _js.ReactiveModel {
    get actions() {
      return [];
    }

    get inlineActions() {
      return [];
    }

    get type() {
      return 'consumer';
    }

    _reader;

    get reader() {
      return this._reader;
    }

    get icon() {
      return 'file.consumer';
    }

    _label;

    get label() {
      return this._label;
    }

    _item;

    get item() {
      return this._item;
    }

    _bundle;

    get bundle() {
      return this._bundle;
    }

    _ts;

    get ts() {
      return this._ts;
    }

    _compiler;

    get compiler() {
      return this._compiler;
    }

    get favoriteAction() {
      return false;
    }

    EXCLUDED = ['@beyond-js/kernel/core/ts'];
    _diagnostics;

    get diagnostics() {
      return this._diagnostics ?? {};
    }

    _fetching;

    get fetching() {
      return this._fetching;
    }

    get errors() {
      if (!this.diagnostics) return 0;
      const {
        general,
        dependencies,
        files,
        overwrites
      } = this.diagnostics;
      return (general?.length ?? 0) + (dependencies?.size ?? 0) + (files?.size ?? 0) + (overwrites?.size ?? 0);
    }

    _application;

    get application() {
      return this._application;
    }

    _moduleId;

    get moduleId() {
      if (this._moduleId) return this._moduleId;
      const r = this.bundle.id.split('//');
      r.splice(r.length - 1, 1);
      return this._moduleId = r.join('//');
    }

    _bundleLoaded;

    get bundleLoaded() {
      return this._bundleLoaded;
    }

    _bundleTree;

    get bundleTree() {
      return this._bundleTree;
    }

    constructor(item, application, specs) {
      super();
      this._specs = specs;
      this._application = application;
      this._item = item;
      this._bundle = item.bundle;
      this._ts = item.bundle.processors.get('ts');
      this._compiler = this.ts.compiler;
      this._diagnostics = this.ts.compiler?.diagnostics;
      this._label = item.bundle.pathname;
    }

    loadBundle() {
      const tree = {
        properties: {
          processors: {
            properties: {
              sources: true,
              overwrites: true,
              compiler: true
            }
          }
        }
      };
      const bundle = new _ts.Bundle({
        identifier: {
          id: this.bundle.id
        },
        tree: tree
      });
      this.setFetching(true);
      bundle.bind('change', _ => {
        if (!bundle.tree.landed) return;
        this._bundle = bundle;
        this._bundleLoaded = true;
        const tree = TreeFactory.get('bundle', [this.application, this.bundle, [...this.bundle.processors.values()], this.bundle]);
        this._bundleTree = tree;
        this.setFetching(false);
      });
      bundle.fetch();
    }

    setFetching(value) {
      this._fetching = value;
      this.triggerEvent();
    }

  }
  /*************************
  FILE: branch\dependency.js
  *************************/


  class DependencyBranch extends _js.ReactiveModel {
    get actions() {
      return [];
    }

    get inlineActions() {
      return [];
    }

    get type() {
      return 'dependency';
    }

    _reader;

    get reader() {
      return this._reader;
    }

    _icons = {
      default: 'file.dependency',
      react: 'file.tsx',
      'beyond/core/ts': 'file.beyond'
    };

    get icon() {
      if (['react', 'beyond/core/ts'].includes(this.label)) {
        return this._icons[this.label];
      }

      return this._icons.default;
    }

    _label;

    get label() {
      return this._label;
    }

    _item;

    get item() {
      return this._item;
    }

    get favoriteAction() {
      return false;
    }

    EXCLUDED = ['@beyond-js/kernel/core/ts'];

    constructor(item, application, specs) {
      super();
      this._specs = specs;
      this._application = application;
      this._item = item;
      this._label = this.getName();
    }

    getName() {
      let name = this.item.resource;
      name = name.replace('beyond_libraries/', '').replace('beyond_modules/', '');
      this._navigable = !this.item.external && !this.EXCLUDED.includes(this.item.resources);
      return name;
    }

  }
  /*********************
  FILE: branch\module.js
  *********************/


  class ModuleBranch extends Branch {
    get actions() {
      return [{
        name: 'addBundle',
        icon: 'add',
        modal: true
      }, {
        name: 'rename',
        icon: 'edit',
        modal: true
      }];
    }

    _inlineActions = [];

    get inlineActions() {
      return this._inlineActions;
    }

    get type() {
      return 'module';
    }

    _module;

    get module() {
      return this._module;
    }

    _model;

    get model() {
      return this._model;
    }

    #loaded;

    get loaded() {
      return this.#loaded;
    }

    _manager;

    get manager() {
      return this._manager;
    }

    get pathname() {
      return `${this.item?.id}/${this.label}`;
    }

    constructor(item, application) {
      super(item, application);
      this._module = item?.module ? item.module : item;
      this._manager = application.moduleManager;
      this._label = this._module.pathname;

      this._check();
    }

    _check() {//TODO: @julio check if it is necessary
    }

    addFavorite(folder) {
      /**
       * The module is the ApplicationModule object the module item
       * is exposed as a property of it.
       */
      const {
        application: {
          favorites
        },
        module
      } = this;
      this._isFavorite = true;
      favorites.add(folder, {
        folder: folder,
        label: module.pathname,
        module: {
          id: module.id,
          name: module.name
        },
        pathname: `${this.item.id}/${this.label}`,
        type: 'module'
      });
    }

    async expand() {
      if (this.loaded) return true;
      this.fetching = true;
      const module = await this.manager.load(this.item.id);
      this._model = module;
      this.#loaded = true;
      module.bundles.items.forEach(({
        bundle
      }) => {
        const tree = branchFactory.get('bundle', bundle, this.application, {
          module
        });
        this.items.set(bundle.name, tree);
      });
      this.fetching = false;
      return true;
    }

    open() {}

    registerInlineAction(action) {
      this.inlineActions.push(action);
    }

    rename() {}

    addBundle() {}

  }
  /***********************
  FILE: branch\favorite.js
  ***********************/


  class FavoritesBranch extends Branch {
    get actions() {
      return this.instance?.actions ?? [];
    }

    get inlineActions() {
      return this.instance?.inlineActions ?? [];
    }

    _instance;

    get instance() {
      return this._instance;
    }

    _bundle;

    get bundle() {
      return this._bundle;
    }

    get icons() {
      return this._icons;
    }

    _item;

    get item() {
      return this._item;
    }

    _module;

    get module() {
      return this._module;
    }

    get name() {
      return this._item?.name;
    }

    get type() {
      return this.instance?.type;
    }

    get favoriteProxy() {
      return true;
    }

    get label() {
      return this.item.label ?? this.instance.label;
    }

    get id() {
      return `${this.instance.id}.favorites`;
    }

    _overwritten = ['label', 'id'];

    constructor(item, application, specs) {
      super(item, application);
      this._item = item;
      this._label = item.name;
      this._instance = this.getInstance(item);
      return new Proxy(this, {
        get: function (obj, field) {
          if (obj._overwritten.includes(field)) return obj[field];
          if (field in obj.instance) return obj.instance[field];
          if (field in obj) return obj[field];
        },
        set: function (obj, field, value) {
          if (field in obj.instance) {
            obj.instance[field] = value;
            return true;
          }

          return false;
        }
      });
    }

    getInstance(branch) {
      const {
        type,
        name,
        item,
        bundle,
        module
      } = branch;
      const specs = {
        favoritesList: this.object,
        bundle,
        module,
        isFavorite: true
      };
      return branchFactory.get(type, item, this.application, specs);
    }

  }
  /*********************
  FILE: branch\bundle.js
  *********************/


  class BranchBundle extends Branch {
    get type() {
      return 'bundle';
    }

    get actions() {
      return [{
        name: 'create',
        icon: 'add',
        className: 'md modal-md '
      }, {
        name: 'rename',
        icon: 'edit'
      }];
    }

    get pathname() {
      return `${this.module.pathname}/${this.label}`;
    }

    _dependenciesTree;

    get dependenciesTree() {
      return this._dependenciesTree;
    }

    _consumersTree;

    get consumersTree() {
      return this._consumersTree;
    }

    constructor(item, application, specs = {}) {
      super(item, application, specs);
      this._bundle = item;
      this._item = item;
      this._module = specs.module;
      this._label = item.name;
      const tree = TreeFactory.get('bundle', [this.application, this.bundle, [...item.processors.values()], this.module]);
      this._items = tree.items;
    }

    addFavorite(folder) {
      let {
        item,
        module,
        bundle,
        favorites
      } = this;
      module = module.module ?? module;
      this._isFavorite = true; //todo: @julio remove ..Name Variables.

      favorites.add(folder, {
        favoriteFolder: folder,
        bundleName: bundle.name,
        label: `${module.pathname}/${this.label}`,
        bundle: {
          id: bundle.id,
          name: bundle.name
        },
        module: {
          id: module.id,
          name: module.name
        },
        containerId: module.id,
        pathname: `${module.pathname}/${this.label}`,
        path: item.path,
        type: 'bundle'
      });
    }

    addConsumers(consumers) {
      consumers.id = `${this.item.id}.consumers`;
      const branch = branchFactory.get('resources', consumers, this.application, {
        type: 'consumers'
      });
      this.items.set('consumers', branch);
      this.triggerEvent('change');
    }

    addDependencies(dependencies) {
      dependencies.id = `${this.item.id}.dependencies`;
      const branch = branchFactory.get('resources', dependencies, this.application, {
        type: 'dependencies'
      });
      this.items.set('dependencies', branch);
      this.triggerEvent('change');
    }

  }
  /*****************************
  FILE: branch\branch-factory.js
  *****************************/


  const branchFactory = new class {
    _elements = new Map();

    get elements() {
      return this._elements;
    }

    get types() {
      return {
        bundle: BranchBundle,
        module: ModuleBranch,
        source: SourceBranch,
        subtree: Subtree,
        processor: ProcessorBranch,
        favorites: FavoritesBranch,
        static: StaticBranch,
        templateSource: TemplateSourceBranch,
        backendSource: BackendSourceBranch,
        dependency: DependencyBranch,
        consumer: ConsumerBranch,
        resources: ResourcesBranch,
        default: Branch
      };
    }

    create(item) {
      return new Branch(item);
    }

    get = (type, item, application, specs = {}) => {
      type = this.types.hasOwnProperty(type) ? type : 'default';
      const id = type === 'favorites' ? `${item.id}.favorites` : item.id;
      const instance = this.elements.get(id);
      const isFavoriteInstance = !!(type === 'favorites' && instance?.favoriteProxy);
      if (isFavoriteInstance || instance?.type === type) return instance;
      const element = new this.types[type](item, application, specs);
      this.elements.set(element.id, element);
      return element;
    };
  }();
  /**********
  SCSS STYLES
  **********/

  _exports2.branchFactory = branchFactory;
  bundle.styles.processor = 'scss';
  bundle.styles.value = '@-webkit-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-moz-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-ms-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@-o-keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInRightBig{0%{opacity:0;-webkit-transform:translateX(2000px);-moz-transform:translateX(2000px);-ms-transform:translateX(2000px);-o-transform:translateX(2000px);transform:translateX(2000px)}100%{opacity:1;-webkit-transform:translateX(0);-moz-transform:translateX(0);-ms-transform:translateX(0);-o-transform:translateX(0);transform:translateX(0)}}.ds-tree__container .tree__icon-open{fill:#fff;height:18px;width:18px;padding:0;transform:rotate(270deg)}.ds-tree__container .tree__icon-open.tree__icon--opened{transform:rotate(0)}.ds-tree__container .ds-tree{width:100%;transition:all .3s ease-in}.ds-tree__container .ds-tree .ds-branches.ds-branches--hidden{display:none}.ds-tree__container .ds-tree ul{padding:0;margin:0;list-style:none;cursor:pointer}.ds-tree__container .ds-tree .tree__toggle-icon{fill:#fff}.ds-tree__container svg.beyond-icon{height:15px;width:15px}.ds-tree__container>.tree__title{display:grid;grid-template-columns:auto 1fr auto;align-items:center;justify-content:space-between;border-bottom:.5px solid #050910;cursor:pointer;gap:10px;padding:4px 8px;font-size:13px}.ds-tree__container>.tree__title .title__bundle-icon{fill:#FFA789}.ds-tree__container>.tree__title:hover{background:#0c1423}.ds-tree__container.is-hidden .ds-tree,.ds-tree__container.is-hidden>.ds-tree__container{display:none;transition:all .3s ease-in}.ds-tree__container .item__container .branch__actions .beyond-icon,.ds-tree__container .tree__title .branch__actions .beyond-icon{transition:all .2s ease-in-out;fill:#fff;stroke:#fff;opacity:.3}.ds-tree__container .item__container .branch__actions .beyond-icon:hover,.ds-tree__container .tree__title .branch__actions .beyond-icon:hover{opacity:1}.ds-tree .ds-tree__branches-list{position:relative}.ds-tree .ds-tree__branches-list.tree__list--hidden{display:none}.ds-tree .ds-tree__branches-list.ds-tree__branches-list.tree__list-level-0{background:#0f1b2e}.ds-tree .ds-tree__branches-list.ds-tree__branches-list.tree__list-level-1{background:#0d1627}.ds-tree .ds-tree__branches-list.ds-tree__branches-list.tree__list-level-2{background:#0a121f}.ds-tree .ds-tree__branches-list.ds-tree__branches-list.tree__list-level-3{background:#080d17}.ds-tree .ds-tree__branches-list.ds-tree__branches-list.tree__list-level-4{background:#050910}.ds-tree .ds-tree__branches-list.ds-tree__branches-list.tree__list-level-5{background:#030508}.beyond-element-modal.ds-modal.ds-tree__forms .close-icon{z-index:2}.beyond-element-modal.ds-modal.ds-tree__forms .ds-modal__content{padding:20px}.beyond-element-modal.ds-modal.ds-tree__forms .ds-modal__content input{margin-top:5px;border:1px solid #e4e5dc;padding:8px;width:100%;outline:0}.beyond-element-modal.ds-modal.ds-tree__forms .ds-modal__content input:focus{border-color:#cdcfbf}.beyond-element-modal.ds-modal.ds-tree__forms .ds-modal__content label{display:block!important}.beyond-element-modal.ds-modal.ds-tree__forms .ds-modal__content .end{justify-content:flex-end}.beyond-element-modal.ds-modal.ds-tree__forms .ds-modal__content .group-inputs .input-field{display:grid;position:relative;padding:10px 0 20px}.beyond-element-modal.ds-modal.ds-tree__forms .ds-modal__content .group-inputs .input-field span.error-message{position:absolute;bottom:0;color:var(--beyond-error-color)}.beyond-element-modal.ds-modal.ds-tree__forms .ds-modal__content .group-inputs .form-select label{font-size:15px}.beyond-element-modal.ds-modal.ds-tree__forms .ds-modal__content .group-inputs .form-select .form__select .form__select__options{z-index:10}.beyond-element-modal.ds-modal.ds-tree__forms .ds-modal__content .group-inputs .form-select .form__select .form__select__options div{color:var(--beyond-text-color)}.ds-tree__container.no-header .first-tree>li .item__container{border-bottom:.5px solid #050910}.ds-tree__container .empty-tree{padding:4px 8px;text-align:center}.ds-tree__container .ds-tree__branches-list .item.item--action-processing>.item__container:after,.ds-tree__container .ds-tree__branches-list .item.item--fetching>.item__container:after{left:-10px;top:-20px;height:200%;width:30%;border-width:10px;background-size:10px;content:" ";background-color:rgba(255,255,255,.2);transform:rotate(8deg)}.ds-tree__container .ds-tree__branches-list .item.item--action-processed>.item__container:after{left:0;right:0;width:200%;height:200%;background-size:10px;content:" ";background-color:rgba(255,255,255,.2);transform:rotate(1deg)}.ds-tree__container .ds-tree__branches-list .item .item__container{display:grid;width:100%;padding:4px 8px;grid-template-columns:1fr auto;transition:all .3s ease-in;position:relative;overflow:hidden}.ds-tree__container .ds-tree__branches-list .item .item__container:after{position:absolute;content:" ";width:0;transition:all .2s ease-in}.ds-tree__container .ds-tree__branches-list .item .item__container .item__label{display:flex;align-items:center;gap:3px;overflow:hidden}.ds-tree__container .ds-tree__branches-list .item .item__container .item__label span{text-overflow:ellipsis;overflow:hidden;width:70%;display:flex;white-space:nowrap}.ds-tree__container .ds-tree__branches-list .item .item__container .item__errors{color:#fff!important;padding:1px 3px;font-size:.8rem;display:flex;align-items:center;justify-content:center;position:relative;z-index:2}.ds-tree__container .ds-tree__branches-list .item .item__container .item__errors:after{content:" ";background:#d2281e;opacity:.3;position:absolute;top:0;left:0;bottom:0;right:0;z-index:1}.ds-tree__container .ds-tree__branches-list .item .item__container.has__errors *{color:#d2281e}.ds-tree__container .ds-tree__branches-list .item .item__container:hover{background:rgba(0,0,0,.2)}.ds-tree__container .ds-tree__branches-list .item .tree__actions .beyond-popover__target svg{fill:#fff}.ds-tree__branches-list .beyond-popover__content{box-shadow:0 1px 2px rgba(0,0,0,.07),0 2px 4px rgba(0,0,0,.07),0 4px 8px rgba(0,0,0,.07),0 8px 16px rgba(0,0,0,.07),0 16px 32px rgba(0,0,0,.07),0 32px 64px rgba(0,0,0,.07)}.ds-tree__branches-list .beyond-popover__content ul{padding:0}.ds-tree__branches-list .beyond-popover__content ul li{min-width:180px;padding:5px 8px;display:flex;gap:8px;align-items:center;transition:all .2s ease-in-out}.ds-tree__branches-list .beyond-popover__content ul li:hover{background:#ffa789}.ds-static-form .jd-gallery__drop-zone{cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:.2s all ease-in;margin:15px;width:calc(100% - 30px);height:100px;padding:30px;outline:2px dashed #E36152;outline-offset:10px}.ds-static-form .jd-gallery__drop-zone:hover{background:#f0f0f0;color:#050910}.ds-static-form .jd-gallery__drop-zone .beyond-icon{height:60px;width:60px;fill:#E4E5DC}.ds-static-form .jd-gallery__list{width:100%;margin-top:20px}.ds-static-form .jd-gallery__list ul{display:flex;flex-wrap:wrap;width:100%;list-style:none;padding:0;gap:8px}.ds-static-form .jd-gallery__list li{flex:20%;max-width:20%;padding:0;cursor:pointer;transition:all .2s ease-in}.ds-static-form .jd-gallery__list li:hover{opacity:.8;transition:all .2s ease-in}.ds-static-form .jd-gallery__list li .beyond-element-image{width:100%;aspect-ratio:16/9;height:100px;position:relative}.ds-static-form .jd-gallery__list li .beyond-element-image img{object-fit:cover;z-index:1;aspect-ratio:16/9;height:100%;width:100%}.ds-static-form .jd-gallery__list li .beyond-element-image figcaption{position:absolute;transition:all .2s ease-in;display:none}.ds-static-form .jd-gallery__list li .beyond-element-image:hover figcaption{transition:all .2s ease-in-out;background:rgba(227,97,82,.7);display:flex;position:absolute;top:0;left:0;right:0;bottom:0;align-items:center;z-index:99;justify-content:center}.ds-static-form .jd-gallery__list li .beyond-element-image:hover figcaption .beyond-icon-button svg{fill:#fff}.ds-static-form{-webkit-animation-name:fadeIn;-moz-animation-name:fadeIn;-ms-animation-name:fadeIn;-o-animation-name:fadeIn;animation-name:fadeIn;-webkit-animation-iteration-count:1;-moz-animation-iteration-count:1;-ms-animation-iteration-count:1;-o-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-duration:1s;-moz-animation-duration:1s;-ms-animation-duration:1s;-o-animation-duration:1s;animation-duration:1s;-webkit-animation-delay:0s;-moz-animation-delay:0s;-ms-animation-delay:0s;-o-animation-delay:0s;animation-delay:0s;-webkit-animation-timing-function:ease;-moz-animation-timing-function:ease;-ms-animation-timing-function:ease;-o-animation-timing-function:ease;animation-timing-function:ease;-webkit-animation-fill-mode:both;-moz-animation-fill-mode:both;-ms-animation-fill-mode:both;-o-animation-fill-mode:both;animation-fill-mode:both;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;-o-backface-visibility:hidden;backface-visibility:hidden}@-webkit-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-moz-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-ms-keyframes fadeIn{.ds-static-form 0%{opacity:0}.ds-static-form 100%{opacity:1}}@-o-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}.ds-static-form .beyond-element-input input{height:2.2rem}.ds-static-form .hidden-input{display:none}.ds-static-form .alert{-webkit-animation-name:fadeIn;-moz-animation-name:fadeIn;-ms-animation-name:fadeIn;-o-animation-name:fadeIn;animation-name:fadeIn;-webkit-animation-iteration-count:1;-moz-animation-iteration-count:1;-ms-animation-iteration-count:1;-o-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-duration:1s;-moz-animation-duration:1s;-ms-animation-duration:1s;-o-animation-duration:1s;animation-duration:1s;-webkit-animation-delay:0s;-moz-animation-delay:0s;-ms-animation-delay:0s;-o-animation-delay:0s;animation-delay:0s;-webkit-animation-timing-function:ease;-moz-animation-timing-function:ease;-ms-animation-timing-function:ease;-o-animation-timing-function:ease;animation-timing-function:ease;-webkit-animation-fill-mode:both;-moz-animation-fill-mode:both;-ms-animation-fill-mode:both;-o-animation-fill-mode:both;animation-fill-mode:both;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;-o-backface-visibility:hidden;backface-visibility:hidden}@-webkit-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-moz-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-ms-keyframes fadeIn{.ds-static-form .alert 0%{opacity:0}.ds-static-form .alert 100%{opacity:1}}@-o-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}.ds-static-form form{display:block}.ds-static-form .jd-uploader-form{display:flex;width:100%;align-items:center;flex-direction:column;justify-content:center}.ds-static-form .jd-uploader-form .alert{width:100%}.ds-static-form .modal-content .actions{margin:15px;border-top:1px solid #e4e5dc;padding-top:15px;display:flex}.ds-static-form .modal-content .actions .roundell{border-radius:.6rem;padding:.6rem}.ds-tree__container .ds-tree .item.item--subtree{fill:#fff}';
  bundle.styles.appendToDOM();
  const modules = new Map(); // Exports managed by beyond bundle objects

  __pkg.exports.managed = function (require, _exports) {}; // Module exports


  __pkg.exports.process = function (require) {};

  const hmr = new function () {
    this.on = (event, listener) => void 0;

    this.off = (event, listener) => void 0;
  }();
  _exports2.hmr = hmr;

  __pkg.initialise(modules);
});