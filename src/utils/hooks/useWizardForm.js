import React, { useReducer, useState } from "react";

export function useWizardForm(pages) {

  const [currentPage, setCurrentPage] = useState(0);
  const currentInputs = pages[currentPage]

  const initialReducer = function(state, action){
    switch(action.type){
      case "ON_CHANGE":
        let updatedFormData = {
          ...state,
          [action.payload.name]:{
          value: action?.extraData?.value ? action?.extraData?.value : action.payload?.value,
          page: action.payload?.page ?? 0,
           error: action.payload?.error ?? ""
          }
        };
        if ("validation" in currentInputs){
        const errorMessage = currentInputs.valiadtion(action.payload?.name,action.payload?.value)
        updatedFormData[action.payload.name].error = errorMessage
        }
        return updatedFormData;
      default:
        return state
    }
  }

  const [formData, setFormData] = useReducer( initialReducer,{})

  console.log(formData);

  function toNextPage() {
    setCurrentPage(i => {
      if (i >= pages.length - 1) return i
      return i + 1
    })
  }

  function handleTextChange(e){
    setFormData({type:"ON_CHANGE", payload: e.target})
  }

  // Could make an abstraction
  function getIcon(url){
      if( url.includes("facebook.com")){ return "facebook"}
      else if (url.includes("github.com")){ return "github"}
      else if (url.includes("google.com")){ return "google"}
    return "";
  }

  function handleLinkChange(e){
    setFormData({type:"ON_CHANGE", payload: e.target, extraData: {value:{...formData[e.target.name]?.value,[e.target.getAttribute("inputid")]: {icon: getIcon(e.target.value), url: e.target.value}}}})
  }

  function toPrevPage() {
    setCurrentPage(i => {
      if (i <= 0) return i
      return i - 1
    })
  }


  return {
    currentPage,
    toNextPage,
    toPrevPage,
    numberOfPages: pages.length,
    currentInputs,
    handleTextChange,
    handleLinkChange,
    formData
  }
}