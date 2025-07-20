import "./GalleryImages.css";
import CarouselPackageDetails from "../../../components/PackageDetails/Carousel/CarouselPackageDetails";
import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowAltCircleLeft, FaArrowAltCircleRight, FaHeart, FaRegHeart } from 'react-icons/fa'
import useScrollArrows from "../../../hooks/useScrollArrows";
import { useNavigate } from 'react-router-dom'
import { goBack } from '../../../routes/coordinator'
import useIsMobile from "../../../hooks/useIsMobile";

const GalleryImages = ({ packageData }) => {
    const isMobile = useIsMobile()
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFavorited, setIsFavorited] = useState(false)
    const navigate = useNavigate()

    const toggleFavorite = () => {
        setIsFavorited(!isFavorited)
    }

    const arrowsRef = useRef(null);
    const arrows = useScrollArrows(arrowsRef);

    const scrollCarousel = (direction, ref) => {
        if (!ref.current) return;

        const scrollAmount = isMobile ? 300 : 400;

        ref.current.scrollBy({
            left: direction === "right" ? scrollAmount : -scrollAmount,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (!arrowsRef.current) return;

            const container = arrowsRef.current;
            const imageWidth = container.clientWidth;
            const index = Math.round(container.scrollLeft / imageWidth);

            setCurrentIndex(index);
        };

        const refCopy = arrowsRef.current;
        refCopy.addEventListener("scroll", handleScroll);

        return () => {
            refCopy.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToIndex = (index) => {
        if (!arrowsRef.current) return;

        const container = arrowsRef.current;
        const imageWidth = container.clientWidth;
        const targetScrollLeft = index * imageWidth;

        container.scrollTo({
            left: targetScrollLeft,
            behavior: "smooth",
        });

        setCurrentIndex(index);
    };

    return (
        <div className='galleryImages-container'>
            {packageData?.galleryImages?.length > 0 && (
                <div className="galleryCarousel-wrapper">
                    {isMobile && (
                        <div className="FaArrowLeft" onClick={() => goBack(navigate)}>
                            <FaArrowLeft />
                        </div>
                    )}
                    <div
                        onClick={e => {
                            e.stopPropagation()
                            toggleFavorite()
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        {isFavorited ? (
                            <FaHeart className='hearthIconGI' />
                        ) : (
                            <FaRegHeart className='hearthIconGI2' />
                        )}
                    </div>
                    <div className="galleryCarousel-container">
                        <CarouselPackageDetails packageData={packageData} ref={arrowsRef} />
                    </div>
                    {!isMobile && (
                        <div className="galleryArrowsDots">
                            {arrows.left && (
                                <div
                                    className="galleryCarousel-arrow-left"
                                    onClick={() => scrollCarousel("left", arrowsRef)}
                                >
                                    <FaArrowAltCircleLeft />
                                </div>
                            )}
                            {arrows.right && (
                                <div
                                    className="galleryCarousel-arrow-right"
                                    onClick={() => scrollCarousel("right", arrowsRef)}
                                >
                                    <FaArrowAltCircleRight />
                                </div>
                            )}
                            <div className="galleryPaginationDots">
                                {packageData.galleryImages.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`dot ${index === currentIndex ? "active" : ""}`}
                                        onClick={() => scrollToIndex(index)}
                                        aria-label={`Ir para imagem ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GalleryImages;
