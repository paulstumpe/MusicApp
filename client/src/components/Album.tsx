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
import {AlbumResult, ArtistObject} from "../../../src/routes/interfaces/artistsDeclarations";
import axios from "axios";
import {Container, Grid} from "@material-ui/core";
import moment from "moment";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root: {
            maxWidth: 345,
            padding: theme.spacing(2),
            backgroundColor: '#5AA9E3'
            // margin: 20,
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
        otherBackground:{
            backgroundColor: '#5aa9e3'
        }
    })
);

export default function Album({album}:{album:AlbumResult}) {
    const classes = useStyles();


    return (
        <Grid item xs={6} sm={3}  >

            <Card raised={true} style={{backgroundColor: "#D2E2F3", padding:0}} className={classes.root}>
                <CardContent  style={{backgroundColor:'#e4e7f5', paddingLeft:5, paddingRight:5, paddingBottom:0, paddingTop:0}}>
                    <Paper  elevation={0} style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                        paddingRight: 0,
                        paddingLeft: 0,
                        backgroundColor:'#eaecf5'
                    }}>
                        <Typography variant="h6" >
                            <div
                                style={{
                            //     padding:10,
                            //             display: '-webkit-flex',
                                        maxHeight: 64,
                                        minHeight: 64,
                            //             // whiteSpace: "nowrap",
                            //             // lineClamp: 2,
                            //                 WebkitBoxOrient: "vertical",
                            //             WebkitLineClamp:2,
                            //             overflow: 'hidden',
                            //             width:'calc(100%)',
                            //             textOverflow: 'ellipsis',
                                // display: 'inline-block',
                                    maxWidth: '100%',
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',

                                }}
                            >
                                {album.collectionName}

                            </div>
                        </Typography>
                    </Paper>
                </CardContent>
                <CardActionArea style={{
                    backgroundColor:'#e4e7f5',
                }}>
                    <CardMedia
                        className={classes.media}
                        image={album.artworkUrl100}
                        title="Contemplative Reptile"
                    />
                    <CardContent style={{
                        backgroundColor:'#e4e7f5',
                    }}>

                        <Typography gutterBottom variant="subtitle2"   style={{
                            maxHeight: 96,
                            minHeight: 96,
                        }}>
                            {album.collectionName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            release date: {moment(album.releaseDate).calendar()}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            trackCount: {album.trackCount}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Genre: {album.primaryGenreName}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions style={{                        backgroundColor:'#e4e7f5',
                }}>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </Grid>

    );
}