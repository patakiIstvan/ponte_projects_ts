import { useState } from "react";

export function useWizardForm(pages) {
  const [currentPage, setCurrentPage] = useState(0);

  function toNextPage() {
    setCurrentPage(i => {
      if (i >= pages.length - 1) return i
      return i + 1
    })
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
    numberOfPages: pages.length
  }
}