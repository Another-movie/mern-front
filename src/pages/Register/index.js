import React, { useState, useContext } from 'react';
import api from '../../services/api'
import { Button, Form, FormGroup, Input, Container, Alert } from 'reactstrap';
import { UserContext } from '../../user-context';


export const Register = ({history}) => {
    const { setIsLoggedIn } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        if(email!==''&&password!==''&&firstName!==''&&lastName!==''){
            const response = await api.post('/user/register', {email, password, firstName, lastName});
            const user_id = response.data.user_id || false;
            const user = response.data.user || false;
            
            if(user && user_id){
                localStorage.setItem('user', user);
                localStorage.setItem('user_id', user_id);
                setIsLoggedIn(true)
                history.push('/');
            }else{
                const {message} = response.data;
                setErr(true);
                setErrMsg(message);
                setTimeout(()=>{
                    setErr(false);
                    setErrMsg('');
                },2000)

            }
        } else {
            setErr(true);
            setErrMsg('You need to fill all inputs');
            setTimeout(()=>{
                setErr(false);
                setErrMsg('');
            },2000)
        }
        

    }

    return (
        <Container>
            <h2>Registration:</h2>
            <p>Please <strong>register</strong> for new account</p>
            <Form onSubmit={handleSubmit}>
                <div className='input-group'>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input 
                            type="text" 
                            name="firstName" 
                            id="firstName" 
                            placeholder="Your firstName" 
                            onChange={e=>setFirstName(e.target.value)} />
                    </FormGroup><FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input 
                            type="text" 
                            name="lastName" 
                            id="lastName" 
                            placeholder="Your lastName" 
                            onChange={e=>setLastName(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Your email" 
                            onChange={e=>setEmail(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Your password" 
                            onChange={e=>setPassword(e.target.value)}/>
                    </FormGroup>
                </div>
                <FormGroup>
                    <Button type='submit' className='submit-btn'>Submit</Button>
                </FormGroup>
                <FormGroup>
                    <Button className='secondary-btn' onClick={()=>history.push('/login')}>Login insted?</Button>
                </FormGroup>
            </Form>
            {err ? (
                <Alert className="event-validation" color='danger'>{errMsg}</Alert>
            ) : ''}
        </Container>
    )
}
