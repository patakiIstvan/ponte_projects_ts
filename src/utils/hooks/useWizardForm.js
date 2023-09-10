import React, { useReducer, useState } from "react";

export function useWizardForm(pages) {

  const [currentPage, setCurrentPage] = useState(0);
  const [hasErrors, setHasErrors] = useState(false);
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
          try{
        updatedFormData[action.payload.name].error = currentInputs.validation(action.payload?.name,action.payload?.value)
          } catch(e){
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

  const [formData, setFormData] = useReducer( initialReducer,{})

  function handleTextChange(e){
    setFormData({type:"ON_CHANGE", payload: e.target})
  }

  function handleLinkChange(e){
    setFormData({type:"ON_CHANGE", payload: e.target, extraData: {value:{...formData[e.target.name]?.value,[e.target.getAttribute("inputid")]: e.target.value}}})
  }

  const clearFormData = function(){
    setFormData({type:"ON_CLEAR", payload:{} })
  }

  const checkErros = function(){
    setHasErrors(false)
    let haserrors = false
    Object.values(formData).forEach(inputData =>{
      if (inputData.page == currentPage){
        if (inputData?.error !== ""){ 
          setHasErrors(true);
          haserrors = true;}
      }
    })
    return haserrors;
  }

  const toNextPage = function() {
    !checkErros() && setCurrentPage(i => {
      if (i >= pages.length - 1) return i
      return i + 1
    })
  }

  const toPrevPage = function() {
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
    hasErrors
  }
}