import MemberInput from '../inputs/MemberInput.tsx';


const InputContainer3 = (props: Record<string, any>) => {
  return (
    <>
      <MemberInput {...props} />
    </>
  )
}
export default InputContainer3;

type memberType = { name: string, role: string[] }
type inputType = Record<string, memberType>

export const inputValidate3 = function (inputName: string, inputValue: inputType) {
  let errorMessage = ""
  if (inputName === "members") {
    let isUnfinished = false;
    Object.values(inputValue).forEach((member: memberType) => {
      if (member.name === "" || member.role.length === 0) {
        isUnfinished = true
      }
    })
    if (isUnfinished) {
      errorMessage = "Every member must have a role!"
    }
  }
  return errorMessage;
};