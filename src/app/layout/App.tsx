import { Container, CssBaseline, Typography } from '@mui/material';
import {  useState } from 'react'
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { useActivities } from '../../lib/types/hooks/useActivities';

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const {activities, isPending } = useActivities();



  const handleSelectedActivity = (id: string) => {
    setSelectedActivity(activities!.find(a => a.id === id));
  }

  const handleCancelSelectedActivity = () => {
    setSelectedActivity(undefined);
  }

  const handleOpenForm = (id?: string) => {
    if (id) handleSelectedActivity(id);
    else handleCancelSelectedActivity();
    setEditMode(true);
  }

  const handleCloseForm = () => {
    setEditMode(false);
  }

  const handleDeleteActivity = (id: string) => {
    console.log('Deleting activity with id:', id);
  }

  const handleSubmitForm = (activity: Activity) => {
    // if (activity.id) {
    //   setActivities(activities.map(x => x.id === activity.id ? activity : x));
    //   setSelectedActivity(activity);
    // } else {
    //   const newActivity = { ...activity, id: activities.length.toString() };
    //   setActivities([...activities, newActivity]);
    //   setSelectedActivity(newActivity);
    // }
    console.log('Submitting activity:', activity);
    setEditMode(false);
  }

  return (
    <>
      <CssBaseline />
      <NavBar openForm={handleOpenForm}></NavBar>
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        {!activities || isPending ? (
          <Typography>Loading activities...</Typography>
        ) : (
          <ActivityDashboard
            activities={activities}
            openForm={handleOpenForm}
            editMode={editMode}
            closeForm={handleCloseForm}
          submitForm={handleSubmitForm}
          deleteActivity={handleDeleteActivity}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectedActivity}
          cancelSelectedActivity={handleCancelSelectedActivity}>
        </ActivityDashboard>)}
      </Container>
    </>
  )
}

export default App