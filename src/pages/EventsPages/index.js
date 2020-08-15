import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api';
import { Button, Form, FormGroup, Input, Container, Label, Alert, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import camera from '../../assets/camera.png';
import "./event.css";

export const EventsPage = ({history}) => {
    
    const [title, setTitle] = useState('');
    const [dropdownOpen, setOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [date, setDate] = useState('');
    const [sport, setSport] = useState('sport');
    const [errMsg, setErrMsg] = useState(false);

    const user = localStorage.getItem('user');

    useEffect(() => {
        if (!user) history.push('/login');
        // eslint-disable-next-line
    }, [])

    const toggle = () => setOpen(!dropdownOpen);

    const preview = useMemo(()=>{
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    const submitHandler =async (e) => {
        e.preventDefault();

        const eventData = new FormData();
        eventData.append("thumbnail", thumbnail);
        eventData.append("title", title);
        eventData.append("description",description);
        eventData.append("price", price);
        eventData.append("date", date);
        eventData.append("sport", sport);
        
        
            try {
            if(title !== '' && description!== '' && sport!== 'sport' && price !== ''&& date && thumbnail!==null){
                await api.post('/event', eventData, {headers:{user}});
                setTimeout(()=>{
                    history.push('/');
                },2000)
                
            } else {
                setErrMsg(true);
                setTimeout(()=>{
                    setErrMsg(false);

                },2000)
                console.log('Missed required data')
            }
                
            } catch (error) {
                console.log(error.msg);   
            }
        
        return 0;
    }

    return (
        <Container>
            <h1>Create your Event</h1>
            <Form onSubmit={submitHandler}>
                <div className='input-group'>
                <FormGroup>
                    <Label>Upload Image: </Label>
                    <Label id='thumbnail' style={{ backgroundImage: `url(${preview})`}} className={thumbnail?'has_thumbnail':''}>
                    <Input  type='file' onChange={e => setThumbnail(e.target.files[0])}/>
                    <img src={camera} style={{maxWidth: '50px'}} alt='upload icon'/>
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>Title: </Label>
                    <Input id='title' type='text' value={title} placeholder={'Event title...'} onChange={e => setTitle(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Description: </Label>
                    <Input id='description' type='text' value={description} placeholder={'Event description...'} onChange={e => setDescription(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Price: </Label>
                    <Input id='price' type='text' value={price} placeholder={'Event price...'} onChange={e => setPrice(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Date: </Label>
                    <Input id='date' type='date' value={date} onChange={e => setDate(e.target.value)}/>
                </FormGroup>

                <FormGroup>
                    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                        <Button id='caret'  value={sport} disabled>{sport}</Button>
                        <DropdownToggle caret />
                        <DropdownMenu>
                            <DropdownItem onClick={()=>setSport('kendo')}>Kendo</DropdownItem>
                            <DropdownItem onClick={()=>setSport('fukibur')}>Fukibur</DropdownItem>
                            <DropdownItem onClick={()=>setSport('samurai')}>Samurai</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </FormGroup>

            </div>

                <FormGroup>
                    <Button type='submit' className='submit-btn'>
                        Create event
                    </Button> 
                </FormGroup>
                <FormGroup>
                    <Button className='secondary-btn' onClick={()=>history.push('/')}>
                        Cancel
                    </Button> 
                </FormGroup>
                
            </Form>
            {errMsg ? (
                <Alert className="event-validation" color='danger'>Missing required information</Alert>
            ) : ''}
        </Container>
    )
}
