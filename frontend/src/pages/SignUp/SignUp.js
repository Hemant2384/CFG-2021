import React from 'react';
import { InfoSection } from '../../components';
import { homeObjOne, homeObjThree } from './Data';
import FormSignup from '../../components/SignandLog/FormSignup';


function SignUp() {
  return (
    <>
    <FormSignup/>
      {/* <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjThree} /> */}
    </>
  );
}

export default SignUp;
