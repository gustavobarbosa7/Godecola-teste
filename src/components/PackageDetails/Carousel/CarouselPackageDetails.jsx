import "./CarouselPackageDetails.css";
import Box from "@mui/joy/Box";
import { forwardRef } from "react";
import { baseURLMedias } from "../../../utils/baseURL";

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
          flex: "0 0 100%",
        },
        "::-webkit-scrollbar": { display: "none" },
      }}
    >
      {packageData.mediasUrl.map((media, index) => (
        <div key={index} style={{ overflow: "hidden" }}>
          {media.mediaType === "imagem" ? (
            <img
              src={`${baseURLMedias}${media.filePath}`}
              alt={`${packageData.title} - Mídia ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                maxHeight: "750px",
                maxWidth: "1500px",
              }}
              loading="lazy"
            />
          ) : media.mediaType === "video" ? (
            <video
              width="100%"
              height="100%"
              maxHeight="750px"
              maxWidth="1500px"
              className="local-video"
              controls
              muted
              autoPlay
              playsInline
              style={{ objectFit: "cover" }}
            >
              <source
                src={`${baseURLMedias}${media.filePath}`}
                type={media.mimeType}
              />
            </video>
          ) : (
            <div className="PackageMediaNotFound">Mídia não suportada</div>
          )}
        </div>
      ))}
    </Box>
  );
});

export default CarouselPackageDetails;
