import Description from "./Description";
// const axios = require('axios');
// import axios from 'axios';
import { useEffect, useMemo, useState, useRef,useLayoutEffect } from "preact/hooks";
import classnames from "classnames";

import { isFunction } from "min-dash";
import { usePrevious, useShowEntryEvent, useShowErrorEvent } from "../hooks";
import Tree from "rc-tree";
import Dialog from "rc-dialog";
import Select, { Option } from "rc-select";
import { getDeptTree, getPostList } from '@/api/camunda/list';

import { getLastPostId, getMidDepIdArray } from "../../utils/StringTrans";
const noop = () => {};


function TreeTiggle(props) {
  // console.log("props", props);
  let [val, setVal] = useState({label: '',value:null}); // 选中岗位
  let [postOptions, setPostOptions] = useState([]); // 岗位列表
  let [orgTreeData, setOrgTreeData] = useState([]); // 部门
  let [orgTreeVal, setOrgTreeVal] = useState(getMidDepIdArray(props.value) || []); // 选中部门
  let [compactVal, setCompactVal] = useState([]); // 部门-岗位组合

  const postOptionsRef = useRef(postOptions);
  const valRef = useRef(val);
  const orgTreeDataRef = useRef(orgTreeData);
  // const orgTreeValRef = useRef(orgTreeVal);
  const compactValRef = useRef(compactVal);
  // postOptionsRef.current = postOptions;
  // orgTreeDataRef.current = orgTreeData;
  // orgTreeValRef.current = orgTreeVal;
  // compactValRef.current = compactVal;
  // valRef.current = val;
  
  const handleChange = (target, options) => {
    console.log(target, options);
    setVal(options);
    // setCompactVal(`D${orgTreeVal}P${val.value}`);
    // val && setCompactVal(`D${orgTreeVal}P${val}`);
    // console.log(val)
  };
  useEffect(() => {
    let temp = [];
    // debugger
    // console.log(compactVal)
    
    orgTreeVal.length&&orgTreeVal.forEach((item) => {
      temp.push(`D${item}P${val.value}`);
    });
    orgTreeVal.length && setCompactVal(temp);
    // 
    console.log(orgTreeVal, compactVal,val);
  }, [compactVal[compactVal.length-1],orgTreeVal[orgTreeVal.length-1],val.value]);
  useEffect(() => {
    // 岗位列表
    console.log(props.value)
    console.log(getMidDepIdArray(props.value));
    // debugger
    // axios.get('/cpit/system/postList')
    
  
    getPostList()
    .then(function (res) {
      // 处理成功情况
      console.log(res);
      res?.forEach((element) => {
        postOptions.push({
          label: element.postName,
          value: element.postId,
        });
        if (getLastPostId(props.value?.split(",")[0]) == element.postId) {
          setVal({
            label: element.postName,
            value: element.postId,
          });
        }
      });
      setPostOptions([...postOptions]);
    })
    .catch(function (error) {
      // 处理错误情况
      console.log(error);
    })
    .then(function () {
      // 总是会执行
    });
    
    getDeptTree()
      .then(function (res) {
        // 处理成功情况
        console.log(res);
        setOrgTreeData(res);
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
      .then(function () {
        // 总是会执行
      });
    
  }, []);
  // 修复多次循环
  useEffect(() => {
    postOptionsRef.current = postOptions;
    orgTreeDataRef.current = orgTreeData;
    // orgTreeValRef.current = orgTreeVal;
    compactValRef.current = compactVal;
    valRef.current = val;
    
  }, [postOptions, orgTreeData, orgTreeVal, compactVal, val]);
  // 部门选择

  function onSelectDeptList(selectedKeys, e) {
    setOrgTreeVal(selectedKeys.checked)
    console.log(selectedKeys.checked, e);
  }
  // 确定
  function sureSubmit() {
    console.log(compactVal);
    if(!val.value|| !orgTreeVal.length){
      alert('kong')
      return 
    }
    // return
    props.setValue(compactVal.join())
    props.onClose()
  }
  return (
    //  onClose={ props.onClose() }
    <Dialog
      visible={props.visible}
      destroyOnClose={true}
      onClose={props.onClose}
      animation="slide-fade"
      maskAnimation="fade"
      style={{ width: 900 }}
      title={<div>部门-岗位</div>}
      footer={[
        <button
          type="button"
          className="btn btn-default"
          key="close"
          onClick={props.onClose}
        >
          关闭
        </button>,
        <button
          type="button"
          className="btn btn-primary"
          key="save"
          onClick={sureSubmit}
        >
          确定
        </button>
      ]}
    >
      <div className="flex">
        <div className="flex1">
          {/* {orgTreeVal}
          {'--'}*/}
          {/* {getMidDepIdArray(props.value)} */}
          <span>选择部门</span>
          <Tree
            checkable
            multiple={true}
            defaultExpandAll={true}
            checkStrictly
            checkedKeys={{ checked: Array.from(new Set([...orgTreeVal,...getMidDepIdArray(props.value)])), halfChecked: [props.value] }}
            
            selectable={false}
            // onSelect={onSelectDeptList}
            onCheck={onSelectDeptList}
            fieldNames={{key: 'id',title: 'label'}}
            treeData={orgTreeData}
          >
            {/* {loop()} */}
          </Tree>
        </div>

        <div className="flex1">
        <span>选择岗位</span>
          <Select
            ref={useShowEntryEvent(noop)}
            class="rc-select"
            dropdownStyle={{ zIndex: 9999999 }}
            value={val}
            disabled={false}
            onChange={handleChange}
            allowClear
            options={postOptions}
          >
            {postOptions.map((option, idx) => {
              // debugger
              return (
                <Option
                  key={idx}
                  value={`P${option.value}`}
                  disabled={option.disabled}
                >
                  {option.label}
                </Option>
              );
            })}
          </Select>
        </div>
      </div>
    </Dialog>
  );
}
function Textfield(props) {
  const {
    debounce,
    disabled = false,
    id,
    label,
    onInput,
    feel = false,
    value = "",
    show = noop,
  } = props;

  const ref = useShowEntryEvent(show);

  const handleInput = useMemo(() => {
    // debugger
    return debounce(({ target }) =>
      onInput(target.value.length ? target.value : undefined)
    );
  }, [onInput, debounce]);
  return (
    <div class="bio-properties-panel-textfield relative">
      <label for={prefixId(id)} class="bio-properties-panel-label">
        {label}
        {feel && <FeelIcon feel={feel} label={label} />}
      </label>
      <input
        readOnly
        ref={ref}
        id={prefixId(id)}
        type="text"
        name={id}
        spellCheck="false"
        autoComplete="off"
        disabled={disabled}
        class="bio-properties-panel-input"
        onInput={handleInput}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        // value={value || ""}
        value={'查看详情'}
      />
      {/* <button onClick={obj.isShow = true}>set</button> */}
    </div>
  );
}

/**
 * @param {Object} props
 * @param {Object} props.element
 * @param {String} props.id
 * @param {String} props.description
 * @param {Boolean} props.debounce
 * @param {Boolean} props.disabled
 * @param {String} props.label
 * @param {Function} props.getValue
 * @param {Function} props.setValue
 * @param {Function} props.validate
 */
export default function CusTextFieldEntry(props) {
  const {
    element,
    id,
    description,
    debounce,
    disabled,
    feel,
    label,
    getValue,
    setValue,
    validate,
    show = noop,
  } = props;

  const [cachedInvalidValue, setCachedInvalidValue] = useState(null);
  const [validationError, setValidationError] = useState(null);

  let [showState, setShowState] = useState(false);

  let value = getValue(element);

  const previousValue = usePrevious(value);

  useEffect(() => {
    if (isFunction(validate)) {
      const newValidationError = validate(value) || null;
      setValidationError(newValidationError);
    }
  }, [value]);

  useEffect(
    (data) => {
      console.log("showState变化了", data);
    },
    [showState]
  );

  const onInput = (newValue) => {
    let newValidationError = null;

    if (isFunction(validate)) {
      newValidationError = validate(newValue) || null;
    }

    if (newValidationError) {
      setCachedInvalidValue(newValue);
    } else {
      setValue(newValue);
    }

    setValidationError(newValidationError);
  };

  const onFocusU = () => {
    setShowState(true);
    console.log("onFocusU", showState);
  };
  const onBlurU = () => {
    // setShowState(false);
    console.log("onBlurU", showState);
  };
  const onClose = () => {
    setShowState(false);
    console.log("onClose", showState);
  };
  if (previousValue === value && validationError) {
    value = cachedInvalidValue;
  }

  const temporaryError = useShowErrorEvent(show);

  const error = temporaryError || validationError;

  return (
    <div
      class={classnames("bio-properties-panel-entry", error ? "has-error" : "")}
      data-entry-id={id}
    >
      <Textfield
        debounce={debounce}
        disabled={disabled}
        feel={feel}
        id={id}
        label={label}
        onInput={onInput}
        onFocus={onFocusU}
        onBlur={onBlurU}
        show={show}
        value={value}
      />
      {error && <div class="bio-properties-panel-error">{error}</div>}
      <Description forId={id} element={element} value={description} />
      {/* <Tree/> */}
      <div class="bg">
        {showState ? (
          <TreeTiggle value={value} setValue={setValue} visible={showState} onClose={onClose} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export function isEdited(node) {
  return node && !!node.value;
}

// helpers /////////////////

function prefixId(id) {
  return `bio-properties-panel-${id}`;
}
