import { FaCheckCircle } from "react-icons/fa";

function EmailSignUp() {
  return (
    <section className="w-full h-[600px] flex flex-col items-center bg-[url(src/assets/imageSign.webp)] bg-cover" >
        <div className="w-[480px] flex flex-col items-center justify-center h-full text-Light">
            <h3 className="pb-6 text-Headline_two font-Roboto ">Join the club and get the benefits</h3>
            <p className="w-[430px] pb-8 md:text-center text-Body_small font-Open_Sans">Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop up stores and more</p>
            <div className="w-full flex flex-col md:flex-row md:justify-between pb-10">
                <span className="flex flex-row md:justify-between gap-2 items-center">
                    <FaCheckCircle />
                    Exclusive offers
                </span>
                <span className="flex flex-row md:justify-between gap-2 items-center">
                    <FaCheckCircle />
                    Free events
                </span>
                <span className="flex flex-row md:justify-between gap-2 items-center">
                    <FaCheckCircle />
                    Large discounts
                </span>
            </div>
            <div className="w-96 h-12 flex ">
                <input type="text" className="w-full text-Dark p-4"/>
                <button type="button" className="w-28 bg-DarkPrimary text-Light">Sign up</button>
            </div>
            
        </div>
    </section>
  )
}

export default EmailSignUp