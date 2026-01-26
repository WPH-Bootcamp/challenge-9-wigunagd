import Footer from "@/components/Footer";
import NavigationMenu from "@/components/NavigationMenu";

const Category = () => {
    return (
         <>
            <NavigationMenu changeOnScroll={false} />
            <main className="pt-23 md:px-0 px-4 w-full md:max-w-[1440px] mx-auto gap-5 md:flex grid mb-5">
                Category
            </main>
            <Footer />
        </>
    )
}

export default Category;