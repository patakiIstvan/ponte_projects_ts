import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './formModal.scss'
import { useWizardForm } from '../../../utils/hooks/useWizardForm';

function FormModal() {
  const [show, setShow] = useState(false);
  const Wizard = useWizardForm([{ inputs: <></>, valiadtion: null }, { inputs: <></>, valiadtion: null }, { inputs: <></>, valiadtion: null }])


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="email"
                autoFocus
                required
                onChange={Wizard.handleTextChange}
                page="0"
                error=""
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>

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