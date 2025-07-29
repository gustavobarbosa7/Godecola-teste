import "./CarouselPackageDetails.css";
import Box from "@mui/joy/Box";
import { forwardRef } from "react";

const getYouTubeVideoId = (url) => {
  try {
    const regex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};

const CarouselPackageDetails = forwardRef(({ packageData }, ref) => {
  if (!packageData.mediasUrl || packageData.mediasUrl.length === 0) {
    return (
      <div className="PackageMediaNotFound">
        Nenhuma mídia associada a este pacote!
      </div>
    );
  }

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        overflowX: "auto",
        width: "100%",
        scrollSnapType: "x mandatory",
        "& > *": {
          scrollSnapAlign: "start",
          flexShrink: 0,
          minWidth: "100%",
        },
        "::-webkit-scrollbar": { display: "none" },
      }}
    >
      {packageData.mediasUrl.map((media, index) => (
        <div key={index} className="carousel-media-item">
          {media.mediaType === "imagem" ? (
            <img
              src={media.mediaUrl}
              alt={`${packageData.title} - Mídia ${index + 1}`}
              style={{
                width: "100%",
                maxHeight: "700px",
                objectFit: "cover",
                flexShrink: 0,
              }}
              loading="lazy"
            />
          ) : media.mediaType === "video" ? (
            (() => {
              const videoId = getYouTubeVideoId(media.mediaUrl);
              if (!videoId) {
                return (
                  <div className="PackageMediaNotFound">
                    Vídeo do YouTube inválido
                  </div>
                );
              }
              return (
                <iframe
                  width="100%"
                  height="700"
                  src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                  title={`${packageData.title} - Vídeo ${index + 1}`}
                  className="youtube-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                  frameborder="0"
                />
              );
            })()
          ) : (
            <div className="PackageMediaNotFound">Mídia não suportada</div>
          )}
        </div>
      ))}
    </Box>
  );
});

export default CarouselPackageDetails;
