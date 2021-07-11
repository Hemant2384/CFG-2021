import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Button } from '../../globalStyles';
import '../createpost/createpost.css'
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavItem,
  NavItemBtn,
  NavLinks,
  NavLang,
  NavBtnLink
} from './Navbar.elements';
import { navContext } from '../../App';

function Navbar() {
  const {schoolloggedin,setSchoolLoggedIn,volunteerloggedin,setVolunteerLoggedIn,adminloggedin,
    setAdminLoggedIn} =React.useContext(navContext);
    
    console.log(volunteerloggedin)
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavbarContainer>
            <NavLogo to='/' onClick={closeMobileMenu}>
            <NavIcon />
              <p className="heading"> Way For Life</p>
            </NavLogo>
            <MobileIcon onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </MobileIcon>
            <NavMenu onClick={handleClick} click={click}>
             <NavItem>
                <NavLinks to='/' onClick={closeMobileMenu}>
                  Home
                </NavLinks>
              </NavItem>
               {volunteerloggedin &&(<NavItem>
                <NavLinks to='/oppor' onClick={closeMobileMenu}>
                 Opportunities
                </NavLinks>
              </NavItem>)}  
              {((volunteerloggedin)||(schoolloggedin)||(adminloggedin)) && (<NavItem>
                <NavLinks to='/forum' onClick={closeMobileMenu}>
                 Forum
                </NavLinks>
              </NavItem>)} 
              {volunteerloggedin &&(<NavItem>
                <NavLinks to='/volunteerfeedback' onClick={closeMobileMenu}>
                  Feedback
                </NavLinks>
              </NavItem>)}
              
              {volunteerloggedin && <NavItem>
                <NavLinks to='/volunteerprofile' onClick={closeMobileMenu}>
                  VolunteerProfile
                </NavLinks>
              </NavItem>}
              {schoolloggedin &&(<NavItem>
                <NavLinks to='/tasks' onClick={closeMobileMenu}>
                  Tasks 
                </NavLinks>
              </NavItem>)} 
              {schoolloggedin &&(<NavItem>
                <NavLinks to='/schoolprofile' onClick={closeMobileMenu}>
                  School profile
                </NavLinks>
              </NavItem>)}
              {schoolloggedin &&(<NavItem>
                <NavLinks to='/video' onClick={closeMobileMenu}>
                  Trainings
                </NavLinks>
              </NavItem>)}
              {/* {schoolloggedin && <NavItem>
                <NavLinks to='/viewpoeple' onClick={closeMobileMenu}>
                  viewpeople
                </NavLinks>
              </NavItem>} */}
              {adminloggedin &&(<NavItem>
                <NavLinks to='/organisations' onClick={closeMobileMenu}>
                  Organisations
                </NavLinks>
              </NavItem>)}
              {adminloggedin && <NavItem>
                <NavLinks to='/volunteers' onClick={closeMobileMenu}>
                  Volunteers
                </NavLinks>
              </NavItem>}
              {adminloggedin && <NavItem>
                <NavLinks to='/volunteerprogress' onClick={closeMobileMenu}>
                  Volunteerprogress
                </NavLinks>
              </NavItem>}
              {adminloggedin && <NavItem>
                <NavLinks to='/taskassign' onClick={closeMobileMenu}>
                  Assign Task
                </NavLinks>
              </NavItem>}
           {((!volunteerloggedin)&&(!schoolloggedin)&&(!adminloggedin)) && <NavItemBtn>
                {button ? (
                  <NavBtnLink to='/sign-up'>
                    <Button primary>SIGN UP</Button>
                  </NavBtnLink>
                ) : (
                  <NavBtnLink to='/sign-up'>
                    <Button onClick={closeMobileMenu} fontBig primary>
                      SIGN UP
                    </Button>
                  </NavBtnLink>
                )}
              </NavItemBtn>}
            {((!volunteerloggedin)&&(!schoolloggedin)&&(!adminloggedin)) &&   <NavItemBtn> 
              {button ? (
                  <NavBtnLink to='/login'>
                    <Button primary>LOGIN</Button>
                  </NavBtnLink>
                ) : (
                  <NavBtnLink to='/login-up'>
                    <Button onClick={closeMobileMenu} fontBig primary>
                      LOGIN
                    </Button>
                  </NavBtnLink>
                )}
                  </NavItemBtn> }
                  {((volunteerloggedin)||(schoolloggedin)||(adminloggedin)) &&   <NavItemBtn> 
                    <NavBtnLink to="/">
                    <Button onClick={()=>{
                      setSchoolLoggedIn(false);
                      setVolunteerLoggedIn(false);
                      setAdminLoggedIn(false);
                    }} fontBig primary>
                      LOGOUT
                    </Button>
                  </NavBtnLink>
                  </NavItemBtn> }
            </NavMenu>
          </NavbarContainer>
        </Nav>
        <NavLang>
            <div id="google_translate_element"></div>
            </NavLang>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
