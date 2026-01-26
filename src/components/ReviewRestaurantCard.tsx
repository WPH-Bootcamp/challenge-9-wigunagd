import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import dayjs from 'dayjs'
import 'dayjs/locale/id'

dayjs.locale('id');

interface IReviewProps {
    id: number;
    name: string;
    avatar: string;
    date: string;
    star: number;
    comment: string;
}

const ReviewRestaurantCard = ({ id, name, avatar, date, star, comment }: IReviewProps) => {
    return (
        <Card id={id.toString()}>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <img src={avatar ?? 'src/assets/noimg.png'} alt={`Avatar-${name}`} className="w-16 h-16 rounded-full" />
                    <div className="flex flex-col gap-3 ml-3">
                        <b className="text-lg">{name}</b>
                        <p>{dayjs(date).format('DD MMMM YYYY, HH:mm')}</p>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col">
                <p className="flex">
                    {
                    Array.from({ length: star }).map((_, index) => (
                        <img src="src/assets/Star.svg" alt={`review-star-comment-${index}`} />
                    ))
                }
                </p>
                <p>{comment}</p>
            </CardContent>
        </Card>
    )
}

export default ReviewRestaurantCard;