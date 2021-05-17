import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
    SearchArtistResponse,
    SelectedArtist
} from "../../../src/routes/interfaces/artistsDeclarations";
import {Avatar, Container, Grid, Paper} from "@material-ui/core";
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineDot from '@material-ui/lab/TimelineDot'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from  '@material-ui/lab/TimelineContent'
import Icon from '@material-ui/core/Icon'
import ArtistSearch from "./ArtistSearch";
import moment from "moment";
import axios from "axios";
import {red} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
}));
export default function AlbumTimeLine({artist}:{artist:SelectedArtist}) {
    const classes = useStyles();
    const [otherArtist, setOtherArtist] =useState<SelectedArtist>({
        artistName: 'Select An Artist',
        artistId: 909253,
        artworkUrl100: 'https://is3-ssl.mzstatic.com/image/thumb/Music124/v4/b1/1d/2e/b11d2e7d-398b-2e7e-4847-1032d0ebad6a/source/100x100bb.jpg',
        searchCount: 30,
        artistViewUrl: 'https://music.apple.com/us/artist/jack-johnson/909253?uo=4',
        amgArtistId: 468749,
        primaryGenreName: 'Rock',
        albums:[],
        activeYears:10
    })
    const getOtherArtist = async  (searchString:string)=>{
        console.log('called getartist')
        const {data}:{data:SearchArtistResponse}  = await axios.get('api/users/artist',{
            params:{
                searchString
            }
        })
        if(data.selectedArtist){
            setOtherArtist(data.selectedArtist);
        } else {
            alert('artist not found')
        }
    }
    const otherArtistArray = otherArtist.albums.map(album=> {
        return  {
            ...album,
            fromArtist: otherArtist
        }
    })
    const artistsArray = artist.albums.map(album=> {
        return  {
            ...album,
            fromArtist: artist
        }
    })
    let timeLineArray = otherArtistArray.concat(artistsArray).sort((a,b)=>{
        // @ts-ignore
        return new Date(b.releaseDate)- new Date(a.releaseDate)
    })
    console.log(otherArtistArray)
    console.log(artistsArray)
    console.log(timeLineArray)
    debugger;

    useEffect(()=>{

    },[artist, otherArtist, timeLineArray])
    return (

            <Container maxWidth="sm"  >
                <ArtistSearch  tooltip={'Compare to another Artist!'} getArtist={getOtherArtist}></ArtistSearch>
                <Timeline >
                <TimelineItem>

                        <TimelineOppositeContent>
                            <Paper elevation={3} className={classes.paper}>
                                <Typography variant="h6" component="h1">
                                    {otherArtist.artistName}
                                </Typography>
                            </Paper>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot color="primary">
                                <Avatar style={{width:100, height:100, backgroundColor: '#3f51b5'}} >VS</Avatar>
                                {/*<Avatar alt="Cindy Baker" src={album.artworkUrl100} style={{width:100, height:100}} />*/}
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Paper elevation={3} className={classes.paper}>
                                <Typography variant="h6" component="h1">
                                    {artist.artistName}
                                </Typography>
                            </Paper>
                        </TimelineContent>
                </TimelineItem>

                    {timeLineArray.map(album=>{
                        return <TimelineItem>
                                <TimelineOppositeContent>
                                    {album.fromArtist.artistId === artist.artistId ?
                                        (
                                            <Typography variant="body2" color="textSecondary">
                                                {moment(album.releaseDate).calendar()}
                                            </Typography>
                                        ) : (
                                            <Paper elevation={3} className={classes.paper}>
                                                <Typography variant="body2" component="h1"
                                                            style={{
                                                                //     padding:10,
                                                                //             display: '-webkit-flex',
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
                                                                WebkitLineClamp: 3,
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',

                                                            }}
                                                >
                                                    {album.collectionName}
                                                </Typography>
                                                <Typography>{album.fromArtist.artistName}</Typography>
                                            </Paper>
                                        )
                                    }

                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot color="primary">
                                        {/*<Icon />*/}
                                        <Avatar alt="Cindy Baker" src={album.artworkUrl100} style={{width:100, height:100}} />
                                    </TimelineDot>
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>
                                    {album.fromArtist.artistId === artist.artistId ?
                                        (
                                            <Paper elevation={3} className={classes.paper}>
                                                <Typography variant="body2" component="h1"
                                                            style={{
                                                                //     padding:10,
                                                                //             display: '-webkit-flex',
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
                                                                WebkitLineClamp: 4,
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',

                                                            }}
                                                >
                                                    {album.collectionName}
                                                </Typography>
                                                <Typography>{album.fromArtist.artistName}</Typography>
                                            </Paper>
                                        ) : (
                                            <Typography variant="body2" color="textSecondary">
                                                {moment(album.releaseDate).calendar()}
                                            </Typography>

                                        )
                                    }
                                </TimelineContent>
                            </TimelineItem>

                    })}
                </Timeline>
            </Container>

    );
}
