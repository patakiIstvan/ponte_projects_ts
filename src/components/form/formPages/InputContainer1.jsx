import Form from 'react-bootstrap/Form';
import React from 'react'
import LinkInput from '../inputs/LinkInput';

const InputContainer1 = (props) => {
  return (
    <>
      <LinkInput formData={props.formData} handleLinkChange={props.handleLinkChange} />
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="text"
          placeholder="name@example.com"
          name="title"
          required
          autoFocus
          onChange={props.handleTextChange}
          page="0"
          error=""
        />
      </Form.Group>
      <Form.Group
        className="mb-3"
        controlId="exampleForm.ControlTextarea1"
      >
        <Form.Label>Example textarea</Form.Label>
        <Form.Control as="textarea" rows={3}
          name="description"
          page="0"
          error=""
          onChange={props.handleTextChange}
        />
      </Form.Group>

    </>
  )
}
export default InputContainer1;

export let inputValidate1 = function (inputName, inputValue) {
  if (inputName == "title") {
    if (inputValue.length > 255) {
      return "A cím túl hosszú"
    }
  } else if (inputName == "description") {
    if (inputValue.length > 0 && inputValue.length < 50 || inputValue.length > 500) {
      return "Ha van leírás, maximum 500 karakter hosszú lehet, és a minimum hossza 50"
    }
  }
  return "";
}