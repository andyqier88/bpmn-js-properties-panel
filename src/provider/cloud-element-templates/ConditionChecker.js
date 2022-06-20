import {
  applyConditions
} from './Condition';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

export class ConditionChecker extends CommandInterceptor {
  constructor(eventBus, elementTemplates, commandStack, changeElementTemplateHelper) {
    super(eventBus);

    this._eventBus = eventBus;
    this._elementTemplates = elementTemplates;
    this._commandStack = commandStack;
    this.helper = changeElementTemplateHelper;

    this.postExecuted([
      'element.updateProperties', 'element.updateModdleProperties'
    ], this._applyConditionsOnChange, true, this);
  }

  async _applyConditionsOnChange(context) {
    const {
      isUpdated,
      element
    } = context;

    // opt-out from changes trigger by condition checker
    if (isUpdated) {
      return;
    }

    const template = this._elementTemplates.get(element);

    if (!template) {
      return;
    }

    const reducedTemplate = applyConditions(element, template);

    this.helper.updateTemplateProperties(element, template, reducedTemplate, { isUpdated: true });
  }
}

ConditionChecker.$inject = [
  'eventBus',
  'elementTemplates',
  'commandStack',
  'changeElementTemplateHelper'
];
