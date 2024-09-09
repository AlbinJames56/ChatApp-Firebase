import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Google Sign-In
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User signed in:", result.user);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
        setError(error.message);
      });
  };

  // Email and Password Sign-In
  const handleEmailSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User signed in with email:", userCredential.user);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
        setError(error.message);
      });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Login to Realtime Chat App</h2>

              {error && <p className="text-danger text-center">{error}</p>}

              <Button
                onClick={googleSignIn}
                variant="danger"
                className="w-100 mb-3"
              >
                Sign in with Google
              </Button>

              <hr />

              {/* <Form onSubmit={handleEmailSignIn} >
                <div className="justify-content-center col" >
        
                  <Form.Group controlId="formEmail" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control  
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group> 
                
                  <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
             
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mt-4"
                  >
                    Sign in with Email
                  </Button>
                   
                </div>
                
              </Form> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
