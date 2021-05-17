import StatusCodes from 'http-status-codes';
import {json, Request, Response} from 'express';
import axios from "axios";
import {
    SearchObject,
    PossibleArtists,
    ArtistObject,
    SelectedArtist, AlbumResult, SearchArtistResponse, ArtistResult
} from "./interfaces/artistsDeclarations";
import {isString} from "util";

interface artistResult {
    wrapperType: string,
    amgArtistId: number,
    primaryGenreName: string
}
interface ArtistAlbumSearch {
    results: [ArtistResult|AlbumResult]
}



const { BAD_REQUEST, CREATED, OK } = StatusCodes;

/**
 * Delete one user.
 *
 * @param req
 * @param res
 * @returns
 */

export async function searchArtist(req: Request, res: Response) {
    let { searchString } = req.query;
    console.log(searchString);
    if(typeof searchString !=='string'){
        searchString = 'jack johnson'
    }
    const itunesJson  = await axios.get('https://itunes.apple.com/search',{
        params: {
            term:searchString.split(' ').join('+')
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
                    artworkUrl100,
                    searchCount:1,
                    artistViewUrl,

                }
            } else {
                possibleArtists[id].searchCount++;
            }
        }
    })

    let mostResults: ArtistObject|null = null;
    for (let artistId in possibleArtists) {
        let currentArtist = possibleArtists[artistId];
        if(mostResults===null){
            mostResults = currentArtist;
        } else if(currentArtist.searchCount > mostResults.searchCount) {
            mostResults = currentArtist;
        }
    }

    let selectedArtist:SelectedArtist|null = null;
    if(mostResults){
        delete results[mostResults.artistId];
        const {data} = await axios.get<ArtistAlbumSearch>('https://itunes.apple.com/lookup', {params:{
                id:mostResults.artistId,
                entity:'album'
            }})
        // console.log(data);
        // console.log(data.results[0])
        const albums:AlbumResult[] = [];
        let artistData = null;
        data.results.forEach(result=>{
            if(result.wrapperType === 'collection'){
                // @ts-ignore
                albums.push(result);
            } else if (result.wrapperType==='artist'){
                // @ts-ignore
                selectedArtist = {
                    ...mostResults,
                    amgArtistId:result.amgArtistId,
                    primaryGenreName:result.primaryGenreName,
                    albums: []
                }
            }
        })
        if(selectedArtist){
            // @ts-ignore
            selectedArtist.albums =albums;
        }
    }
    console.log(selectedArtist)
    return res.status(OK)
        .end(JSON.stringify({
            selectedArtist,
            results
        }));
}