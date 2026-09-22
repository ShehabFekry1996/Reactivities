import { Container, CssBaseline} from '@mui/material';
import axios from 'axios';
import {useEffect, useState} from 'react'
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';


function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);




  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
    .then(response => setActivities(response.data));
  },[]);

  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities.find(a => a.id === id));
  }

    const handleCancelSelectedActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) =>{
    if(id) handleSelectedActivity(id);
    else handleCancelSelectedActivity();
    setEditMode(true);
  }

  const handleCloseForm = () => {
    setEditMode(false);
  }

  return (  
    <>
    <CssBaseline />
    <NavBar openForm={handleOpenForm} ></NavBar>
    <Container maxWidth='xl' sx={{mt:3}}>
      <ActivityDashboard 
      activities={activities} 
      openForm={handleOpenForm}
      editMode={editMode}
      closeForm={handleCloseForm}
      selectedActivity={selectedActivity}
      selectActivity={handleSelectedActivity}
      cancelSelectedActivity={handleCancelSelectedActivity}>
      </ActivityDashboard>
    </Container>
    </>
  )
}

export default App
