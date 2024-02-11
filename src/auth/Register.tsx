import React, { useRef, useState } from "react";
import { Button, Col, Form, InputGroup, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Register() {
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);

  const [passwordErrorText, setPasswordErrorText] = useState<String | null>(
    null
  );
  const [passwordConfirmErrorText, setPasswordConfirmErrorText] =
    useState<String | null>(null);

  const formValidation = () => {
    if (typeof passwordRef.current !== null) {
      if (passwordRef.current!.value.length < 5) {
        setPasswordErrorText("password must be at least 5 chercters long");
      } else if (passwordRef.current!.value.length > 20) {
        setPasswordErrorText("password must be shorter the 20 cherecters long");
      }
    }

    if (typeof passwordConfirmRef.current !== null) {
      if (passwordConfirmRef.current?.value !== passwordRef.current?.value) {
        setPasswordConfirmErrorText(
          "the password and password confirm must by identicals"
        );
      }
    }
  };
  return (
    <>
      <Form
        noValidate
        style={{
          border: "1px solid black",
          backgroundColor: "rgb(189, 195, 199)",
          margin: "0 auto",
        }}
        className="w-75  p-5 pt-2 pb-3"
      >
        <Row className="">
          <h2 className="text-center">Register</h2>
        </Row>
        <Stack gap={4}>
          <Row>
            <Form.Group as={Col} controlId="userName">
              <Form.Label>User Name</Form.Label>
              <InputGroup>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  ref={userNameRef}
                  required
                  minLength={3}
                  maxLength={15}
                />
                <Form.Control.Feedback type="invalid">
                  please enter userName
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={passwordRef}
                type="password"
                required
                minLength={5}
                maxLength={20}
              />
              <Form.Control.Feedback type="invalid">
                {passwordErrorText}
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="passwordConfirm">
              <Form.Label>Password Confirm</Form.Label>
              <Form.Control ref={passwordConfirmRef} type="password" required />

              <Form.Control.Feedback type="invalid">
                {passwordConfirmErrorText}
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="justify-content-center">
            <Button variant="primary" className="w-75 align-items-center">
              sign up
            </Button>
            <span style={{ fontSize: ".95rem" }} className="mt-2">
              Alredy registered?
            </span>
            <Link to={"/login"}>Sing In</Link>
          </Row>
        </Stack>
      </Form>
    </>
  );
}
