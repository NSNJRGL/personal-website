import { getTopTracks } from "src/lib/spotify";

const getTopTracksApi = async (_: any, res: any) => {
  const response = await getTopTracks();
  const { items } = await response.json();

  const tracks = items.slice(0, 12).map((track: any) => ({
    artist: track.artists.map((_artist: any) => _artist.name).join(", "),
    songUrl: track.external_urls.spotify,
    title: track.name,
    image: track.album.images[1],
  }));

  return res.status(200).json({ tracks });
};

export default getTopTracksApi;
