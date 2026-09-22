import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"

type Props={
    activity:Activity
    cancelSelectedActivity: () => void
}


export default function ActivityDetails({activity, cancelSelectedActivity}:Props) {
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
            <Button color='primary'>Edit</Button>
            <Button color='inherit' onClick={cancelSelectedActivity}>
                Cancel
            </Button>
        </CardActions>
      </Card>
    </div>
  )
}
