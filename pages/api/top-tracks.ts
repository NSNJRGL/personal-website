import { getTopTracks } from "src/lib/spotify";
import type { NextApiRequest, NextApiResponse } from "next";

const getTopTracksApi = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  // const response = await getTopTracks();
  // const { items } = await response.json();

  // const tracks = items.slice(0, 12).map((track: any) => ({
  //   artist: track.artists.map((_artist: any) => _artist.name).join(", "),
  //   songUrl: track.external_urls.spotify,
  //   title: track.name,
  //   image: track.album.images[1],
  // }));

  // return res.status(200).json({ tracks });
  res.status(200).json({ name: "John Doe" });
};

export default getTopTracksApi;
