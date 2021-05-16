import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import axios from "axios";
import { paramMissingError } from '@shared/constants';

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

/**
 * Delete one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function searchArtist(req: Request, res: Response) {
    const { searchString } = req.params;
    const itunesJson = await axios.get('https://itunes.apple.com/search',{
        params: {
            term:"jack+johnson"
        }
    })

    return res.status(OK)
        .end();
}
