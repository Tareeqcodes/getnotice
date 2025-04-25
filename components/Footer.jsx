

export default function Footer() {
  return (
    <div className="hidden md:block">
         <footer className="py-4 bg-gray-950 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Devs Realm. Helping junior devs shine.</p>
      </footer>
    </div>
  )
}
