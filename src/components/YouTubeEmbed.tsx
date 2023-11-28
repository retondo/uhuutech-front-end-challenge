type YouTubeEmbedProps = {
  srcKey: string;
};

export default function YouTubeEmbed({ srcKey }: YouTubeEmbedProps) {
  return srcKey ? (
    <iframe
      className="max-h-[182px] min-h-[182px] min-w-[324px] max-w-[324px] md:max-h-[243px] md:min-h-[243px] md:min-w-[433px] md:max-w-[433px] lg:max-h-[510px] lg:min-h-[510px] lg:min-w-[907px] lg:max-w-[907px]"
      src={`https://www.youtube.com/embed/${srcKey}`}
      allowFullScreen
    ></iframe>
  ) : null;
}
