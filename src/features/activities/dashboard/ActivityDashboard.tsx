import { Grid} from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../details/form/ActivityForm";

type Props = {
  activities: Activity[];
  selectActivity: (id: string) => void;
  cancelSelectedActivity: () => void;
  selectedActivity?: Activity;
  openForm: (id: string) => void;
  submitForm: (activity: Activity) => void;
  closeForm: () => void;
  editMode: boolean;
  deleteActivity : (id: string) => void;
};



export default function ActivityDashboard({ activities, selectedActivity, selectActivity, cancelSelectedActivity, openForm, closeForm, editMode, submitForm, deleteActivity }: Props ) {
  return (
    <Grid container spacing={3} >
        <Grid size={7}>
          <ActivityList deleteActivity={deleteActivity} activities={activities} selectActivity={selectActivity}></ActivityList>
        </Grid>
         <Grid size={5}>
          {selectedActivity && !editMode &&
          <ActivityDetails activity={selectedActivity} cancelSelectedActivity={cancelSelectedActivity} openForm={openForm}>
            </ActivityDetails>}
          {editMode &&
            <ActivityForm submitForm={submitForm} closeForm={closeForm} activity={selectedActivity}/>
          }
        </Grid>
    </Grid>
      
  )
}


