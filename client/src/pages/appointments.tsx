import { Container, Table } from 'react-bootstrap';

const myAppointments = [
    {
        _id: "1",
        userId: "user1",
        firstName: "John",
        lastName: "Doe",
        phone: "+1 123-456-7890",
        email: "john.doe@example.com",
        address: "123 Main St, Anytown, USA",
        specialization: "Cardiology",
        experience: "5 years",
        feesPerCunsaltation: 150,
        status: "pending",
        timings: "10:00 am to 12:00 pm" 
      },
      {
        _id: "2",
        userId: "user2",
        firstName: "Jane",
        lastName: "Smith",
        phone: "+1 234-567-8901",
        email: "jane.smith@example.com",
        address: "456 Oak St, Anytown, USA",
        specialization: "Dermatology",
        experience: "7 years",
        feesPerCunsaltation: 200,
        status: "pending",
        timings: "10:00 am to 12:00 pm" 
      }
]


function Appointments() {
  return (
    <>
    <h3>My Appointments</h3>
    <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Doctor</th>
                            <th>Specialization</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myAppointments.map(appointment => (
                                <tr key={appointment._id}> 
                                    <td>{appointment.firstName}</td>
                                    <td>{appointment.specialization}</td>
                                    <td>{appointment.status}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                </>
  )
}

export default Appointments