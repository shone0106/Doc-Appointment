import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { doctorList } from '../data/doctorsList'



function ViewDoctor() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availability, setAvailability] = useState(false)
  const { id } = useParams()

  const doctor = doctorList.find(doctor => doctor._id == id)

  if (!doctor) return <h2>Post Not Found</h2>
  const dateStrings = [
    '2023-05-01',
    '2023-05-05',
    '2023-05-10',
    '2023-05-15',
    '2023-05-20'
  ];

  // Parse the date strings into Date objects
  const bookedDates = dateStrings.map((dateString) => new Date(dateString));

  const handleDateChange = (myDate: Date) => {
    const hours = myDate.getHours(); // Get the hour component of the time
    const minutes = myDate.getMinutes(); // Get the minute component of the time
    const seconds = myDate.getSeconds();
    if (hours != 0 || minutes || 0 && seconds || 0) {
      setSelectedDate(myDate);
    }
  };

  const checkAvailability = () => {
    const conflict = bookedDates.filter(date => selectedDate?.getTime() === date.getTime())
      if(!selectedDate){
        alert('select a date and time')
        setAvailability(false)
      }
      else if (conflict.length > 0) {
        console.log('not available on date '+selectedDate)
        alert('not available')
        setAvailability(false)
      }
      else {
        console.log('available on date '+selectedDate)
        alert('available')
        setAvailability(true)
      }
  }

  const handleSubmit = () => {
    console.log(selectedDate)
  }


  return (
    <>
      <h5>{`Name : ${doctor.firstName} ${doctor.lastName}`}</h5>
      <h5>{`Phone : ${doctor.phone}`}</h5>
      <h5>{`Email : ${doctor.email}`}</h5>
      <h5>{`Specialization : ${doctor.specialization}`}</h5>
      <h5>{`Experience : ${doctor.experience}`}</h5>
      <h5>{`Timings : ${doctor.timings}`}</h5>
      <h5>{`Fees Per Consultation : ${doctor.feesPerCunsaltation}`}</h5>
      <DatePicker
        selected={selectedDate}
        onChange={(handleDateChange)}
        showTimeSelect
        required
        placeholderText="Select a date and time"
      />
      <Form onSubmit={handleSubmit} className='mt-4'>
        <Button className="me-2" onClick={checkAvailability}>Check Availabitity</Button>

        <Button onClick={handleSubmit} disabled={!availability}>Book Appointment</Button>
      </Form>



    </>
  )
}

export default ViewDoctor