import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './Contact.css';  // Import the CSS file

const Contact = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col md={6}>
          <Card className="p-4 mb-4">
            <Card.Body>
              <p>GET IN TOUCH WITH US!</p>
              <h3>Contact Us</h3>
              <p>
                Head Office Address: 123 Main Street, City, Country
                <br />
                Phone: +123 456 7890
                <br />
                Timings: Monday - Friday, 9:00 AM - 5:00 PM
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-4 mb-4">
            <Card.Body>
              <h3>Location</h3>
              {/* Embedding the map using an iframe */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.4229890165293!2d80.23485607427126!3d13.008714014065122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52670ed6fd1b07%3A0x3e03c0d968228354!2sAIC%20-%20Anna%20Incubator!5e0!3m2!1sen!2sin!4v1716455864502!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: '1px solid #ccc', borderRadius: '10px' }}
                allowFullScreen=""
                loading="lazy"
                title="Google Maps"
              ></iframe>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="p-4 mb-4">
            <Card.Body>
              <p>LEAVE US A MESSAGE</p>
              <h3>We would love to hear from you!</h3>
              <Form>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>

                <Form.Group controlId="formPhone" className="mb-3">
                  <Form.Control type="tel" placeholder="Enter your phone number" />
                </Form.Group>

                <Form.Group controlId="formMessage" className="mb-3">
                  <Form.Control as="textarea" rows={3} placeholder="Enter your message" />
                </Form.Group>

                <Button variant="primary" type="submit" className="mb-3" style={{ backgroundColor: 'orange', borderColor: 'orange' }}>
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
