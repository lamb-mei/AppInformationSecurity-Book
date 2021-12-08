import Head from 'next/head';

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const Header = () => (
    <div style={{
        marginBottom: '5%'
    }}>
      <Head>
        <title>App SecDev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav>
                    <NavDropdown title="加密相關DEMO" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/tdes">3-DES</NavDropdown.Item>
                    <NavDropdown.Item href="/hmac">HMAC</NavDropdown.Item>
                    <NavDropdown.Divider />
                        <NavDropdown.Item href="/aes_easy">AES 資料加密</NavDropdown.Item>
                        <NavDropdown.Item href="/aes_test">AES 資料加密（Adv）</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/aes">加密IV影響演示</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/rsa">RSA</NavDropdown.Item>
                        <NavDropdown.Item href="/ecc">ECC 1</NavDropdown.Item>
                        <NavDropdown.Item href="/ecc2">ECC 2</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>  
    </div>
  );
  
  export default Header;
  