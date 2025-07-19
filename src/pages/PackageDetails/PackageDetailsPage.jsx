import './PackageDetailsPage.css'
import GalleryImages from "../../components/PackageDetails/GalleryImages/GalleryImages";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import packagesData from '../../travels.mock.json'
import ReviewCarousel from '../../components/Review/ReviewCarousel/ReviewCarousel'

const PackageDetailsPage = () => {
  const { id } = useParams();
  const numericId = Number(id);
  const [packageDetail, setPackageDetail] = useState(null);

  useEffect(() => {
    const foundPackage = packagesData.find(pkg => pkg.id === numericId);
    setPackageDetail(foundPackage);
  }, [numericId]);

  if (!packageDetail) {
    return (
      <div className='PackageDetailsNotFound'>
        {packageDetail === null ? 'Carregando detalhes do pacote...' : 'Pacote não encontrado.'}
      </div>
    );
  }

  return (
    <div className='PackageDetailsContainer'>
      <GalleryImages packageData={packageDetail} />
      <ReviewCarousel packageId={numericId} />
    </div>
  )
}

export default PackageDetailsPage;