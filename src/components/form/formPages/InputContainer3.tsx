import MemberInput from '../inputs/MemberInput.tsx';


const InputContainer3 = (props: Record<string, any>) => {
  return (
    <>
      <MemberInput {...props} />
    </>
  )
}
export default InputContainer3;

export const inputValidate3 = function (inputName: string, inputValue: string) {
  let errorMsg: string = ""
  if (inputName == "members") {
    Object.values(inputValue).forEach((member: any) => {
      if (member.role.length == 0) {
        errorMsg = "Adj pozíciót minden résztvevőnek"
      }
    })
  }
  return errorMsg;
}