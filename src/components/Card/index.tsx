import Image from "next/image";

export type TrackProps = {
  artist: string;
  songUrl: string;
  title: string;
  image: {
    url: string;
    height: string;
    width: string;
  };
};

const Card = ({ track }: { track: TrackProps }) => {
  return (
    <div className="rounded-lg">
      <a
        href={track.songUrl}
        target="_blank"
        rel="noreferrer"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
      >
        <div className="overflow-hidden w-full rounded-md image-span-block">
          <Image
            src={track.image.url}
            className="rounded-md brightness-75 group-hover:brightness-100 transition-all duration-300 group-hover:scale-110"
            alt={`Album cover art for ${track.title} by ${track.artist}`}
            width={parseInt(track.image.width)}
            height={parseInt(track.image.height)}
          />
        </div>
        <div className="pt-4 ">
          <span className="font-bold">{track.title.substring(0, 20)} </span>
          <span className="text-neutral-700 dark:text-neutral-400 block">
            • {track.artist.substring(0, 20)}
          </span>
        </div>
      </a>
    </div>
  );
};

export default Card;
