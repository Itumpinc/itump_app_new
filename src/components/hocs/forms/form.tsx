import React, {useEffect} from 'react';
import {deepCopy} from '@utils/helpers';
import {View} from 'native-base';

export const FormContext = React.createContext({});

export const updateSchema = (
  formState: any,
  type: 'data' | 'errors' | 'valid',
  key?: string,
  value?: any,
) => {
  const {schema} = formState;
  const formStateClone: any = deepCopy(formState);

  if (type === 'valid') {
    return {
      ...formState,
      schema,
      valid: value,
    };
  }

  if (key) {
    formStateClone[type][key] = value;
  } else {
    formStateClone[type] = {...formStateClone[type], ...value};
  }

  if (type === 'data') {
    const {error} = schema.validate(formStateClone.data, {abortEarly: false});
    if (!error) {
      formStateClone.valid = true;
    }
  }

  return {
    ...formState,
    ...{[type]: formStateClone[type]},
    schema,
    valid: formStateClone.valid,
  };
};

const isSchemaValid = (schema: any, formState: any, data: any) => {
  if (typeof schema.validate === 'function') {
    const {error} = schema.validate(data);
    const {errors} = deepCopy(formState);

    if (error) {
      console.log(error.details);
      for (let index = 0; index < error.details.length; index++) {
        const er = error.details[index];
        errors[er.path[0]] = er.message;
      }
      return {
        valid: Object.keys(errors).length === 0,
        errors,
      };
    }

    return {
      valid: !error || Object.keys(errors).length === 0,
      errors: error ? errors : {},
    };
  }
  return {
    valid: true,
    errors: {},
  };
};

export const withSchemaData = (schema: any, defaultValue?: any) => {
  const data: any = {};
  const required: any = [];

  if (schema._ids && schema._ids._byKey) {
    // eslint-disable-next-line
    for (const [key, value] of schema._ids._byKey.entries()) {
      data[key] =
        defaultValue && typeof defaultValue[key] !== 'undefined'
          ? defaultValue[key]
          : '';
      if (
        value.schema._flags &&
        value.schema._flags.presence &&
        value.schema._flags.presence === 'required'
      ) {
        required.push(key);
      }
    }
  }
  return {
    data,
    required,
    errors: {},
    valid: false,
    schema,
    actionOn: '',
  };
};

const Form = (props: {
  children?: any;
  formState?: any;
  formhandler?: any;
  doChange?: any;
  onSubmit?: any;
  id?: string;
  className?: string;
  style?: any;
  autoCheck?: boolean; // form having default data then use this it will check form and validate automatic
  autoSubmit?: boolean; // mainly use for one element e.g. select and radio button; So as user will choose/select option form submt will call;
}) => {
  const {
    children,
    formState,
    formhandler,
    doChange,
    onSubmit,
    className,
    style,
    autoSubmit,
    autoCheck,
    id,
  } = props;

  const {schema} = formState;

  const updateState = (obj: any) => {
    formhandler({
      ...formState,
      ...obj,
      ...{schema},
    });
  };

  const autoCheckFn = () => {
    const {valid} = isSchemaValid(schema, formState, formState.data);
    if (valid) {
      updateState({
        ...deepCopy(formState),
        valid,
      });
    }
    return true;
  };

  const doSubmit = async (event?: any) => {
    if (event) event.preventDefault();
    const {valid, errors} = isSchemaValid(schema, formState, formState.data);
    if (!valid) {
      updateState({
        ...deepCopy(formState),
        errors,
        valid,
      });
      return false;
    }
    onSubmit();
    return true;
  };

  useEffect(() => {
    if (autoSubmit && formState.valid) {
      doSubmit();
    }
  }, [formState.data, formState.valid]);

  useEffect(() => {
    if (autoCheck) {
      autoCheckFn();
    }
  }, [formState.valid]);

  // useEffect(() => {
  //   const { valid, errors } = isSchemaValid();
  //   if (valid) {
  //     updateState({
  //       ...formState,
  //       errors,
  //       valid,
  //     });
  //   }
  // }, [formState.data]);

  const validateProperty = ({name, value}: {name: string; value: string}) => {
    let returnErr;
    // const skipValidations: any = {
    //   email: true,
    //   id_number: true,
    // };
    const {error} = schema.validate({[name]: value}, {abortEarly: false});
    const errors = {...formState.errors};
    if (error) {
      // console.log(error);
      const validationError = error.details.find(
        (err: any) => err.path[0] === name,
      );
      if (validationError) {
        errors[name] = validationError.message;
        returnErr = errors;
      } else {
        delete errors[name];
        returnErr = errors;
      }
    } else {
      returnErr = {};
    }

    return returnErr;
  };

  const handleChange = ({name, value}: any) => {
    const {data} = deepCopy(formState);
    data[name] = value;

    const errors = validateProperty({name, value: data[name]});
    const {valid} = isSchemaValid(schema, formState, data);
    if (errors) {
      updateState({
        actionOn: name,
        data,
        errors,
        valid,
      });
    } else {
      updateState({
        actionOn: name,
        data,
        valid,
      });
    }

    if (typeof doChange === 'function') {
      doChange(name, value);
    }
  };

  const blurInput = (event: any) => {
    if (event && event.currentTarget && !event.currentTarget.value) {
      if (event.currentTarget.closest('.input-field') !== null)
        event.currentTarget.closest('.input-field').classList.remove('dirty');

      if (event.currentTarget.closest('label'))
        event.currentTarget.closest('label').classList.remove('dirty');
    }
  };

  const focusInput = (event: any) => {
    if (event && event.currentTarget) {
      if (event.currentTarget.closest('.input-field') !== null)
        event.currentTarget.closest('.input-field').classList.add('dirty');

      if (event.currentTarget.closest('label'))
        event.currentTarget.closest('label').classList.add('dirty');
    }
  };

  const contextValue = {
    schema: formState.schema,
    data: formState.data,
    errors: formState.errors,
    required: formState.required,
    onChange: handleChange,
    onBlur: blurInput,
    onFocus: focusInput,
    doSubmit: doSubmit,
  };

  useEffect(() => {
    let allErrors = {};
    // eslint-disable-next-line
    for (const obj in formState.data) {
      if (formState.data[obj]) {
        const errors = validateProperty({
          name: obj,
          value: formState.data[obj],
        });
        if (errors) {
          allErrors = {...allErrors, ...errors};
        }
      }
    }

    const {valid} = isSchemaValid(schema, formState, formState.data);
    if (Object.keys(allErrors).length > 0) {
      updateState({
        data: formState.data,
        errors: allErrors,
        valid,
      });
    } else {
      updateState({
        data: formState.data,
        valid,
      });
    }
  }, []);

  return (
    <FormContext.Provider value={{...contextValue}}>
      {children}
    </FormContext.Provider>
  );
};

export default Form;
