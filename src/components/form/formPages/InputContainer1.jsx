import Form from 'react-bootstrap/Form';
import React from 'react'
import TextInput from '../../reuseables/inputFields/TextInput';


const InputContainer1 = (props) => {
  return (
    <>
      <TextInput
        {...props}
        name="title"
        label="Cím"
        page={0}
        data={props.formData}
        max={255}
        required = {true}
      />
      <TextInput
        {...props}
        name="description"
        type="textarea"
        label="Leírás"
        page={0}
        data={props.formData}
        max={500}
      />
    </>
  )
}
export default InputContainer1;

export const inputValidate1 = function (inputName, inputValue) {
  if (inputName == "title") {
    if (inputValue.length > 255) {
      return "A cím túl hosszú"
    }
  } else if (inputName == "description") {
    if (inputValue.length > 0 && inputValue.length < 50 || inputValue.length > 500) {
      return "A leírás legyen minimum 50 karakter"
    }
  }
  return "";
}