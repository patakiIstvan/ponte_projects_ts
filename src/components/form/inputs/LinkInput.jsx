import React, { useRef, useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const LinkInput = (props) => {
  const [inputId, setInputId] = useState(0);

  const inputRef = useRef(null)

  const newLink = function (inputRef) {
    if (inputRef.current.value.length > 0) {
      setInputId(prevId => prevId + 1);
      inputRef.current.value = ""
    }
  }

  return (
    <>
      <div className="linkInput-container">
        <InputGroup className="main-linkInput">
          <InputGroup.Text>@</InputGroup.Text>
          <Form.Control
            type="text"
            name="links"
            inputid={inputId}
            placeholder="Projekthez kapcsolódó weboldal"
            onChange={props.handleLinkChange}
            ref={inputRef}
          />
          <Button onClick={() => { newLink(inputRef) }} variant="outline-secondary">Link beküldése</Button>

        </InputGroup>
        {props.formData?.links?.value && Object.entries(props.formData?.links?.value).map(([linkId, link]) => (
          (<>
            <InputGroup key={"link_" + link}>
              <InputGroup.Text>
                <img className="link-icon" src={`https://www.google.com/s2/favicons?domain=${link}&sz=256`} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                disabled
                name="links"
                inputid={linkId}
                value={link}
                autoFocus
              />
            </InputGroup>
          </>)
        ))
        }
      </div>
    </>
  )
}

export default LinkInput