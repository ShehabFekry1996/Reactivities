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
  closeForm: () => void;
  editMode: boolean;
};



export default function ActivityDashboard({activities, selectedActivity, selectActivity, cancelSelectedActivity, openForm, closeForm, editMode}: Props ) {
  return (
    <Grid container spacing={3} >
        <Grid size={7}>
          <ActivityList activities={activities} selectActivity={selectActivity}></ActivityList>
        </Grid>
         <Grid size={5}>
          {selectedActivity && !editMode &&
          <ActivityDetails activity={selectedActivity} cancelSelectedActivity={cancelSelectedActivity} openForm={openForm}>
            </ActivityDetails>}
          {editMode &&
            <ActivityForm closeForm={closeForm} activity={selectedActivity}/>
        </Grid>
    </Grid>
      
  )
}


