import React from 'react';
import './createpost.css';
import{
    cpform,
    cpfirstname
    // cplastname
    // cpphonenumber
    // cpemailid
    // cpdescription
    // cppassword
    // cpconfirmpassword
} from './createpost.element'

function createpost(){
    return (
        <cpform>
            <cpfirstname><input type="text" id="input"></input></cpfirstname>
            {/* <cplastname>jain</cplastname>
            <cpphonenumber>9529892522</cpphonenumber>
            <cpemailid>jainhemant126@gmail.com</cpemailid>
            <cpdescription>lorem</cpdescription>
            <cppassword>hj123#</cppassword>
            <cpconfirmpassword>hj123#</cpconfirmpassword> */}
        </cpform>
    );
}
export default createpost;