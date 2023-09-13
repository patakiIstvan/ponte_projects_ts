import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './formModal.scss'
import { useWizardForm } from '../../../utils/hooks/useWizardForm';

type FormModalProps = {
  pages: any[]; // You should replace 'any' with the appropriate type for your pages.
  onModalSubmit: (data: any) => void; // You should replace 'any' with the appropriate type for your data.
}

function FormModal(props: FormModalProps) {

  const [show, setShow] = useState(false);
  const Wizard = useWizardForm(props.pages)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderChildren = () => {
    return React.Children.map(Wizard.currentInputs.inputs, (child) => {
      return React.cloneElement(child, {
        handleTextChange: Wizard.handleTextChange,
        handleLinkChange: Wizard.handleLinkChange,
        formData: Wizard.formData,
        error: Wizard.hasErrors,
        handleMemberChange: Wizard.handleMemberChange,
        page: Wizard.currentPage
      });
    });
  };

  const getProjectData = function (data: Record<string, any>) {
    const simplifiedData: Record<string, any> = {};
    Object.entries(data).forEach(([inputName, inputValue]: [string, any]) => {
      if ("value" in inputValue) {
        if (typeof inputValue.value === "object") {
          const list: any[] = [];
          Object.values(inputValue.value).forEach(v => {
            list.push(v);
          })
          simplifiedData[inputName] = list;
        } else {
          simplifiedData[inputName] = inputValue.value;
        }
      }
    })
    return simplifiedData;
  }

  const onSubmit = function (e: React.FormEvent) {
    e.preventDefault();
    if (Wizard.currentPage < Wizard.numberOfPages - 1) {
      Wizard.toNextPage()
    } else {
      const data = getProjectData(Wizard.formData)
      props.onModalSubmit(data)
      Wizard.clearFormData();
      Wizard.setCurrentPage(0);
      handleClose();
    }
  }

  return (
    <>
      <Button className="fixed-button" variant="primary" onClick={handleShow}>
        Új projekt
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{Wizard.currentInputs?.title ? Wizard.currentInputs?.title : "Űrlap"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            {renderChildren()}
            <ProgressBar animated now={(Wizard.currentPage + 1) * (100 / Wizard.numberOfPages)} />
          </Modal.Body>
          <Modal.Footer className="space-between">
            {Wizard.currentPage > 0 ? <Button onClick={Wizard.toPrevPage} variant="secondary">
              Vissza
            </Button> : null}
            <Button type="submit" className="right-side" variant="primary">
              {Wizard.currentPage >= Wizard.numberOfPages - 1 ? "Befejezés" : "Tovább"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default FormModal;






