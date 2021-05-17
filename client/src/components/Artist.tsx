import React, {useEffect} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
    SelectedArtist
} from "../../../src/routes/interfaces/artistsDeclarations";
import {Container, Grid, Paper} from "@material-ui/core";


const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        },

    })
);

export default function Artist({artist}:{artist:SelectedArtist}) {
    const classes = useStyles();


    return (
       <Grid style={{padding:20, margin:20}} className={classes.root} >
               <Container maxWidth="sm"  >
                   <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                       {artist.artistName}
                   </Typography>
                   <Typography variant="h5" align="center" color="textSecondary" paragraph>
                       {artist.albums.length} releases over {artist.activeYears} years
                   </Typography>
                       {/*<Grid container spacing={2} justify="center">*/}
                       {/*    <Grid item>*/}
                       {/*        <Button variant="contained" color="primary">*/}
                       {/*            Main call to action*/}
                       {/*        </Button>*/}
                       {/*    </Grid>*/}
                       {/*    <Grid item>*/}
                       {/*        <Button variant="outlined" color="primary">*/}
                       {/*            Secondary action*/}
                       {/*        </Button>*/}
                       {/*    </Grid>*/}
                       {/*</Grid>*/}
               </Container>

       </Grid>
    );
}