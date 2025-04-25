
 "use client";

import { motion } from "framer-motion";
import {
  CodeBracketIcon,
  BoltIcon,
  SparklesIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export default function Main() {
  return (
    <div className="min-h-screen bg-gray-950 mb-10 md:mb-0 text-white">
      <div className="container mx-auto px-6 py-20 text-justify md:text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-white"
        >
          Get Noticed. <span className="text-indigo-500">Get Hired.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-300 max-w-2xl mx-auto mb-10"
        >
          Devs Realm is the visibility platform for junior devs to showcase projects,
          build credibility, and attract real opportunities. No more shouting into the void.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
        </motion.div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            {
              icon: <CodeBracketIcon className="h-10 w-10 text-indigo-500" />,
              title: "Showcase Your Work",
              desc: "Build a portfolio that speaks louder than a resume. Let your code do the talking.",
            },
            {
              icon: <BoltIcon className="h-10 w-10 text-indigo-500" />,
              title: "Get Discovered",
              desc: "Let companies find you—no more cold applications or inbox black holes.",
            },
            {
              icon: <SparklesIcon className="h-10 w-10 text-indigo-500" />,
              title: "Prove You Belong",
              desc: "Stand out with challenges, peer kudos, and real-world credibility.",
            },
            {
              icon: <ChartBarIcon className="h-10 w-10 text-indigo-500" />,
              title: "Track Your Growth",
              desc: "See how your work gets noticed. Metrics to guide your dev journey.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-gray-900 p-6 rounded-xl text-justify shadow-md hover:shadow-lg transition border border-gray-800"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
