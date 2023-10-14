import TextInput from '../../reuseables/inputFields/TextInput';

const InputContainer1 = (props: Record<string, any>) => {

  return (

    <>
      <TextInput
        {...props}
        name="title"
        label="Title"
        max={255}
        required={true}
        autofocus={true}
      />
      <TextInput
        {...props}
        name="description"
        type="textarea"
        label="Description"
        max={500}
      />
    </>
  );
};

export default InputContainer1;

export const inputValidate1 = function (inputName: string, inputValue: string) {
  if (inputName === "title") {
    if (inputValue.length > 255) {
      return "The title is too long";
    }
  } else if (inputName === "description") {
    if (inputValue.length > 0 && inputValue.length < 50 || inputValue.length > 500) {
      return "Description must be at least 50 characers!";
    }
  }
  return "";
};