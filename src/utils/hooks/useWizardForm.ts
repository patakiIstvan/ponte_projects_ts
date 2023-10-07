import { useReducer, useState } from "react";

interface InputData {
  value?: any;
  page?: number;
  error?: string;
}

interface FormData {
  [key: string]: InputData;
}


interface Pages {
  validation?: (name: string, value: any) => string;
  inputs?: React.ReactElement;
  title?: string
}

export function useWizardForm(pages: Pages[]) {

  const [currentPage, setCurrentPage] = useState(0);
  const [hasErrors, setHasErrors] = useState(false);
  const currentInputs = pages[currentPage]

  const initialReducer = function (state: FormData, action: any) {

    let inputValue: any = "";
    if (!action?.aboutToDelete) {
      inputValue = action?.extraData?.value ? action?.extraData?.value : action.payload?.value
    } else {
      const name = action.payload.getAttribute("name") ?? null;
      if (name && state[name] && state[name].value) {
        if (typeof state[name].value === 'object' && state[name].value !== null && !Array.isArray(state[name].value)) {
          inputValue = state[name].value;
          let inputId = action.payload.getAttribute("data-inputid");
          if (inputId) {
            inputId = Number(inputId);
            inputValue[inputId] = "";
          }
        }

      }
    }
    switch (action.type) {
      case "ON_CHANGE":
        let updatedFormData: Record<string, any> = {
          ...state,
          [action.payload.name]: {
            value: inputValue,
            page: Number(action.payload?.getAttribute("data-page")) ?? 0,
            error: action.payload?.error ?? ""
          }
        };
        if (currentInputs.validation) {
          try {
            updatedFormData[action.payload.name].error = currentInputs.validation(action.payload?.name, action?.extraData?.value ? action?.extraData?.value : action.payload?.value)
          } catch (e) {
            console.log(e);
          }
        }
        return updatedFormData;
      case "ON_CLEAR":
        return action.payload;
      case "DELETE_INPUT_ITEM":
        if (action.payload.inputName && action.payload.index && action.payload.inputName in state) {
          const inputName: string = action.payload.inputName;
          const index: number = action.payload.index;
          const inputData: InputData | undefined = state[inputName];
          if (inputData && index in inputData.value) {
            delete inputData.value[index];
          }
        }
        return state;
      default:
        return state
    }
  }

  const [formData, setFormData] = useReducer(initialReducer, {})
  console.log(formData)

  function handleInputItemDelete(inputName: string, index: number) {
    setFormData({ type: "DELETE_INPUT_ITEM", payload: { inputName: inputName, index: index } })
  }

  function handleTextChange(e: any) {
    setFormData({ type: "ON_CHANGE", payload: e.target })
  }

  function handleLinkChange(e: any) {
    setFormData({ type: "ON_CHANGE", payload: e.target, extraData: { value: { ...formData[e.target.name]?.value, [e.target.getAttribute("data-inputid")]: e.target.value } } })
    if (e.target.value == "") {
      handleInputItemDelete(e.target.name, e.target.getAttribute("data-inputid"))
    }
  }

  function deleteItem(e: any) {
    setFormData({ type: "ON_CHANGE", payload: e.target, aboutToDelete: true })
    handleInputItemDelete(e.target.getAttribute("name"), e.target.getAttribute("data-inputid"))
  }

  function handleMemberChange(e: any) {
    setFormData({
      type: "ON_CHANGE",
      payload: e.target,
      extraData: {
        value: {
          ...formData[e.target.name]?.value,
          [e.target.getAttribute("data-inputid")]: { name: e.target.value, role: e.target.getAttribute("role") != "" ? [e.target.getAttribute("role")] : [] }
        }
      }
    })
    if (e.target.value == "") {
      handleInputItemDelete(e.target.name, e.target.getAttribute("data-inputid"))
    }
  }

  const clearFormData = function () {
    setFormData({ type: "ON_CLEAR", payload: {} })
  }

  const checkErros = function () {
    setHasErrors(false)
    let haserrors = false
    Object.values(formData).forEach((inputData: any) => {
      if (inputData.page == currentPage) {
        if (inputData?.error !== "") {
          setHasErrors(true);
          haserrors = true;
        }
      }
    })
    return haserrors;
  }

  const toNextPage = function () {
    !checkErros() && setCurrentPage(i => {
      if (i >= pages.length - 1) return i
      return i + 1
    })
  }

  const toPrevPage = function () {
    setCurrentPage(i => {
      if (i <= 0) return i
      return i - 1
    })
  }


  return {
    currentPage,
    setCurrentPage,
    toNextPage,
    toPrevPage,
    numberOfPages: pages.length,
    currentInputs,
    handleTextChange,
    handleLinkChange,
    formData,
    clearFormData,
    hasErrors,
    handleMemberChange,
    deleteItem
  }
}