"use server";
export async function getData(locationId) {
  try {
    const locationRes = await fetch(
      `${process.env.NEXTAUTH_URL}/api/hall/${locationId}`,
    );

    var locationData = await locationRes.json();

    const photoRes = await fetch(
      `${process.env.NEXTAUTH_URL}/api/photos/${locationData._id}`,
    );
    const photoData = await photoRes.json();

    const accumulate = {
      ...locationData,
      photos: photoData.map((photo) => photo.secure_url),
    };

    accumulate.photos.push(
      "https://res.cloudinary.com/dkux7gsfb/image/upload/v1706484320/nextjs_upload/k8xg3ojktreg1wwevtkg.jpg",
    );
    return accumulate;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
