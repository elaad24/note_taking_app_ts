import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, InputGroup, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { LoginService } from "../service/authService";
import axios, { AxiosError } from "axios";

export default function Login() {
  const nevigate = useNavigate();

  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [passwordErrorText, setPasswordErrorText] = useState<String | null>(
    null
  );
  const [validate, SetValidate] = useState<boolean>(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const formValidation = () => {
    console.log("form validation started");

    let valid = null;
    if (typeof passwordRef.current !== null) {
      if (passwordRef.current!.value.length < 5) {
        console.log("short password");

        setPasswordErrorText("password must be at least 5 chercters long");
        valid = false;
      }
    }

    if (valid == false) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    SetValidate(true);

    try {
      if (formValidation()) {
        const loginReq = await LoginService({
          username: userNameRef.current!.value,
          password: passwordRef.current!.value,
        });
        document.cookie = document.cookie = `accessToken=${
          loginReq.data?.accessToken
        }; path=/; expires=${new Date(Date.now() + 900000)} `;
        nevigate("/");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        if (axiosError.message !== "wrong info") {
          setErrorMsg("the user info is wrong plese try again");
        } else {
          setErrorMsg(`${axiosError?.message}, plese try again in a few`);
        }
        console.error(axiosError?.message);
      }
    }
  };

  return (
    <>
      <Form
        noValidate
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        validated={validate}
        style={{
          border: "1px solid black",
          backgroundColor: "rgb(189, 195, 199)",
          margin: "0 auto",
        }}
        className="w-75  p-5 pt-2 pb-3"
      >
        <Row className="">
          <h2 className="text-center">Login</h2>
        </Row>
        {errorMsg && (
          <Row className="">
            <h2
              style={{
                border: "1px solid red",
                backgroundColor: "white",
                textTransform: "capitalize",
                fontSize: "1.2rem",
              }}
              className="text-center text-danger rounded"
            >
              {errorMsg}
            </h2>
          </Row>
        )}
        <Stack gap={4}>
          <Row>
            <Form.Group as={Col} controlId="userName">
              <Form.Label>Username</Form.Label>
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
                  please enter username
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

          <Row className="justify-content-center">
            <Button
              variant="primary"
              type="submit"
              className="w-75 align-items-center"
            >
              Log in
            </Button>
            <span style={{ fontSize: ".95rem" }} className="mt-2">
              you dont have account?
            </span>
            <Link to={"/register"}>Register</Link>
          </Row>
        </Stack>
      </Form>
    </>
  );
}
