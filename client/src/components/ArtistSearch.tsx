import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {Autocomplete} from "@material-ui/lab"
import {useEffect, useState} from "react";
import axios from "axios";
import {
    AutoCompleteArtist,
    SearchArtistResponse
} from "../../../src/routes/interfaces/artistsDeclarations";


export default function ArtistSearch({getArtist, tooltip}:any){
    let [searchString, setSearchString]= useState('');
    let [autoCompleteArray, setAutocompleteArray] = useState<AutoCompleteArtist[]>([])
    let [loading, setLoading] = useState(false)
    const getAutoCompleteArray = async ()=>{
        setLoading(true);
        const {data}:{data:AutoCompleteArtist[]}  = await axios.get('api/users/artistAutoComplete/',{
            params:{
                searchString:searchString,
            }
        })
        setLoading(false);
        console.log(data);
        setAutocompleteArray(data);
    }
    useEffect(()=>{
        if(searchString.length){
            getAutoCompleteArray();
        }

    }, [searchString])

let setSelectedArtist=(value:string)=>{
    debugger;
        getArtist(value)
}

console.log(autoCompleteArray)
    return (

            <div style={{ width: 300, marginLeft:20, padding:20,}} >
            <div style={{ width: 300, marginLeft:20,
                paddingRight:8,
                paddingLeft:8,
                paddingBottom:8,
                backgroundColor:"white"}} >
                <Autocomplete
                    // style={{ backgroundColor:'white' }}
                    freeSolo
                    id="free-solo-2-demo"
                              // open={true}
                    disableClearable
                              onChange={(e, value)=>{
                                  // console.log(e.target.value);
                                  // setSearchString(e.target.value)
                                  console.log(value)
                                  setSelectedArtist(value)
                                  console.log(e)
                              }}
                    options={autoCompleteArray.map((artist)=>{return artist.artistName})}
                      loading={loading}
                              filterOptions={(options, state) => options}

                    renderInput={(params) => (
                        <TextField style={{ backgroundColor:'white' }}
                            {...params}
                            label={tooltip}
                            margin="normal"
                            variant="outlined"
                            InputProps={{ ...params.InputProps, type: 'search' }}
                            onChange={(e)=>{
                                console.log(e.target.value);
                                setSearchString(e.target.value)
                            }}
                        />
                    )}
                />
            </div>
            </div>

)
}