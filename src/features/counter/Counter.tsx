import { Button, ButtonGroup, Typography } from "@mui/material";
import { useStore } from "../../lib/stores/useStore"
import {Observer} from 'mobx-react-lite'

export default function Counter() {

    const{counterStore} = useStore();
  return (

    <>
     <Observer>
        {() => (
            <>
                <Typography variant="h4" gutterBottom>{counterStore.title}</Typography>
                <Typography variant="h6">The count is {counterStore.count}</Typography>
            </>
        )

        }
    </Observer>
    <ButtonGroup sx={{mt:3}}>
        <Button variant="contained" color='error' onClick={()=>counterStore.decrement()}>Decrement</Button>
        <Button variant="contained" color='success' onClick={()=>counterStore.increment()}>Increment</Button>
        <Button variant="contained" color='primary' onClick={()=>counterStore.increment(5)}>Increment by 5</Button>
    </ButtonGroup>
    </>
   
  )
}
