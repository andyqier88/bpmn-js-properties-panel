import classNames from 'classnames';

import {
  useShowEntryEvent,
  useShowErrorEvent
} from '../hooks';

import Description from './Description';
import Select, { Option } from 'rc-select';
// import './assets/select.css';
const noop = () => {};

/**
 * @typedef { { value: string, label: string, disabled: boolean } } Option
 */

/**
 * Provides basic select input.
 *
 * @param {object} props
 * @param {string} props.id
 * @param {string[]} props.path
 * @param {string} props.label
 * @param {Function} props.onChange
 * @param {Array<Option>} [props.options]
 * @param {string} props.value
 * @param {boolean} [props.disabled]
 */
function PSelect(props) {
  const {
    id,
    label,
    onChange,
    options = [],
    value,
    disabled,
    show = noop
  } = props;
console.log('props', props)
  const ref = useShowEntryEvent(show);
  const handleChange = ( target, options ) => {
    console.log(target, options);
    // debugger
    onChange(target);
  };
  return (
    <div class="bio-properties-panel-select">
      <label for={ prefixId(id) } class="bio-properties-panel-label">{ label }</label>
      <Select
        ref={ ref }
        id={ prefixId(id) }
        name={ id }
        class="rc-select bio-properties-panel-input "
        onChange={ handleChange }
        value={ value }
        disabled={ disabled }
        mode="tags"
        tags={true}
        allowClear
      >
        {
          options.map((option, idx) => {
            console.log('option', option, idx)
            return (
              <Option
                key={ idx }
                value={ `U${option.value}` }
                disabled={ option.disabled }>
                { option.label }
              </Option>
            );
          })
        }
      </Select>
    </div>
  );
}

/**
 * @param {object} props
 * @param {object} props.element
 * @param {string} props.id
 * @param {string} [props.description]
 * @param {string} props.label
 * @param {Function} props.getValue
 * @param {Function} props.setValue
 * @param {Function} props.getOptions
 * @param {boolean} [props.disabled]
 */
export default function MutiSelectEntry(props) {
  const {
    element,
    id,
    description,
    label,
    getValue,
    setValue,
    getOptions,
    disabled,
    show = noop
  } = props;

  let value = getValue(element);
  // debugger
  
  let editvalue = value&&Array.isArray(value) ? value :  value&&value.split(',')
  // let value = [{label: "tony", value: "R126"},{label: "admin", value: "R1"}];
  console.log('getValue',value, editvalue)
  // debugger
  const options = getOptions(element);
  // const options = [{label: "tony", value: "126"}];

  const error = useShowErrorEvent(show);

  return (
    <div
      class={ classNames(
        'bio-properties-panel-entry',
        error ? 'has-error' : '')
      }
      data-entry-id={ id }>
      <PSelect
        id={ id }
        label={ label }
        value={ editvalue }
        onChange={ setValue }
        options={ options }
        disabled={ disabled }
        show={ show } />
      { error && <div class="bio-properties-panel-error">{ error }</div> }
      <Description forId={ id } element={ element } value={ description } />
    </div>
  );
}

export function isEdited(node) {
  return node && !!node.value;
}

// helpers /////////////////

function prefixId(id) {
  return `bio-properties-panel-${ id }`;
}

