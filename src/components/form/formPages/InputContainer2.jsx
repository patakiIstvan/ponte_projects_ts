import React from 'react'
import LinkInput from '../inputs/LinkInput';

const InputContainer2 = (props) => {
  return (
    <>
      <LinkInput formData={props.formData} handleLinkChange={props.handleLinkChange} />
    </>
  )
}
export default InputContainer2;