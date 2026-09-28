import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { Link, useNavigate, useParams } from "react-router";
import { useActivities } from "../../../lib/types/hooks/useActivities";


export default function ActivityDetails() {

  const navigate = useNavigate()
  const {id} = useParams();
  const {activity,isLoadingActivity} = useActivities(id);
  if(isLoadingActivity)
    return <Typography>Loading ...</Typography>
  if(!activity) 
    return <Typography>Loading ...</Typography>
  return (
    <div>
      <Card>
        <CardMedia
          component="img"
          height="140"
          src={`/images/categoryImages/${activity.category}.jpg`}
          alt={activity.title}
        />
        <CardContent>
            <Typography variant="h5">{activity.title}</Typography>
            <Typography variant="subtitle1">
                {activity.date}
            </Typography>
             <Typography variant="body1">
                {activity.description}
            </Typography>
        </CardContent>
        <CardActions>
            <Button component={Link} to={`/manage/${activity.id}`} color='primary'>
                Edit
            </Button>
            <Button color='inherit' onClick={() => navigate('/activities')}>
                Cancel
            </Button>
        </CardActions>
      </Card>
    </div>
  )
}
