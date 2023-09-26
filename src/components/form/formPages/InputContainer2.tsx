import LinkInput from '../inputs/LinkInput.tsx';

const InputContainer2 = (props: Record<string, any>) => {
  return (
    <>
      <LinkInput {...props} />
    </>
  )
}
export default InputContainer2;

type memberType = { name: string, role: string[] }
type inputType = Record<string, memberType>

export const inputValidate2 = function (inputName: string, inputValue: inputType) {
  console.log(inputValue)
  let errorMessage = ""
  if (inputName === "members") {
    let isUnfinished = false;
    Object.values(inputValue).forEach((member: memberType) => {
      if (member.name === "" || member.role.length === 0) {
        isUnfinished = true
      }
    })
    if (isUnfinished) {
      errorMessage = "Minden személynek nevet és pozíciót kell adni."
    }
  }
  return errorMessage;
};