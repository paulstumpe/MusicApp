// import React from 'react';
// // import ReactDom from 'react-dom';
// import {Card, CardContent, CardHeader, CardMedia, Typography} from '@material-ui/core';
//
// function ArtistBackground() {
//     const classes = useStyles();
//     const [expanded, setExpanded] = React.useState(false);
//
//     const handleExpandClick = () => {
//         setExpanded(!expanded);
//     };
//     return (
//         <div>
//             xd
//             <Card className={classes.root} variant="outlined">
//                 {/*<CardMedia></CardMedia>*/}
//                 <CardHeader
//                 title="title"
//
//                 />
//                 <CardContent>
//                     <Typography>
//                         Hello
//                     </Typography>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }
//
// export default ArtistBackground;



import React, {useEffect} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from "@material-ui/core/CardHeader";
import { red } from '@material-ui/core/colors';
import {ArtistObject} from "../../../src/routes/interfaces/artistsDeclarations";
import axios from "axios";


const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root: {
            maxWidth: 345,
        },
        // media: {
        //     height: 140,
        // },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
    })
);

export default function Albums({selectedArtist}:{selectedArtist:ArtistObject}) {
    const classes = useStyles();


    return (
        <Card className={classes.root}>
            <CardHeader
                title="Shrimp and Chorizo Paella"
            />
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={selectedArtist.artworkUrl100}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}