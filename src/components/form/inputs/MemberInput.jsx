import React, { useEffect, useRef, useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { dummy_roles } from '../../../utils/dummdata';


const MemberInput = (props) => {
  const [inputId, setInputId] = useState(0);
  const [role, setRole] = useState([]);
  const inputRef = useRef(null)

  const newMember = function (inputRef) {
    if (inputRef.current.value.length > 0) {
      if (role.length > 0) {
        setInputId(prevId => prevId + 1);
      }
    }
  }

  const handleRole = function (e, clearRoles = false) {
    if (!clearRoles && e) {
      setRole([e.target.getAttribute("value")]);
    } else {
      setRole([]);
    }
  }

  useEffect(() => {
    inputRef.current.focus();
  }, [role])

  useEffect(() => {
    inputRef.current.value = ""
    inputRef.current.focus();
    handleRole()
  }, [inputId])

  return (
    <>
      <div className="linkInput-container">
        <InputGroup className="main-linkInput">

          <Form.Control
            type="text"
            name="members"
            role={role.length > 0 ? role[0] : ""}
            inputid={inputId}
            placeholder="Feladatot megkapja"
            onChange={props.handleMemberChange}
            onFocus={props.handleMemberChange}
            ref={inputRef}
          />
          <DropdownButton
            variant="outline-secondary"
            title="Pozíciója"
            id="input-group-dropdown-2"
            align="end"
          >
            {dummy_roles.map(role => (
              <Dropdown.Item key={role} onClick={handleRole} value={role} href="#">{role}</Dropdown.Item>
            ))}
          </DropdownButton>
          <Button onClick={() => { newMember(inputRef) }} variant="outline-secondary">Hozzáadás</Button>

        </InputGroup>
        {props.formData?.members?.value && Object.entries(props.formData?.members?.value).map(([memberId, member]) => (
          (<>
            <InputGroup key={"member_" + member.name}>
              <Form.Control
                type="text"
                disabled
                name="members"
                inputid={memberId}
                value={`${member.name ? member.name : ''}${member.role.length > 0 ? " - " + member.role[0] : ""}`}
                data-page={props.page ?? 0}
              />
            </InputGroup>
          </>)
        ))
        }
      </div>
    </>
  )
}

export default MemberInput