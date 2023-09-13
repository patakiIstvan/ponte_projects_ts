import React from 'react';
import TextInput from '../../reuseables/inputFields/TextInput';

interface InputContainer1Props {
  formData?: Record<string, any> | null;
}

const InputContainer1: React.FC<InputContainer1Props> = ({ formData }) => {

  console.log(formData)
  return (

    <>
      <TextInput
        name="title"
        label="Cím"
        data={formData || {}}
        max={255}
        required={true}
      />
      <TextInput
        name="description"
        type="textarea"
        label="Leírás"
        data={formData || {}}
        max={500}
      />
    </>
  );
};

export default InputContainer1;

export const inputValidate1 = function (inputName: string, inputValue: string) {
  if (inputName === "title") {
    if (inputValue.length > 255) {
      return "A cím túl hosszú";
    }
  } else if (inputName === "description") {
    if (inputValue.length > 0 && inputValue.length < 50 || inputValue.length > 500) {
      return "Ha van leírás, legyen minimum 50 karakter";
    }
  }
  return "";
};