import "./PackageDetailsPage.css";
import GalleryImages from "../../components/PackageDetails/GalleryImages/GalleryImages";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewCarousel from "../../components/Review/ReviewCarousel/ReviewCarousel";
import { BookButton } from "../../components/Book/BookButton/BookButton";
import Description from "../../components/PackageDetails/Description/Description";
import Maps from "../../components/PackageDetails/Maps/Maps";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { fetchTravelPackageById } from "../../store/actions/travelPackagesActions";

const PackageDetailsPage = () => {
  const { id } = useParams();
  const numericId = Number(id);
  const dispatch = useDispatch();

  const { packageDetails, loading, error } = useSelector(
    (state) => state.travelPackages,
    shallowEqual
  );
  if (packageDetails) {
    console.log(packageDetails[0]);
  }

  useEffect(() => {
    if (numericId) {
      dispatch(fetchTravelPackageById(numericId));
    }
  }, [dispatch, numericId]);

  return (
    <div className="PackageDetailsContainer">
      {loading ? (
        <p>Carregando detalhes do pacote...</p>
      ) : error ? (
        <p>Erro ao carregar os detalhes do pacote: {error}</p>
      ) : !packageDetails ? (
        <p>Pacote não encontrado.</p>
      ) : (
        <>
          <GalleryImages packageData={packageDetails[0]} />
          {/* descrição do serviço do pacote a baixo */}
          <Description packageData={packageDetails[0]} />
          {/* Local do pacote*/}
          <Maps packageData={packageDetails[0]} />
          <ReviewCarousel packageId={numericId} />
          <BookButton packageData={packageDetails[0]} />.
        </>
      )}
    </div>
  );
};

export default PackageDetailsPage;
