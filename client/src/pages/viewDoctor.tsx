import { useParams } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { doctorList } from '../data/doctorsList'



function ViewDoctor() {
    const { id } = useParams()

    const doctor = doctorList.find(doctor => doctor._id == id)

    if (!doctor) return <h2>Post Not Found</h2>

  return (
    <>
    <h5>{`Name : ${doctor.firstName} ${doctor.lastName}`}</h5>
    <h5>{`Phone : ${doctor.phone}`}</h5>
    <h5>{`Email : ${doctor.email}`}</h5>
    <h5>{`Specialization : ${doctor.specialization}`}</h5>
    <h5>{`Experience : ${doctor.experience}`}</h5>
    <h5>{`Timings : ${doctor.timings}`}</h5>
    <h5>{`Fees Per Consultation : ${doctor.feesPerCunsaltation}`}</h5>
    </>
  )
}

export default ViewDoctor