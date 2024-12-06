import Image from 'next/image'

export const ImageComponent = ({image}) => {

  const imageUrl = `${process.env.IMAGE_API}/${image.source}/${image.fileName}`

  return <>
    <Image
        src={imageUrl}
        alt={image.description}
        width={image.width}
        height={image.height}
    />
    {
      image.phographer && <figcaption>{image.phographer}</figcaption>
    }
  </>

}