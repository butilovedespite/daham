const OFFICE_ADDRESS = "경기도 수원시 팔달구 권광로207번길 36";

// https://maps.app.goo.gl/aNJzY3pZv5st9vUw5
const GOOGLE_MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3178.7483621875!2d127.0315228!3d37.2667326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b435b0f58d24d%3A0xe8000ad27b7747a6!2z6rK966GcIOyeheuPhOyLnCDqtJzssrTrj5kg6rSR6ri464uI67WI6rOg7YjN66GcIDM2!5e0!3m2!1sko!2skr!4v1740441600000!5m2!1sko!2skr";

type GoogleMapProps = {
  className?: string;
};

export default function GoogleMap({ className }: GoogleMapProps) {
  return (
    <iframe
      className={["google-map-embed", className].filter(Boolean).join(" ")}
      src={GOOGLE_MAP_EMBED_SRC}
      title={`다함 건축사사무소 위치 - ${OFFICE_ADDRESS}`}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
