import React, { useRef } from 'react'
import Form from 'react-bootstrap/Form';
import './textInput.scss'

interface TextInputProps {
  type?: string;
  max?: number;
  required?: boolean;
  name?: string;
  label?: string;
  placeholder?: string;
  handleTextChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  page?: number;
  formData?: Record<string, any>;
  error?: boolean;
}

type typeOfInputType = {
  type?: string;
  as?: string;
  rows?: number;
}

const TextInput: React.FC<TextInputProps> = (props) => {

  const inputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (props?.formData && props.name && inputRef.current) {
      const inputData = props.formData[props.name]; // Access value based on props.name
      if (inputData !== undefined) {
        inputRef.current.value = inputData.value;
      }
    }
  }, [])

  let extraProps: Record<string, any> = {}

  let inputType: typeOfInputType = { type: "text" }
  if (props.type === "textarea") {
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
          onChange={props?.handleTextChange}
          data-page={props.page ?? 0}
          ref={inputRef}
        >
        </Form.Control>
      </Form.Group >
      <div className="extra-input-fields">
        {props?.formData && props?.formData[props.name!]?.error && props.error && <span className="input-additional-text red">
          {props?.formData[props.name!]?.error}
        </span>}
        {props?.formData && props?.max && <span className="right-side input-additional-text">Karakterek: {props.formData[props.name!] ? props?.formData[props.name!].value.length : 0}/{props.max}</span>}
      </div>
    </>
  )
}

export default TextInput