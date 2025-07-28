import { useJsApiLoader, GoogleMap, Marker} from '@react-google-maps/api';
import './Maps.css';


const Maps = ({ packageData }) => {

  const chave = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: chave,
  });

  const position = {
  lat: packageData.accommodationDetails.address.latitude,
  lng: packageData.accommodationDetails.address.longitude,
};

  return (
    <div className="MapsPackage">
      {isLoaded ? (
       <GoogleMap
      mapContainerStyle={{width:"100%", height:"500px"}}
      center={position}
      zoom={17}
    >

      <Marker position={position} options={{
        label:{
          text: "Seu Local",
          className: "map-maker",
        },
        }}/>
    </GoogleMap>
      ) : (
        <p>Carregando mapa...</p>
      )}
    </div>
  );
};

export default Maps;