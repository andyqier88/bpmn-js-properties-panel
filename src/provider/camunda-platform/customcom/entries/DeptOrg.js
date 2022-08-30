import Description from "./Description";
// const axios = require('axios');
// import axios from 'axios';
import { useEffect, useMemo, useState, useRef,useLayoutEffect } from "preact/hooks";

import classnames from "classnames";

import { isFunction } from "min-dash";
import { usePrevious, useShowEntryEvent, useShowErrorEvent } from "../hooks";
import Tree from "rc-tree";
import Dialog from "rc-dialog";
import Tabs, { TabPane } from "rc-tabs";
import Select, { Option } from "rc-select";

import { getDeptTree, getPostList, getRoleList } from '@/api/camunda/list';
// import { getDeptTree, getPostList, getRoleList} from './mock';

import { getLastPostId, getMidDepIdArray, removeRole } from "../../utils/StringTrans";
// import './assets/dialog.css';
const noop = () => {};

function TreeTiggle(props) {
  
  let [postVal, setPostVal] = useState({label: '',value:null}); // 选中岗位
  let [roleValue , setroleValue ] = useState([]); // 选中角色
  let [postOptions, setPostOptions] = useState([]); // 岗位列表
  let [roleOptions, setRoleOptions] = useState([]); // 角色列表
  let [orgTreeData, setOrgTreeData] = useState([]); // 部门
  let [orgTreeVal, setOrgTreeVal] = useState(getMidDepIdArray(props.value) || []); // 选中部门
  let [compactVal, setCompactVal] = useState([]); // 部门-岗位组合

  const postOptionsRef = useRef(postOptions);
  const valRef = useRef(postVal);
  const orgTreeDataRef = useRef(orgTreeData);
  const roleRef = useRef(roleValue);
  // const orgTreeValRef = useRef(orgTreeVal);
  
  const compactValRef = useRef(compactVal);
  // postOptionsRef.current = postOptions;
  // orgTreeDataRef.current = orgTreeData;
  // orgTreeValRef.current = orgTreeVal;
  // compactValRef.current = compactVal;
  // valRef.current = postVal;
  
  const handleChange = (target, options) => {
    setPostVal(options);
  };
  const handleChangeRole = (target, options) => {
    setroleValue(options);
  };
  
  useEffect(() => {
    let temp = [];
    // debugger
    orgTreeVal.length&&orgTreeVal.forEach((item) => {
      temp.push(`D${item}P${postVal.value}`);
    });
    // debugger
    // roleValue.length&&roleValue.forEach((item) => {
    //   debugger
    //   temp.push(`,R${item.value}`);
    // })
    orgTreeVal.length && setCompactVal(temp);
    // 
    console.log(orgTreeVal, compactVal, postVal);
  }, [compactVal[compactVal.length-1], orgTreeVal[orgTreeVal.length-1], postVal.value]);
  useEffect(() => {
    // 岗位列表
    console.log('岗位props.value',props.value)
    
    // debugger
    // axios.get('/cpit/system/postList')
    // 获取岗位
    getPostList()
    .then(function (res) {
      // 处理成功情况
      res?.forEach((element) => {
        postOptions.push({
          label: element.postName,
          value: element.postId,
        });
        if (props.value && getLastPostId(props.value?.split(",")[0]) == element.postId) {
          setPostVal({
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
    // 获取部门数据
    getDeptTree()
      .then(function (res) {
        // 处理成功情况
        setOrgTreeData(res);
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
      let rolePropsArr = []
    // 角色列表
    getRoleList()
    .then(function (res) {
      // 处理成功情况
      res?.forEach((element) => {
        roleOptions.push({
          label: element.roleName,
          value: element.roleId,
          // value: `R${element.roleId}`,
        });
        // console.log('element.roleId', element.roleId, props);
        setRoleOptions([...roleOptions]);
        console.log('角色props.value: ',props.value);
        let roleProps = props.value&&props.value.split(',')
        
        roleProps&&roleProps?.length && roleProps.forEach((item)=>{
          // debugger
          if(item.indexOf('R') == 0 && item == `R${element.roleId}`){
            rolePropsArr.push({
              label: element.roleName,
              value: element.roleId,
            })
          }
          setroleValue(rolePropsArr);
        })
        // setRoleOptions([...roleOptions]);
      });
      
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
    // valRef.current = postVal;
    roleRef.current = roleValue
  }, [postOptions, orgTreeData, orgTreeVal, compactVal, postVal]);
  // 部门选择

  function onSelectDeptList(selectedKeys, e) {
    setOrgTreeVal(selectedKeys.checked)
    console.log(selectedKeys, e, orgTreeVal);
  }
  // 确定
  function sureSubmit() {
    // if(roleValue.length || (!postVal.value|| !orgTreeVal.length)){
    //   alert('角色、部门或岗位不能为空')
    //   return 
    // }
    let roleTem = []
    roleValue.length && roleValue.forEach((item)=>{
      if(!postVal.value && !orgTreeVal.length){
        roleTem.push(`R${item.value}`)
      } else {
        roleTem.push(`,R${item.value}`)
        console.log(roleValue, roleTem,  compactVal.join() + roleTem.join());
      }
    })
    // return
    // 去空字符
    let sumVal = (compactVal.join() + roleTem.join()).split(',').filter(e => e).map(String)
    props.setValue(sumVal.join(","))
    console.log('compactVal.join() + roleTem.join():', sumVal.join(","));
    // debugger
    // props.setroleValue(roleValue[0].value)
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
      title={<div>部门-岗位、角色</div>}
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
      <Tabs defaultActiveKey="1">
        <TabPane tab="选择部门-岗位" key="1">
            <div className="flex">
            <div className="flex1">
              <span>选择部门</span>
              <Tree
                checkable={true}
                multiple={true}
                defaultExpandAll={true}
                checkStrictly
                // ,...getMidDepIdArray(props.value)
                checkedKeys={{ checked: Array.from(new Set([...orgTreeVal])) }}
                selectable={false}
                onCheck={onSelectDeptList}
                fieldNames={{key: 'id',title: 'label'}}
                treeData={orgTreeData}
              >
              </Tree>
            </div>

            <div className="flex1">
            <span>选择岗位</span>
              <Select
                ref={useShowEntryEvent(noop)}
                class="rc-select"
                dropdownStyle={{ zIndex: 9999999 }}
                value={postVal}
                disabled={false}
                onChange={handleChange}
                allowClear
                options={postOptions}
              >
                {postOptions.map((option, idx) => {
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
        </TabPane>
        <TabPane tab="选择角色" key="2">
          <Select
            onChange={ handleChangeRole }
            value={ roleValue }
            options={roleOptions}
            mode="tags"
            tags={true}
            allowClear
          >
            {
              roleOptions.map((option, idx) => {
                return (
                  <Option
                    key={ idx }
                    value={ option.value }>
                    { option.label }
                  </Option>
                );
              })
            }
          </Select>
        </TabPane>
      </Tabs>
      
    </Dialog>
  );
}
function tabCallback(key) {
  console.log(key);
  setTabValue(key)
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
        value={props.value ? '点击查看已选内容' : '请选择'}
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
    // setroleValue,
    // roleValue,
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
