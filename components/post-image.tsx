import Image from "next/image"

interface PostImageProps {
  src: string
  alt: string
}

export function PostImage({ src, alt }: PostImageProps) {
  return (
    <div className="relative w-full max-w-4xl mx-auto my-8 overflow-hidden rounded-lg aspect-video">
      <Image
        src={src || "/placeholder-blog.png"}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 75vw"
        priority
      />
    </div>
  )
}
