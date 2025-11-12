import Link from "next/link";

const Homepage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-red-300">
      Click <Link href="/documents/1234"><span className="text-blue-300 underline">here</span></Link> to go to docs
    </div>
  )
}

export default Homepage;