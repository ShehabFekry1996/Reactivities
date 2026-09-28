import { AccessTime, Place } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material";
import { Link } from "react-router";
import { formatDate } from "../../../lib/util/util";

type Props = {
  activity: Activity;
};

export default function ActivityCard({activity}: Props) {
    const isHost = false;
    const isGoing = false;
    const label = isHost ? 'You are hosting' : 'You are going';
    const isCancelled = false;
    const color = isHost ? 'secondary' : isGoing ? 'warning' : 'default'
  return (
    <Card elevation={3}>
        <Box sx={{display:'flex', alignItems:'center',justifyContent:'space-between'}}>
            <CardHeader 
            avatar={<Avatar sx={{height:80,width:80}}></Avatar>} 
            title={activity.title} 
            titleTypographyProps={{fontWeight:'bold',fontSize:20}}
            subheader={
                <>
                Hosted by {' '} <Link to={`/profiles/bob`}>Bob</Link>
                </>
            }
            >
            </CardHeader>
            <Box sx={{display:'flex', flexDirection:'column',  gap:2}}>
                {(isHost || isGoing) && <Chip label={label} color={color}></Chip>}
                {isCancelled && <Chip label='Cancelled' color='error'></Chip>} 
            </Box>
        </Box>

        <Divider sx={{mb:3}}></Divider>
        <CardContent sx={{p:0}}>
          <Box sx={{display:'flex',alignItems:'center',mb:2,px:2}}>
            <Box sx={{display:'flex',alignItems:'center'}}>
  <AccessTime sx={{mr:1}}></AccessTime>
            <Typography noWrap variant='body2'>{formatDate(activity.date)}</Typography>
            </Box>
          
            <Place sx={{ml:3,mr:1}}></Place>
            <Typography variant="body2">{activity.venue}</Typography>
          </Box>
          <Divider></Divider>
          <Box sx={{display:'flex' ,gap:2, backgroundColor:'grey.200',py:3,pl:3}}>Attendees go here</Box>
        </CardContent>
        <CardContent sx={{pb:2}}>
            <Typography variant="body2">{activity.description}</Typography>
                <Button component={Link} to={`/activities/${activity.id}`} sx={{display:'flex',justifySelf:'self-end'}} size="medium" variant="contained" onClick={() => {}}>
                View
            </Button>
        </CardContent>

    </Card>
  )
}
