
import Footer from "../../components/Footer";
import NavigationMenu from "../../components/NavigationMenu";

const Cart = () => {
    return (
        <>
            <NavigationMenu changeOnScroll={false} />
            <main className="pt-23 md:px-0 px-4 w-full md:max-w-[1440px] mx-auto">
                <section>
                    <h1 className="text-4xl">Cart</h1>
                </section>
            </main>
             <Footer />
        </>
    )
}

export default Cart;