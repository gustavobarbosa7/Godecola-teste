import './CarouselPackageDetails.css'
import Box from "@mui/joy/Box";
import { forwardRef } from "react";

const CarouselPackageDetails = forwardRef(({ packageData }, ref) => {

    if (!packageData.galleryImages || packageData.galleryImages.length === 0) {
        return (
            <div className='PackageImagesNotFound'>Nenhuma imagem associada a este pacote!</div>
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
            <iframe width="100%" maxHeight="700" src="https://www.youtube.com/embed/4Du8kIqGK1k?si=KS38o8QPJRsE67ev&amp;start=4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            
            {packageData.galleryImages.map((imageUrl, index) => (
                <img
                    key={index}
                    src={imageUrl}
                    alt={packageData.title}
                    style={{
                        width: "100%",
                        maxHeight: "700px",
                        objectFit: "cover",
                        flexShrink: 0,
                    }}
                />
            ))}
        </Box>
    );
});

export default CarouselPackageDetails;
