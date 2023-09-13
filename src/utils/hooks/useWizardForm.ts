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

interface WizardFormState {
  currentPage: number;
  hasErrors: boolean;
  currentInputs: {
    validation: (name: string, value: any) => string;
  };
  formData: FormData;
}

export function useWizardForm(pages: Pages[]) {

  const [currentPage, setCurrentPage] = useState(0);
  const [hasErrors, setHasErrors] = useState(false);
  const currentInputs = pages[currentPage]

  const initialReducer = function (state: WizardFormState, action: any) {
    switch (action.type) {
      case "ON_CHANGE":
        let updatedFormData: Record<string, any> = {
          ...state,
          [action.payload.name]: {
            value: action?.extraData?.value ? action?.extraData?.value : action.payload?.value,
            page: action.payload?.getAttribute("data-page") ?? 0,
            error: action.payload?.error ?? ""
          }
        };
        if (currentInputs.validation) {
          try {
            updatedFormData[action.payload.name].error = currentInputs.validation(action.payload?.name, action.payload?.value)
          } catch (e) {
            console.log(e)
          }
        }
        return updatedFormData;
      case "ON_CLEAR":
        return action.payload;
      default:
        return state
    }
  }

  const [formData, setFormData] = useReducer(initialReducer, {})

  function handleTextChange(e: any) {
    setFormData({ type: "ON_CHANGE", payload: e.target })
  }

  function handleLinkChange(e: any) {
    setFormData({ type: "ON_CHANGE", payload: e.target, extraData: { value: { ...formData[e.target.name]?.value, [e.target.getAttribute("inputid")]: e.target.value } } })
  }

  function handleMemberChange(e: any) {
    if (e.target.value != "") {
      setFormData({
        type: "ON_CHANGE",
        payload: e.target,
        extraData: {
          value: {
            ...formData[e.target.name]?.value,
            [e.target.getAttribute("inputid")]: { name: e.target.value, role: e.target.getAttribute("role") != "" ? [e.target.getAttribute("role")] : [] }
          }
        }
      })
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
    handleMemberChange
  }
}