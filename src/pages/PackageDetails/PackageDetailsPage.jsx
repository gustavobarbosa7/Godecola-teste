import './PackageDetailsPage.css'
import GalleryImages from "../../components/PackageDetails/GalleryImages/GalleryImages";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import packagesData from '../../travels.mock.json'

const PackageDetailsPage = () => {
  const { id } = useParams();
  const [packageDetail, setPackageDetail] = useState(null);

  useEffect(() => {
    const numericId = Number(id);
    const foundPackage = packagesData.find(pkg => pkg.id === numericId);
    setPackageDetail(foundPackage);
  }, [id]);

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
    </div>
  )
}

export default PackageDetailsPage;