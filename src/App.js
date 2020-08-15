import React from 'react';
import Routes from './routes'
import { Container} from 'reactstrap'
import './App.css';
import { ContextWrapper } from './user-context';

// TODO  context language japan/eng 


function App() {
  return (
    <ContextWrapper>
      <Container>
        <h1>Anime Events</h1>
        <div className='content'>
          <Routes />
        </div>
      </Container>
    </ContextWrapper>
  );
}

export default App;
