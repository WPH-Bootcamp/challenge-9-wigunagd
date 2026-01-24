export interface TRestaurantDisplayCard {
    logo: string;
    name: string;
    place: string;
    star: number;
    distance: number;
}

export const RestaurantDisplayCard = ({ logo, name, place, star, distance }: TRestaurantDisplayCard) => {
    return (
        <div className="flex">
            <div className="w-[120px] h-[120px] flex items-center">
                <img src={logo} alt={name} className="w-full" />
            </div>

            <div className="flex flex-col justify-center ml-5">
                <h4 className="font-bold text-lg">{name}</h4>
                <p className="flex items-center"><img width="24" className="mr-1" src="src/assets/Star.svg" alt={`Rating ${star}`} />{star}</p>
                <p> {place} {`${distance !== undefined ? ` · ${distance} Km` : ''}`}</p>
            </div>
        </div>
    )
}