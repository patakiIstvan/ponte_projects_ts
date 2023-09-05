import { useState } from "react";

export function useWizardForm(pages) {
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState({})

  console.log(formData);

  function toNextPage() {
    setCurrentPage(i => {
      if (i >= pages.length - 1) return i
      return i + 1
    })
  }

  function handleTextChange(e){
    setFormData({ ...formData, [e.target.name]:{value:e.target.value,page: e.target?.page ?? 0, error: e.target?.error ?? ""} })
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
    handleTextChange
  }
}