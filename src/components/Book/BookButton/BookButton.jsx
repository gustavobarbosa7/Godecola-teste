import './BookButton.css'
import { useNavigate } from 'react-router-dom'
import { goToBookings } from '../../../routes/coordinator'
import useIsOnRoute from '../../../hooks/useIsOnRoute';

export const BookButton = ({ packageData }) => {
    const navigate = useNavigate();
    const isOnPackageDetailsPage = useIsOnRoute('/package-details/:id');

    return (
        <div
            className='BookButtonContainer'
            style={{
                display: isOnPackageDetailsPage ? 'flex' : 'none'
            }}
        >
            <h1>R$ {packageData.price}</h1>
            <div className='book-btn' onClick={() => goToBookings(navigate)}>Reservar</div>

        </div>
    );
};
