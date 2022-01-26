import React from 'react';
import { Form, Input , Row, Button, Label, FormGroup, Col} from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTooth } from "@fortawesome/free-solid-svg-icons";
import "./FormularioCrud.css";


export function OdontologoForm({ handleSubmit, handleChange, validarOdontologo, odontologo, buttonText,titulo }){
  return (

    
  
    <Form onSubmit={handleSubmit}>
    <Row form>
      <Col md={6}>
        <FormGroup>
          <Label for="nombre">
            Nombre
          </Label>
          <Input
            id="nombre"
            name="nombre"
            placeholder="Nombres"
            type="text"
            value={odontologo.nombre}
            onChange={handleChange}
          />
        </FormGroup>
      </Col>      
      <Col md={6}>
        <FormGroup>
          <Label for="apellidos">
            Apellidos
          </Label>
          <Input
            id="apellidos"
            name="apellidos"
            placeholder="Apellidos"
            type="text"
            value={odontologo.apellidos}
            onChange={handleChange}
          />
        </FormGroup>
      </Col>      
    </Row>
    <Row form>
      <Col md={6}>
        <FormGroup>
          <Label for="telefono">
            Teléfono
          </Label>
          <Input
            id="telefono"
            name="telefono"
            placeholder="Teléfono"
            value={ odontologo.telefono } 
            type="number"
            onChange={handleChange}
          />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label for="documento">
            Número Documento
          </Label>
          <Input
            id="documento"
            name="documento"
            placeholder="Número Documento"
            type="number"
            value={odontologo.documento}
            onChange={handleChange}
          />
        </FormGroup>
      </Col>      
    </Row>
    <Row form>       
      <Col md={6}>
        <FormGroup>
          <Label for="fechaNacimiento">
            Fecha de nacimiento
          </Label>
          <Input
            id="fechaNacimiento"
            name="fechaNacimiento"
            placeholder="Fecha de nacimiento"
            type="date"
            value={odontologo.fechaNacimiento}
            onChange={handleChange}
          />
        </FormGroup>
      </Col>      
      <Col md={6}>
        <FormGroup>
          <Label for="email">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            placeholder="Email"
            value={ odontologo.email } 
            type="email"
            onChange={handleChange}
          />
        </FormGroup>
      </Col>   
    </Row>

    <Row form>       
      <Col md={6}>
        <FormGroup>
          <Label for="fechaNacimiento">
            Contraseña
          </Label>
          <Input
            id="password"
            name="password"
            placeholder="Contraseña"
            type="password"
            value={odontologo.password}
            onChange={handleChange}
          />
        </FormGroup>
      </Col>      
      <Col md={3}>        
      <FormGroup >
        <Label for="idEspecializacion">
        Especialización
        </Label>
        <Input
          id="idEspecializacion"
          name="idEspecializacion"
          type="select"
        >
          <option value={odontologo.idEspecializacion}>Ortodoncia </option>
            
        </Input>
      </FormGroup>  
      </Col>  
      <Col md={3}>        
      <FormGroup >
        <Label for="idSede">
          Sede
        </Label>
        <Input
          id="idSede"
          name="idSede"
          type="select"
        >
          <option value={odontologo.idSede}>Neiva </option>
            
        </Input>
      </FormGroup>  
      </Col>   
    </Row>
    
    
    <Button
      color="primary"
    >
      {buttonText}
    </Button>
  </Form>

   
       
  )
}