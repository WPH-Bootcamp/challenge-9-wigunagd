import { baseURLVar } from "../BaseUrlVar";

interface FooterProps {
    className?: string
}

const Footer = ({className}: FooterProps) => {
    const socialarr = [
        {
            id: "Facebook",
            imgurl: "src/assets/social-media-fb.svg",
            href: "http://www.facebook.com"
        },
        {
            id: "Instagram",
            imgurl: "src/assets/social-media-ig.svg",
            href: "http://www.instagram.com"
        },
        {
            id: "LinkedIn",
            imgurl: "src/assets/social-media-linkedin.svg",
            href: "http://www.faceLinkedInbook.com"
        },
        {
            id: "TikTok",
            imgurl: "src/assets/social-media-tiktok.svg",
            href: "http://www.TikTok.com"
        },
    ];

    const exploreArr = [
        {
            id: "All Food",
            imgSrc: "",
            href: "#"
        }, {
            id: "Nearby",
            imgSrc: "",
            href: "#"
        }, {
            id: "Discount",
            imgSrc: "",
            href: "#"
        }, {
            id: "Best Seller",
            imgSrc: "",
            href: "#"
        }, {
            id: "Delivery",
            imgSrc: "",
            href: "#"
        }, {
            id: "Lunch",
            imgSrc: "",
            href: "#"
        },
    ];

    const helpArr = [
        {
            id: "How to Order",
            href: "#"
        }, {
            id: "Payment Method",
            href: "#"
        }, {
            id: "Track My Order",
            href: "#"
        }, {
            id: "FAQ",
            href: "#"
        }, {
            id: "Contact Us",
            href: "#"
        },
    ];


    return (
        <footer className={`bg-[#0A0D12] py-15 text-white flex items-center ${className}`}>
            <div id="footercontent" className="flex flex-col md:flex-row w-full md:max-w-[1440px] mx-auto md:px-0">

                <div id="div1" className="w-full md:w-1/2 p-4">
                    <div className="w-full md:max-w-[380px]">
                        <div className="flex items-center mb-5">
                            <a className="flex items-center" href={baseURLVar}>
                                <img src="src/assets/Logo.svg" alt="Logo" className="" />
                                <h1 className={`text-white text-3xl font-bold ml-4`}>Foody</h1>
                            </a>
                        </div>
                        <div className="text-md mb-5">
                            Enjoy homemade flavors & chef’s signature dishes, freshly prepared every day. Order online or visit our nearest branch.
                        </div>

                        <div className="flex flex-col">
                            <h3 className="text-md font-bold">Follow on Social Media</h3>
                            <ul className="mt-5 flex gap-4">
                                {
                                    socialarr.map((s) => (
                                        <li key={s.id}>
                                            <a href={s.href} target="_blank">
                                                <img src={s.imgurl} alt={s.id} />
                                            </a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="div2" className="w-full md:w-1/2 flex flex-row justify-between p-4">
                    <div className="w-1/2 max-w-[200px] flex">
                        <ul className="flex flex-col gap-5">
                            <li className="font-bold">Explore</li>
                            {
                                exploreArr.map((ex) => (
                                    <li>
                                        <a href={ex.href}>{ex.id}</a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className="w-1/2 max-w-[200px]">
                        <ul className="flex flex-col gap-5">
                            <li className="font-bold">Help</li>
                            {
                                helpArr.map((h) => (
                                    <li>
                                        <a href={h.href}>{h.id}</a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer;