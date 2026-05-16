import { Star } from 'lucide-react'
import './StarRating.css'

const StarRating = ({ rating }) => {
    return (
    <div className="rating">
    <svg width="0" height="0">
        <defs>
        <linearGradient id="half-gradient">
            <stop offset="50%" stopColor="gold" />
            <stop offset="50%" stopColor="transparent" />
        </linearGradient>
        </defs>
    </svg>

    {[1, 2, 3, 4, 5].map((star) => {
        const full = star <= Math.floor(rating)
        const half = !full && star === Math.ceil(rating) && rating % 1 !== 0

        return (
        <Star
            key={star}
            size={16}
            color="gold"
            fill={full ? 'gold' : half ? 'url(#half-gradient)' : 'transparent'}
        />
        )
    })}

    <span>{rating}/5</span>
    </div>
)
}

export default StarRating;