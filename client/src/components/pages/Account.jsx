import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Account({ user }) {
  return (
    <Row>
      <Col>
        <h2> Account page {user.data.name}</h2>
      </Col>
    </Row>
  );
}