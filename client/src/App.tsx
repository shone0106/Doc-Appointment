import { Row, Col, Container} from "react-bootstrap"
import { Routes, Route } from 'react-router-dom'

import Sidebar from "./components/sidebar"
import Home from "./pages/home"
import Appointments from "./pages/appointments"
import Profile from "./pages/profile"
import ViewDoctor from "./pages/viewDoctor"

function App() {

  return (
    <>
    <Row>
      <Col xs={2}>
        <Sidebar/>
      </Col>
      <Col >
      <Container className="m-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors/:id" element={<ViewDoctor/>} />
        <Route path="/appointments" element={<Appointments/>} />
        <Route path="/profile" element={<Profile/>} />

      </Routes>  
      </Container>      
      </Col>
    </Row>

    </>
  )
}

export default App
