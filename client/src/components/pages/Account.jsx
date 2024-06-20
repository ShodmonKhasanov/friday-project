import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Account({ user }) {
  return (
    <Row>
      <Col>
        <h2> Страница профиля {user.data.name}</h2>
        <h2> Страница профиля {user.data.email}</h2>
      </Col>
    </Row>
  );
}
