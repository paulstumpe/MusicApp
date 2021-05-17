import React, {useEffect, useState} from 'react';
import './App.css';
import ArtistBackground from "./components/Albums";
import axios, {AxiosResponse} from "axios";
import {
    SearchArtistResponse,
    ArtistObject,
    SelectedArtist
} from "../../src/routes/interfaces/artistsDeclarations";
import Albums from "./components/Albums";
import Album from "./components/Album";
import Artist from "./components/Artist";
import {Container, FormControlLabel, Grid, Paper, Switch} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {blue, red} from "@material-ui/core/colors";
import {Timeline} from "@material-ui/lab";
import AlbumTimeLine from "./components/AlbumTimeLine";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArtistSearch from "./components/ArtistSearch";
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root: {
            backgroundColor: '#5AA9E3',
        },
        ablumsGrid:{
            marginTop:10,
            marginBottom:10,
            backgroundColor: '#5AA9E3'

        },
        otherBackground:{
            backgroundColor: '#5AA9E3'
        }
    })
);

function App() {
    const classes = useStyles();
    let [selectedArtist , setSelectedArtist ]=useState<SelectedArtist>({
        artistName: 'Jack Johnson',
        artistId: 909253,
        artworkUrl100: 'https://is3-ssl.mzstatic.com/image/thumb/Music124/v4/b1/1d/2e/b11d2e7d-398b-2e7e-4847-1032d0ebad6a/source/100x100bb.jpg',
        searchCount: 30,
        artistViewUrl: 'https://music.apple.com/us/artist/jack-johnson/909253?uo=4',
        amgArtistId: 468749,
        primaryGenreName: 'Rock',
        albums:[],
        activeYears:10
    })
    const [timeLineOn, setTimeLineOn] = useState(false);

    const getArtist= async  (searchString:string)=>{
        console.log('called getartist')
        const {data}:{data:SearchArtistResponse}  = await axios.get('api/users/artist',{
            params:{
                searchString
            }
        })
        if(data.selectedArtist){
            setSelectedArtist(data.selectedArtist);
        } else {
            alert('artist not found')
        }
    }
    useEffect( ()=>{
        getArtist('daft punk')
    },[])


  return (
    <div className="App" >
        <div className={classes.root}>
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Music App
                    </Typography>
                    <ArtistSearch getArtist={getArtist} tooltip={"Search your favorite artist"} />

                        <Paper style={{
                            marginLeft:50,
                            width: 150,
                            padding: 10
                        }}>
                            <FormControlLabel
                                control={<Switch
                                    checked={timeLineOn}
                                    onChange={e=>setTimeLineOn(!timeLineOn)}
                                    name="checkedA" />}
                                label="TimeLine"
                            />
                        </Paper>
                </Toolbar>
            </AppBar>
            <Artist artist={selectedArtist}></Artist>
            <div>

            </div>



            {!timeLineOn && <Container className={classes.otherBackground}>
                <Grid className={classes.otherBackground} container alignItems={"stretch"}
                      spacing={3}>
                    {selectedArtist.albums.map(album => (<Album album={album}/>))}
                </Grid>
            </Container>}

            <Container>
                <div style={{height:10}}></div>
            </Container>
            {timeLineOn && <AlbumTimeLine artist={selectedArtist}></AlbumTimeLine>}
        </div>
    </div>
  );
}

export default App;


