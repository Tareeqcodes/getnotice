

import FeedNav from "@/components/FeedNav"

export default function Feedslayout({childreen}) {
  return (
    <div className="min-h-screen">
        <main>
            <FeedNav />
            {childreen}
        </main>
    </div>
  )
}
