import React from 'react'
import Form from 'react-bootstrap/Form';
import './textInput.scss'


const TextInput = (props) => {


  let extraProps = {}

  let inputType = { type: "text" }
  if (props.type == "textarea") {
    inputType = { "as": "textarea", "rows": 3 }
  }
  extraProps = { ...extraProps, ...inputType }

  if (props?.max) {
    extraProps["maxLength"] = props?.max;
  }
  if (props?.required) {
    extraProps["required"] = "required";
  }

  return (
    <>
      <Form.Group className="mb-3" controlId={props?.name ? props?.name : "name" + props?.label ? props?.label : "label"}>
        <Form.Label>{props?.label ? props?.label : "Title"}</Form.Label>
        <Form.Control
          {...extraProps}
          placeholder={props.placeholder}
          name={props.name ?? "textInput"}
          autoFocus
          onChange={props?.handleTextChange}
          page={props.page ?? 0}
        >
        </Form.Control>
      </Form.Group >
      <div className="extra-input-fields">
        {props?.data && props?.data[props.name]?.error && props.error && <span className="input-additional-text red">
          {props?.data[props.name].error}
        </span>}
        {props?.data && props?.max && <span className="right-side input-additional-text">Karakterek: {[props?.name] in props.data ? props?.data[props.name].value.length : 0}/{props.max}</span>}
      </div>
    </>
  )
}

export default TextInput