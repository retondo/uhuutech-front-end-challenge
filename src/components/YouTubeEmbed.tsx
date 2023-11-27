type YouTubeEmbedProps = {
  srcKey: string;
};

export default function YouTubeEmbed({ srcKey }: YouTubeEmbedProps) {
  return srcKey ? (
    <iframe
      className="min-w-[907px] max-w-[907px]"
      // width="907"
      // height="510"
      src={`https://www.youtube.com/embed/${srcKey}`}
    ></iframe>
  ) : null;
}
