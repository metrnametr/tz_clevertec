import React, { useState, useCallback } from 'react';
import { toPairs, map, reduce } from 'lodash';
import GridCol from 'arui-feather/grid-col';
import GridRow from 'arui-feather/grid-row';
import Input from 'arui-feather/input';
import Select from 'arui-feather/select';
import Heading from 'arui-feather/heading';
import Button from 'arui-feather/button';
import Form from 'arui-feather/form';
import { numberWithDot } from '../../tools';

import './style.scss';

const createFormField = ({ type, name, values }, fieldsValues, onChange) => {
  const fieldProp = {
    name,
    value: type === 'LIST' ? fieldsValues[name] || 'none' : fieldsValues[name],
    onChange: type === 'NUMERIC' ? (value) => onChange(numberWithDot(value)) : onChange,
    width: 'available',
  };
  switch (type) {
    case 'TEXT': return <Input {...fieldProp} />;
    case 'NUMERIC': return <Input {...fieldProp} />;
    case 'LIST': {
      const optionsValues = map(toPairs(values), ([value, text]) => ({ value, text }));
      return <Select mode="radio" view="filled" {...fieldProp} options={optionsValues} />;
    }
    default: return '';
  }
};

export default ({ formMeta: { image, title, fields }, setFormData }) => {
  const [formValues, setFormValues] = useState(reduce(
    fields, (formStateValues, { name }) => ({ ...formStateValues, [name]: name === 'list' ? 'none' : '' }), {},
  ));
  const onChangeFormField = useCallback((name, value) => {
    setFormValues({
      ...formValues,
      [name]: name === 'list' ? value[0] : value,
    });
  }, [formValues]);

  const onSubmit = useCallback(() => setFormData(formValues), [formValues]);
  return (
    <div className="form-container">
      <Heading size="m">{title}</Heading>
      <Form onSubmit={onSubmit}>
        {
                fields.map((it) => (
                  <GridRow key={it.name} align="middle">
                    <GridCol width={{ mobile: 12, desktop: 5, tablet: 5 }}>
                      {it.title}
                    </GridCol>
                    <GridCol width={{ mobile: 12, desktop: 5, tablet: 5 }}>
                      {
                        createFormField(it, formValues,
                          (value) => onChangeFormField(it.name, value))
                      }
                    </GridCol>
                  </GridRow>
                ))
            }
        <GridRow justify="right">
          <Button
            className="btn-submit-form"
          // onClick={() => console.log(formValues)}
            type="submit"
            view="extra"
          >
            Отправить данные
          </Button>
        </GridRow>
      </Form>
      <img alt="logo" src={image} style={{ width: '100%', marginTop: '50px' }} />
    </div>
  );
};
