import React, { useRef, useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LinkIcon from '../../reuseables/LinkIcon/LinkIcon';


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
      <InputGroup>
        <InputGroup.Text>@</InputGroup.Text>
        <Form.Control
          type="text"
          name="links"
          inputid={inputId}
          placeholder="Input group example"
          aria-label="Input group example"
          onChange={props.handleLinkChange}
          ref={inputRef}
        />
        <Button onClick={() => { newLink(inputRef) }} variant="outline-secondary">Link beküldése</Button>

      </InputGroup>
      {props.formData?.links?.value && Object.entries(props.formData?.links?.value).map(([linkId, link]) => (
        (<>
          <InputGroup key={"link_" + linkId}>
            <InputGroup.Text><LinkIcon icon={link.icon} url={link.url} /></InputGroup.Text>
            <Form.Control
              type="text"
              disabled
              name="links"
              inputid={linkId}
              placeholder="Input group example"
              aria-label="Input group example"
              value={link.url}
              autoFocus
            />
          </InputGroup>
        </>)
      ))
      }
    </>
  )
}

export default LinkInput