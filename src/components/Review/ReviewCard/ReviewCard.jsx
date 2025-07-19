import './ReviewCard.css'
import useTimeAgo from '../../../hooks/useTimeAgo'
import useRandomAvatar from '../../../hooks/useRandomAvatar'
import Avatar from '@mui/joy/Avatar';
import RatingStars from '../RatingStars'
import ExpandableText from '../ExpandableText';

export const ReviewCard = ({ review }) => {
    const { id, userName, review_date, rating, comment, userCreatedAt, packageId } = review;

    return (
        <div className='reviewCard'>

            <div className='reviewCardContent'>
                <div className='starRating'>
                    <RatingStars rating={rating} />
                    <p>• {useTimeAgo(review_date)} atrás</p>
                </div>

                <ExpandableText text={comment} maxLines={4} commentId={id} packageId={packageId}/>

                <div className='reviewCard_user'>
                    <Avatar alt={userName} src={useRandomAvatar(userName)}
                        size="md"
                    />
                    <div className='reviewCard_userName'>
                        <h4 className='reviewCard_name' >{userName}</h4>
                        <p className='reviewCard_time' >{useTimeAgo(userCreatedAt)} no Go Decola</p>
                    </div>
                </div>

            </div>

            <hr />
        </div>
    )
}
