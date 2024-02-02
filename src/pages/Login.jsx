import { Button, Heading } from '@chakra-ui/react';
import React from 'react';
import axios from 'axios';

const Login = () => {
    const handleLogin = () => {
        axios.get("http://localhost:3000/auth/signin")
        .then(response => {
            console.log('Authentication successful');
            // You can redirect the user or perform other actions here
          })
          .catch(error => {
            console.error('Error authenticating:', error);
            // Handle error
          });
          axios.get("/")
          .then(response => {
            console.log(response);
          })
          .catch(error => console.log(error));
    }
    return(
        <>
            <Heading>This is login</Heading>
            <Button
                onClick = {handleLogin}
                colorScheme = "blue"
            >Microsoft</Button>
        </>
    )
}

export default Login;