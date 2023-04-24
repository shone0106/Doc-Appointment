import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { doctorList } from '../data/doctorsList';
import Doctor from '../models/Doctor';

interface AppointmentCardProps{
    doctor: Doctor;
}

export default function AppointmentCard({doctor}: AppointmentCardProps) {
    const navigate = useNavigate();
    return (
        <Card style={{ width: '18rem', height: '16rem', cursor: "pointer" }}
        onClick={() => navigate(`/doctors/${doctor._id}`)}>
        <Card.Body>
          <Card.Title>{`${doctor.firstName} ${doctor.lastName}`}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{doctor.timings}</Card.Subtitle>
          <Card.Text>
            {doctor.specialization}
          </Card.Text>
          <Card.Text>
            {doctor.experience}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
  