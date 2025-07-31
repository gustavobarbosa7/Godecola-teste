import "./HomePage.css";
import Carousel from "../../components/Home/Carousel/CarouselHome";
import packagesData from "../../travels.mock.json";
import { useState, useEffect, useRef } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import useScrollArrows from "../../hooks/useScrollArrows";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { goToSearchPackages } from "../../routes/coordinator";
import { IoSearch } from "react-icons/io5";
import useShuffledArray from "../../hooks/useShuffledArray";
import useIsMobile from "../../hooks/useIsMobile";

const HomePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("NATIONAL");
  const isMobile = useIsMobile();

  const nationalCarouselRef = useRef(null);
  const internationalCarouselRef = useRef(null);
  const promoCarouselRef = useRef(null);

  const nationalPackages = useShuffledArray(
    packagesData.filter((pkg) => pkg.packageType === "NATIONAL")
  );
  const internationalPackages = useShuffledArray(
    packagesData.filter((pkg) => pkg.packageType === "INTERNATIONAL")
  );
  const promoPackages = useShuffledArray(
    packagesData.filter((pkg) => pkg.isCurrentlyOnPromotion === true)
  );

  const nationalArrows = useScrollArrows(nationalCarouselRef);
  const internationalArrows = useScrollArrows(internationalCarouselRef);
  const promoArrows = useScrollArrows(promoCarouselRef);

  // Função para rolar o carrossel
  const scrollCarousel = (direction, ref) => {
    if (!ref.current) return;

    const scrollAmount = isMobile ? 300 : 400;

    ref.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  // Forçar re-check das setas após trocar de aba
  useEffect(() => {
    const timer = setTimeout(() => {
      nationalArrows.checkScroll();
      internationalArrows.checkScroll();
      promoArrows.checkScroll();
    }, 200);

    return () => clearTimeout(timer);
  }, [activeTab, internationalArrows, nationalArrows, promoArrows]);

  return (
    <div className="homepage-container">
      <Card
        className="search-button"
        sx={{
          maxWidth: 360,
          borderRadius: "16px",
          backgroundColor: "var(--footer-bg)",
          color: "var(--text-card-package)",
        }}
        onClick={() => goToSearchPackages(navigate)}
      >
        <IoSearch />
        <p>Inicie sua busca</p>
      </Card>
      {/* --- Navegação Tabs --- */}

      <div className="tab-navigation-container">
        <h2
          className={`tab-h2 ${activeTab === "NATIONAL" ? "active" : ""}`}
          onClick={() => setActiveTab("NATIONAL")}
        >
          {isMobile ? "Nacionais" : "Viagens Nacionais"}
        </h2>
        <span className="tab-separator">|</span>
        <h2
          className={`tab-h2 ${activeTab === "INTERNATIONAL" ? "active" : ""}`}
          onClick={() => setActiveTab("INTERNATIONAL")}
        >
          {isMobile ? "Internacionais" : "Viagens Internacionais"}
        </h2>
      </div>

      {/* --- Carrossel Nacional --- */}
      {activeTab === "NATIONAL" && nationalPackages.length > 0 && (
        <div className="carousel-wrapper">
          {!isMobile && (
            <>
              {nationalArrows.left && (
                <div
                  className="carousel-arrow-left"
                  onClick={() => scrollCarousel("left", nationalCarouselRef)}
                >
                  <FaArrowAltCircleLeft />
                </div>
              )}
              {nationalArrows.right && (
                <div
                  className="carousel-arrow-right"
                  onClick={() => scrollCarousel("right", nationalCarouselRef)}
                >
                  <FaArrowAltCircleRight />
                </div>
              )}
            </>
          )}
          <div className="carousel-container">
            <Carousel packages={nationalPackages} ref={nationalCarouselRef} />
          </div>
        </div>
      )}

      {/* --- Carrossel Internacional --- */}
      {activeTab === "INTERNATIONAL" && internationalPackages.length > 0 && (
        <div className="carousel-wrapper">
          {!isMobile && (
            <>
              {internationalArrows.left && (
                <div
                  className="carousel-arrow-left"
                  onClick={() =>
                    scrollCarousel("left", internationalCarouselRef)
                  }
                >
                  <FaArrowAltCircleLeft />
                </div>
              )}
              {internationalArrows.right && (
                <div
                  className="carousel-arrow-right"
                  onClick={() =>
                    scrollCarousel("right", internationalCarouselRef)
                  }
                >
                  <FaArrowAltCircleRight />
                </div>
              )}
            </>
          )}
          <div className="carousel-container">
            <Carousel
              packages={internationalPackages}
              ref={internationalCarouselRef}
            />
          </div>
        </div>
      )}

      {/* --- Pacotes em Promoção --- */}
      <h2 className="h2Promo">Pacotes em Promoção</h2>
      {promoPackages.length > 0 && (
        <div className="carousel-wrapper">
          {!isMobile && (
            <>
              {promoArrows.left && (
                <div
                  className="carousel-arrow-left"
                  onClick={() => scrollCarousel("left", promoCarouselRef)}
                >
                  <FaArrowAltCircleLeft />
                </div>
              )}
              {promoArrows.right && (
                <div
                  className="carousel-arrow-right"
                  onClick={() => scrollCarousel("right", promoCarouselRef)}
                >
                  <FaArrowAltCircleRight />
                </div>
              )}
            </>
          )}
          <div className="carousel-container">
            <Carousel packages={promoPackages} ref={promoCarouselRef} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
