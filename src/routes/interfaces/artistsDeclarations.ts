
export interface SearchObject {
    kind: string,
    collectionArtistId: number,
    artistName: string,
    artistId: number,
    collectionName: string,
    artworkUrl100?: string,
    viewUrl: string,
    artistViewUrl?:string,
}
export interface ArtistObject extends Omit<SearchObject,
    'kind'|
    'collectionArtistId'|
    'collectionName'|
    'viewUrl'
    >{
    searchCount:number,

}
export interface PossibleArtists {
    [Key:number]: ArtistObject
}

export interface SelectedArtist extends ArtistObject{
    amgArtistId:number,
    primaryGenreName: string,
    activeYears: number,
    albums: AlbumResult[]
}
export interface SearchArtistResponse {
    selectedArtist?: SelectedArtist,
    results: PossibleArtists,
}

export interface AlbumResult {
    "wrapperType":string,
    "collectionType":"Album",
    "artistId":number,
    "collectionId":number,
    "amgArtistId":number,
    "artistName":string,
    "collectionName":string,
    "collectionCensoredName":string,
    "artistViewUrl":string,
    "collectionViewUrl":string,
    "artworkUrl60":string,
    "artworkUrl100":string,
    "collectionPrice":number,
    "collectionExplicitness":string,
    "trackCount":number,
    "copyright":string,
    "country":string,
    "currency":string,
    "releaseDate":string,
    "primaryGenreName":string
}
export interface ArtistResult {
    wrapperType: string,
    amgArtistId: number,
    primaryGenreName: string
}

export interface AutoCompleteArtist {
    artistName:string
    artistId: number
    searchCount:number
}