import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const AuthNavbar = () => {
    return (
        <React.Fragment>
            <Navbar bg="dark" expand="lg" className="navbar-dark">
                <Container>
                    <Navbar.Brand>React Auth Demo</Navbar.Brand>
                </Container>
            </Navbar>
        </React.Fragment>
    );
};

export default AuthNavbar;
