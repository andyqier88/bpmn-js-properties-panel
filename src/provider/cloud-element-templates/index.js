import translateModule from 'diagram-js/lib/i18n/translate';

import { ConditionChecker } from './ConditionChecker';
import ElementTemplates from './ElementTemplates';
import ElementTemplatesLoader from './ElementTemplatesLoader';
import ReplaceBehavior from './ReplaceBehavior';
import commandsModule from './cmd';
import templateElementFactoryModule from './create';
import ElementTemplatesPropertiesProvider from './ElementTemplatesPropertiesProvider';
import ChangeElementTemplateHelper from './ChangeElementTemplateHelper';

import zeebePropertiesProviderModule from '../zeebe';

export default {
  __depends__: [
    commandsModule,
    templateElementFactoryModule,
    translateModule,
    zeebePropertiesProviderModule
  ],
  __init__: [
    'elementTemplatesLoader',
    'replaceBehavior',
    'elementTemplatesPropertiesProvider',
    'conditionChecker',
    'changeElementTemplateHelper'
  ],
  elementTemplates: [ 'type', ElementTemplates ],
  elementTemplatesLoader: [ 'type', ElementTemplatesLoader ],
  replaceBehavior: [ 'type', ReplaceBehavior ],
  elementTemplatesPropertiesProvider: [ 'type', ElementTemplatesPropertiesProvider ],
  conditionChecker: [ 'type', ConditionChecker ],
  changeElementTemplateHelper: [ 'type', ChangeElementTemplateHelper ]
};
