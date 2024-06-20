/* eslint-disable react/prop-types */
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { StyledCard } from '../styled/StyledCard';
import Button from 'react-bootstrap/esm/Button';
import axiosInstance from '../api/axiosInstance';

export default function PostCard({ initiative }) {
  const handleVote = async (voteType) => {
    try {
      const response = await axiosInstance.put(`/initiatives/${initiative.id}/vote`, {
        voteType
      });
      console.log('Vote updated:', response.data);
    } catch (error) {
      console.error('Error voting:', error);
    }
  };
  return (
    <Col md={4} className="mt-2 position-relative">
      <Card
        style={{
          minHeight: '400px',
          maxHeight: '500px',
        }}
      >
        <StyledCard>
          <h3 className="p-2">{initiative.title}</h3>
          <p className="p-2">{initiative.description}</p>
          <span>Голосов всего отдано: {initiative.votesCount}</span>
          <span>Общий процент голосов за: {initiative.percentFor}</span>
          <span>Дата окончания инициативы{initiative.endDate}</span>
          <div className="d-flex flex-row justify-content-end gap-4">
            <Button variant="outline-danger" className="mb-2">
              Подробнее
            </Button>
            <Button variant="danger" onClick={() => }>Отдать Голос За</Button>
          <Button variant="success" onClick={() => }>Проголосовать против</Button>
            {/* {user.data && user.data.id === card.userId && (
              <Button
                onClick={() => deleteHandler(card.id)}
                variant="outline-danger"
                className="mb-2"
              >
                Удалить
              </Button>
            )} */}
          </div>
        </StyledCard>
      </Card>
    </Col>
  );
}
