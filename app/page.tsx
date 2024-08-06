import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
    return (
        <main className="flex min-h-screen items-center justify-center gap-6 p-6">
            <h2 className="sm:text-3xl text-2xl text-white">Bienvenid@ a Dream Match</h2>
            <Link href={'/teams'}>
                <Image
                    src="/nextIcon.svg"
                    width={100}
                    height={100}
                    alt="next-step"
                />
            </Link>
        </main>
    )
}
