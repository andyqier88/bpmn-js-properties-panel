import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {TextFieldEntry, isTextFieldEntryEdited, SelectEntry, isSelectEntryEdited } from '@bpmn-io/properties-panel';
import MutiSelectEntry from './../customcom/entries/mutiselect';
import CusTextFieldEntry from '../customcom/entries/DeptOrg';

import {
  useService
} from '../../../hooks';
import { getUserList } from '@/api/camunda/list';
// import { getUserList } from './../customcom/entries/mock';

import { useEffect, useState, useRef } from "preact/hooks";

/**
 * Cf. https://docs.camunda.org/manual/latest/reference/bpmn20/tasks/user-task/
 */
export function UserAssignmentProps(props) {
  const {
    element
  } = props;

  if (!is(element, 'camunda:Assignable')) {
    return [];
  }

  return [
    {
      id: 'assignee',
      component: Assignee,
      isEdited: isSelectEntryEdited
    },
    {
      id: 'candidateGroups',
      component: CandidateGroups,
      isEdited: isTextFieldEntryEdited
    },
    {
      id: 'candidateUsers',
      component: CandidateUsers,
      isEdited: isTextFieldEntryEdited
    },
    {
      id: 'dueDate',
      component: DueDate,
      isEdited: isTextFieldEntryEdited
    },
    {
      id: 'followUpDate',
      component: FollowUpDate,
      isEdited: isTextFieldEntryEdited
    },
    {
      id: 'priority',
      component: Priority,
      isEdited: isTextFieldEntryEdited
    }
  ];
}
export const EMPTY_OPTION = '';


function Assignee(props) {
  let [userOptions, setUserOptions] = useState([]); // 用户列表
  const userOptionsRef = useRef(userOptions);
  userOptionsRef.current = userOptions;
  const getOptions = () => {

    useEffect(() => {
    // 用户列表
    
    // axios.get('/cpit/system/userList')
    getUserList()
      .then(function (res) {
        // 处理成功情况
        console.log(res);
        res?.forEach((element) => {
          userOptions.push({
            label: element.nickName,
            value: `U${element.userId}`,
          });
        });
        userOptions.unshift({
          label: '请选择',
          value: '',
        })
        setUserOptions([...userOptions]);
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
      .then(function () {
        // 总是会执行
      });
  }, []);
  return userOptions
  };
  
  // 修复多次循环
  useEffect(() => {
    userOptionsRef.current = userOptions;
  });
  const { element } = props;
  const commandStack = useService('commandStack');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const businessObject = getBusinessObject(element);

  const getValue = () => {
    return businessObject.get('camunda:assignee');
  };

  const setValue = (value) => {
    commandStack.execute('element.updateModdleProperties', {
      element,
      moddleElement: businessObject,
      properties: {
        'camunda:assignee': value
      }
    });
  };

  // console.log(businessObject, getValue());
  return SelectEntry({
    element,
    id: 'assignee',
    label: translate('Assignee'),
    getValue,
    setValue,
    debounce,
    getOptions
  });
}

function CandidateUsers(props) {
  let [mutiUserOptions, setMutiUserOptions] = useState([]); // 多用户列表
  const roleOptionsRef = useRef(mutiUserOptions);
  roleOptionsRef.current = mutiUserOptions;
  const getOptions = () => {

    useEffect(() => {
    // 角色列表
    
    // axios.get('/cpit/system/roleList')
    
    getUserList()
      .then(function (res) {
        // 处理成功情况
        console.log(res);
        res?.forEach((element) => {
          mutiUserOptions.push({
            label: element.nickName,
            value: element.userId,
          });
        });
        mutiUserOptions.unshift({
          label: '请选择',
          value: '',
        })
        setMutiUserOptions([...mutiUserOptions]);
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
      .then(function () {
        // 总是会执行
      });
  }, []);
  return mutiUserOptions
  };
  
  // 修复多次循环
  useEffect(() => {
    roleOptionsRef.current = mutiUserOptions;
  });
  const { element } = props;
  const commandStack = useService('commandStack');
  const translate = useService('translate');

  // const debounce = useService('debounceInput');

  const businessObject = getBusinessObject(element);

  const getValue = () => {
    return businessObject.get('camunda:candidateUsers');
  };
  console.log('getValue',getValue())
  const setValue = (value) => {
    console.log('setvalue', value)
    commandStack.execute('element.updateModdleProperties', {
      element,
      moddleElement: businessObject,
      properties: {
        'camunda:candidateUsers': value
      }
    });
  };

  return MutiSelectEntry({
    element,
    id: 'candidateUsers',
    label: translate('Candidate users'),
    getValue,
    setValue,
    getOptions,
  });
}

function CandidateGroups(props) {
  const { element } = props;

  const commandStack = useService('commandStack');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const businessObject = getBusinessObject(element);

  const getValue = () => {
    return businessObject.get('camunda:candidateGroups');
  };

  const setValue = (value) => {
    commandStack.execute('element.updateModdleProperties', {
      element,
      moddleElement: businessObject,
      properties: {
        'camunda:candidateGroups': value
      }
    });
  };

  return CusTextFieldEntry({
    element,
    id: 'candidateGroups',
    label: translate('Candidate groups'),
    getValue,
    setValue,
    debounce,
    // onFocus
  });
}

function DueDate(props) {
  const { element } = props;

  const commandStack = useService('commandStack');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const businessObject = getBusinessObject(element);

  const getValue = () => {
    return businessObject.get('camunda:dueDate');
  };

  const setValue = (value) => {
    commandStack.execute('element.updateModdleProperties', {
      element,
      moddleElement: businessObject,
      properties: {
        'camunda:dueDate': value
      }
    });
  };

  return TextFieldEntry({
    element,
    id: 'dueDate',
    label: translate('Due date'),
    description : translate('The due date as an EL expression (e.g. ${someDate}) or an ISO date (e.g. 2015-06-26T09:54:00).'),
    getValue,
    setValue,
    debounce
  });
}

function FollowUpDate(props) {
  const { element } = props;

  const commandStack = useService('commandStack');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const businessObject = getBusinessObject(element);

  const getValue = () => {
    return businessObject.get('camunda:followUpDate');
  };

  const setValue = (value) => {
    commandStack.execute('element.updateModdleProperties', {
      element,
      moddleElement: businessObject,
      properties: {
        'camunda:followUpDate': value
      }
    });
  };

  return TextFieldEntry({
    element,
    id: 'followUpDate',
    label: translate('Follow up date'),
    description : translate('The follow up date as an EL expression (e.g. ${someDate}) or an ' +
      'ISO date (e.g. 2015-06-26T09:54:00).'),
    getValue,
    setValue,
    debounce
  });
}

function Priority(props) {
  const { element } = props;

  const commandStack = useService('commandStack');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const businessObject = getBusinessObject(element);

  const getValue = () => {
    return businessObject.get('camunda:priority');
  };

  const setValue = (value) => {
    commandStack.execute('element.updateModdleProperties', {
      element,
      moddleElement: businessObject,
      properties: {
        'camunda:priority': value
      }
    });
  };

  return TextFieldEntry({
    element,
    id: 'priority',
    label: translate('Priority'),
    getValue,
    setValue,
    debounce
  });
}
