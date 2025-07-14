import Box from "@mui/joy/Box";
import { PackageCard } from "../PackageCard/PackageCard";
import { forwardRef } from "react";
import './CarouselHome.css'

const Carousel = forwardRef(({ packages }, ref) => {
    if (!packages || packages.length === 0) {
        return (
            <Box sx={{ p: 2, textAlign: "center" }}>Nenhum pacote para exibir.</Box>
        );
    }

    return (
        <Box
            ref={ref}
            sx={{
                display: "flex",
                gap: 4,
                py: 2,
                overflowX: "auto",
                width: "100%",
                scrollSnapType: "x mandatory",
                "& > *": {
                    scrollSnapAlign: "center",
                    flexShrink: 0,
                },
                "::-webkit-scrollbar": { display: "none" },
            }}
        >
            {packages.map((item) => (
                <PackageCard
                    key={item.id}
                    title={item.title}
                    price={item.price}
                    rating={item.rating}
                    imageSrc={item.imageSrc}
                />
            ))}
        </Box>
    );
});

export default Carousel;
