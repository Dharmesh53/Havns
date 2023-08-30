"use client";
import Layout from "../layout";
import Footer from "../footer";
import Uploader from "@components/upload/imageUpload";
import { motion } from "framer-motion";
import { useContext } from "react";
import locationContext from "@context/locateContext";

const page = () => {
  const {Address}=useContext(locationContext)
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.4 }}
        className=" flex flex-col gap-4 max-w-[65.5rem] "
      >
        <h1 className="text-4xl font-semibold">
          Images worth a thousand visits
        </h1>
        <p className="text-gray-600">Let your images do the talking</p>
        <div className="mt-6 ">
          <Uploader location={Address} />
        </div>
        
      </motion.div>
      <div className=" w-screen bottom-0 fixed">
        <Footer
          back="/protected/become-host/capacity"
          next="/protected/become-host/prices"
          value={"Next"}
        />
      </div>
    </Layout>
  );
};

export default page;
