import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './formModal.scss'
import { useWizardForm } from '../../../utils/hooks/useWizardForm';

function FormModal(props) {

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
      });
    });
  };

  const onSubmit = function (e) {
    e.preventDefault();
    if (Wizard.currentPage < Wizard.numberOfPages - 1) {
      Wizard.toNextPage()
    } else {
      console.log("submited answer")
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






