import React, { useRef, useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

type LinkInputProps = {
  handleLinkChange?: (event: any) => void;
  page?: number;
  formData?: {
    links?: {
      value?: { [key: string]: string };
    };
  };
}


const LinkInput = (props: LinkInputProps) => {
  const [inputId, setInputId] = useState<number>(props?.formData?.links?.value && Object.keys(props?.formData?.links?.value).length !== 0 ? Math.max(...Object.keys(props?.formData?.links?.value).map(Number)) + 1 : 0);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const newLink = function (inputRef: React.RefObject<HTMLInputElement>) {
    if (inputRef.current) {
      if (inputRef.current?.value.length > 0) {
        setInputId(prevId => prevId + 1);
      }
    }
  }

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = ""
      inputRef.current.focus();
    }
  }, [inputId])

  return (
    <>
      <div className="linkInput-container">
        <InputGroup className="main-linkInput">
          <InputGroup.Text>@</InputGroup.Text>
          <Form.Control
            type="text"
            name="links"
            data-inputid={inputId}
            placeholder="Projekthez kapcsolódó weboldal"
            onChange={(e: React.ChangeEvent) => { props.handleLinkChange && props.handleLinkChange(e) }}
            onFocus={(e: React.FocusEvent) => { props.handleLinkChange && props.handleLinkChange(e) }}
            ref={inputRef}
            data-page={props.page ?? 0}
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
                data-inputid={linkId}
                value={link}
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