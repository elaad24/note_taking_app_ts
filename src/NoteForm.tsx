import { Col, Form, Row, Stack } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";

export default function NoteForm() {
  return (
    <Form>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>title</Form.Label>
              <Form.Control required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>tags</Form.Label>
              <Form.Control required />
            </Form.Group>
          </Col>
        </Row>
      </Stack>
    </Form>
  );
}
