"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CodeBracketIcon,
  BoltIcon,
  SparklesIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Get <span className="text-indigo-600">Noticed</span>. Get <span className="text-indigo-600">Hired</span>.
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-6 text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto"
            >
              The platform for junior devs to showcase projects, build credibility,
              and attract real opportunities. No more shouting into the void.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row space-y-7 justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/login"
                  className="w-full sm:w-auto px-8 py-3 text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition"
                >
                  Start Building Your Profile
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
       
              >
                <Link
                  href="/"
                  className="w-full sm:w-auto px-8 py-3 text-base font-medium rounded-md text-indigo-600 bg-white border border-indigo-600 hover:bg-gray-50 shadow-md transition"
                >
                  I'm Hiring Talent
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>


      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: <CodeBracketIcon className="h-10 w-10 text-indigo-600" />,
                title: "Portfolio That Works",
                desc: "Showcase real projects with measurable impact, not just code snippets.",
              },
              {
                icon: <BoltIcon className="h-10 w-10 text-indigo-600" />,
                title: "Passive Recruitment",
                desc: "Get approached by companies who need your exact skills.",
              },
              {
                icon: <SparklesIcon className="h-10 w-10 text-indigo-600" />,
                title: "Skill Validation",
                desc: "Earn verifiable badges by completing real-world challenges.",
              },
              {
                icon: <ChartBarIcon className="h-10 w-10 text-indigo-600" />,
                title: "Growth Tracking",
                desc: "See exactly what skills you need to land your dream job.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:border-indigo-600 transition"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
