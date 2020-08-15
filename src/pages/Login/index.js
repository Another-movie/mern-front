import React, { useState, useContext } from 'react';
import api from '../../services/api'
import { Button, Form, FormGroup, Input, Container, Alert } from 'reactstrap';
import { UserContext } from '../../user-context';


export const Login = ({history}) => {
    const { setIsLoggedIn } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState(false);


    const handleSubmit = async e => {
        e.preventDefault();

        const response = await api.post('/login', {email, password});
        const user_id = response.data.user_id || false;
        const user = response.data.user || false;

        try {
            if(user && user_id){
                localStorage.setItem('user', user);
                localStorage.setItem('user_id', user_id);
                setIsLoggedIn(true);
                history.push('/');
            } else {
                setErr(true);
                setTimeout(()=>{
                    setErr(false);
                },2000)
            }
        } catch (error) {
            setErr(true);
        }

        

    }

    return (

    <Container>
        <h2>Login:</h2>
        <p>Please <strong>Login</strong> to your account</p>
        <Form onSubmit={handleSubmit}>
            <div className='input-group'>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input 
                        type="email" 
                        name="email" 
                        id="exampleEmail" 
                        placeholder="Your email" 
                        onChange={e=>setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input 
                        type="password" 
                        name="password" 
                        id="examplePassword" 
                        placeholder="Your password" 
                        onChange={e=>setPassword(e.target.value)}/>
                </FormGroup>
            </div>
            <FormGroup>
                <Button className='submit-btn'>Submit</Button>
            </FormGroup>
            <FormGroup>
                <Button className='secondary-btn' onClick={()=>history.push('/register')}>New Account</Button>
            </FormGroup>

        </Form>
        {err ? (
                <Alert className="event-validation" color='danger'>Missing required fields</Alert>
            ) : ''}
    </Container>
    )
}
