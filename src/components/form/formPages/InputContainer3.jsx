import React from 'react'
import MemberInput from '../inputs/MemberInput';

const InputContainer3 = (props) => {
  return (
    <>
      <MemberInput {...props} />
    </>
  )
}
export default InputContainer3;

export const inputValidate3 = function (inputName, inputValue) {
  let errorMsg = ""
  if (inputName == "members") {
    Object.values(inputValue).forEach(member => {
      if (member.role.length == 0) {
        errorMsg = "Adj pozíciót minden résztvevőnek"
      }
    })
  }
  return errorMsg;
}