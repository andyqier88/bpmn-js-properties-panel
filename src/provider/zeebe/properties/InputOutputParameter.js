import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

import { TextFieldEntry,
  FeelEntry, isFeelEntryEdited } from '@bpmn-io/properties-panel';

import {
  useService
} from '../../../hooks';


export default function InputOutputParameter(props) {

  const {
    idPrefix,
    parameter
  } = props;

  const entries = [ {
    id: idPrefix + '-target',
    component: TargetProperty,
    isEdited: isFeelEntryEdited,
    idPrefix,
    parameter
  },{
    id: idPrefix + '-source',
    component: SourceProperty,
    isEdited: isFeelEntryEdited,
    idPrefix,
    parameter
  } ];

  return entries;
}

function TargetProperty(props) {
  const {
    idPrefix,
    element,
    parameter
  } = props;

  const commandStack = useService('commandStack');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const setValue = (value) => {
    commandStack.execute('element.updateModdleProperties', {
      element,
      moddleElement: parameter,
      properties: {
        target: value
      }
    });
  };

  const getValue = (parameter) => {
    return parameter.target;
  };

  return TextFieldEntry({
    element: parameter,
    id: idPrefix + '-target',
    label: translate((is(parameter, 'zeebe:Input') ? 'Local variable name' : 'Process variable name')),
    getValue,
    setValue,
    debounce
  });
}

function SourceProperty(props) {
  const {
    idPrefix,
    element,
    parameter
  } = props;

  const commandStack = useService('commandStack');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const setValue = (value) => {
    commandStack.execute('element.updateModdleProperties', {
      element,
      moddleElement: parameter,
      properties: {
        source: value
      }
    });
  };

  const getValue = (parameter) => {
    return parameter.source;
  };

  return FeelEntry({
    bpmnElement: element,
    element: parameter,
    id: idPrefix + '-source',
    label: translate('Variable assignment value'),
    feel: 'required',
    getValue,
    setValue,
    debounce
  });
}