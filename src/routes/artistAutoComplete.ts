import StatusCodes from 'http-status-codes';
import {json, Request, Response} from 'express';
import axios from "axios";
import {
    SearchObject,
    PossibleArtists,
    ArtistObject,
    SelectedArtist, AlbumResult, SearchArtistResponse, ArtistResult, AutoCompleteArtist
} from "./interfaces/artistsDeclarations";




const { BAD_REQUEST, CREATED, OK } = StatusCodes;

/**
 * Delete one user.
 *
 * @param req
 * @param res
 * @returns
 */

export async function artistAutoComplete(req: Request, res: Response) {
    const { searchString } = req.query;
    console.log(searchString)
    const itunesJson  = await axios.get('https://itunes.apple.com/search',{
        params: {
            term:searchString
        }
    })
    const results: [SearchObject] = itunesJson.data.results;
    const possibleArtists: PossibleArtists = {};
    results.forEach((element)=> {
        if(element.kind === 'song'){
            let {artistName, artistId, artistViewUrl, artworkUrl100} = element;
            let id = element.artistId;
            if(!possibleArtists[id]){
                possibleArtists[id] = {
                    artistName,
                    artistId,
                    searchCount:1,
                }
            } else {
                possibleArtists[id].searchCount++;
            }
        }
    })
    // console.log(possibleArtists)
    let searchOptions:AutoCompleteArtist[] = [];
    for (let possibleArtistsKey in possibleArtists) {
        searchOptions.push(possibleArtists[possibleArtistsKey])
    }
    searchOptions = searchOptions.sort((possibleArtistA,possibleArtistB)=> {
        if (possibleArtistA.searchCount > possibleArtistB.searchCount) {
            return 1;
        } else if (possibleArtistA.searchCount > possibleArtistB.searchCount) {
            return -1;
        }
        return 0;
    })
    debugger;
    return res.status(OK)
        .end(JSON.stringify(searchOptions));
}