import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { ArtImage } from "./art-image"

interface IQueryResult {
  ThreeD: {
    nodes: Array<{
      title: string
      description: string
      photoId: string
      imageUrls: {
        image: {
          url: string
          width: number
          height: number
        }
      }
    }>
  }
}

export const Flickr3D = () => {
  const data = useStaticQuery<IQueryResult>(graphql`
    {
      ThreeD: allFlickrPhotosetsPhotos(
        filter: { photoset_id: { eq: "72177720300732809" } }
        sort: { datetaken: DESC }
      ) {
        nodes {
          title
          description
          photoId: _id
          imageUrls {
            image: _1024px {
              url
              width
              height
            }
          }
        }
      }
    }
  `)

  if (data?.ThreeD?.nodes.length === 0) {
    return (
      <p>
        Define a <code>FLICKR_API_KEY</code>.
      </p>
    )
  }

  return (
    <>
      {data.ThreeD.nodes.map((img) => (
        <ArtImage
          key={img.photoId}
          alt={img.description}
          photoId={img.photoId}
          height={img.imageUrls?.image?.height}
          width={img.imageUrls?.image?.width}
          src={img.imageUrls?.image?.url}
          title={img.title}
        />
      ))}
    </>
  )
}
