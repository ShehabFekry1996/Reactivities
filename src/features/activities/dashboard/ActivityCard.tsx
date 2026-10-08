import { AccessTime, Place } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, Typography } from "@mui/material";
import { Link } from "react-router";
import { formatDate } from "../../../lib/util/util";
import type { Activity } from "../../../lib/types";
import AvatarPopover from "../../profiles/AvatarPopover";

type Props = {
  activity: Activity;
};

export default function ActivityCard({activity}: Props) {
    const label = activity.isHost ? 'You are hosting' : 'You are going';
    const color = activity.isHost ? 'secondary' : activity.isGoing ? 'warning' : 'default'
  return (
    <Card elevation={3}>
        <Box sx={{display:'flex', alignItems:'center',justifyContent:'space-between'}}>
            <CardHeader 
            avatar={<Avatar sx={{height:80,width:80}}></Avatar>} 
            title={activity.title} 
            slotProps={{fontWeight:'bold',fontSize:20}}
            subheader={
                <>
                Hosted by {' '} <Link to={`/profiles/${activity.hostId}`}>{activity.hostDisplayName}</Link>
                </>
            }
            >
            </CardHeader>
            <Box sx={{display:'flex', flexDirection:'column',  gap:2}}>
                {(activity.isHost || activity.isGoing) && <Chip variant="outlined" sx={{mr:2,borderRadius:2}} label={label} color={color}></Chip>}
                {activity.isCancelled && <Chip label='Cancelled' color='error'></Chip>} 
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
          <Box sx={{display:'flex' ,gap:2, backgroundColor:'grey.200',py:3,pl:3}}>
            {activity.attendees.map(att=>(
              <AvatarPopover profile={att} key={att.id}></AvatarPopover>

            ))}
            </Box>
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
