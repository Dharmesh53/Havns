"use client";
import Layout from "../layout";
import Footer from "../footer";
import locationContext from "@context/locateContext";
import Details from "./details";
import { updateFeature } from "@actions/createActions";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { motion } from "framer-motion";

const page = () => {
  const router = useRouter();
  const [Loading, setLoading] = useState();
  const { Address } = useContext(locationContext);
  const [Feature, setFeature] = useState({
    title: "",
    description: "",
  });
  const handledetails = async (e) => {
    setLoading(true);
    e.preventDefault();
    const res = await updateFeature({ Feature, Address });
    if (res) {
      setLoading(false);
      router.push("/protected/become-host/congrats");
    }
  };
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.4 }}
        className=" flex flex-col gap-4"
      >
        <h1 className="text-4xl font-semibold">
          Last Step, Revealing the Wonders of Your Place
        </h1>
        <p className="text-gray-600">Unveil the Magic of Your Place</p>
        <div className="mt-6 ">
          <Details value={Feature} setvalue={setFeature} />
        </div>
      </motion.div>
      <div className=" w-screen bottom-0 fixed">
        <Footer
          back="/protected/become-host/prices"
          next="/protected/become-host/congrats"
          handle={handledetails}
          value={Loading ? "Working..." : "Next"}
        />
      </div>
    </Layout>
  );
};

export default page;
