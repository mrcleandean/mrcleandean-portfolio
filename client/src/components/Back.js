import { Link } from "react-router-dom"
import { BiArrowBack } from 'react-icons/bi';
import { motion } from "framer-motion";
export default function Back(props) {
    return (
        <div className={`absolute top-10 left-10 flex justify-center items-center flex-col bg-white p-5 rounded-xl ${props.zindex} shadow-lg hover:shadow-2xl transition-all`}>
            <Link to='/'>
                <motion.div
                    className="w-fit h-8 rounded-md flex justify-center items-center ml-2 hover:cursor-pointer text-white bg-[#03396c]"
                    whileHover={{ scale: 1.07 }}
                >
                    <p className="ml-3">Go Back</p>
                    <BiArrowBack className=" ml-2 mr-3" />
                </motion.div>
            </Link>
            <h1 className="font-bigT mt-3">{props.title}</h1>
            <h4 className=" text-sm mt-1">{props.sub}</h4>
            <p className=" text-xs mt-1">{props.ver}</p>
        </div>
    )
}