import {
  PaymentBaseFields,
  SEPA as SEPA_ORIGINAL,
  PaymentFormFieldConfig,
  PaymentFormGroup,
  CounterPartyFields,
} from '@backbase/initiate-payment-journey-ang';

type Config = PaymentFormFieldConfig | PaymentFormGroup;

function replaceConfig(
  fields: Config[],
  name: string,
  replacer: (config: Config) => Config
): Config[] {
  const idx = fields.findIndex((itm) => itm.name === name);
  if (idx < 0) {
    console.warn(`Couldn't find field config with name "${name}"`);
    return fields;
  }
  const item = fields[idx];
  const result = [...fields];
  result.splice(idx, 1, replacer(item));
  return result;
}

export const SEPA = {
  ...SEPA_ORIGINAL,
  fields: replaceConfig(
    SEPA_ORIGINAL.fields,
    PaymentBaseFields.counterparty,
    (counterParty) => ({
      ...counterParty,
      fields: replaceConfig(
        (counterParty as PaymentFormGroup).fields,
        CounterPartyFields.name,
        (beneficiarySelector) =>
          ({
            ...beneficiarySelector,
            options: {
              ...beneficiarySelector.options,
              tabs: ['accounts'],
              isSaveAsNewContactHidden: true,
            },
          } as PaymentFormFieldConfig)
      ),
    })
  ),
};
