import { Row, Col } from "react-bootstrap"
import { doctorList } from "../data/doctorsList";
import AppointmentCard from "./appointmentCard"
import Doctor from "../models/Doctor";

export default function AllDoctors() {
    return (
        <>
            <h1>All Doctors</h1>
            <Row md={2} xs={1} lg={3} className="g-3">
                {doctorList.map(doctor => (
                    <Col key={doctor._id}>
                        <AppointmentCard doctor={doctor} />
                    </Col>
                ))}
            </Row>
        </>
    )
}