/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { StyledCard } from "../styled/StyledCard";
import axiosInstance from "../api/axiosInstance";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";

export default function InitiativeCard({ initiative }) {
  const [votes, setVotes] = useState(initiative.votesCount);
  const navigate = useNavigate();

  const handleVote = async (voteType) => {
    try {
      const response = await axiosInstance.put(
        `/initiatives/${initiative.id}/vote`,
        {
          voteType,
        }
      );
      console.log("Vote updated:", response.data);
      setVotes((prev) => prev + 1);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const handleDetailClick = () => {
    navigate(`/initiatives/${initiative.id}`);
  };

  return (
    <Col md={4} className="mt-2 position-relative">
      <Card style={{ minHeight: "500px", maxHeight: "500px" }}>
        <StyledCard>
          <h3 className="p-2">{initiative.title}</h3>
          <p className="p-2">{initiative.description}</p>
          <span>Голосов всего отдано: {votes}</span>
          <span>Общий процент голосов за: {initiative.percentFor}%</span>
          <span>
            Дата окончания инициативы:{" "}
            {new Date(initiative.endDate).toLocaleDateString()}
          </span>
          <div className="d-flex flex-row justify-content-end gap-4 mt-2">
            <Button
              variant="outline-primary"
              type="submit"
              onClick={handleDetailClick}
              className="mb-3"
            >
              Подробнее
            </Button>

            <Dropdown>
              <Dropdown.Toggle variant="danger" id="dropdown-basic">
                Проголосовать
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleVote("for")}>
                  Отдать голос За
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleVote("against")}>
                  Проголосовать Против
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </StyledCard>
      </Card>
    </Col>
  );
}
