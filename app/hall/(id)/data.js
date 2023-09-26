export async function getData(locationId) {
  try {
    const locationRes = await fetch(`api/hall/${locationId}`);
    const locationData = await locationRes.json();

    const photoRes = await fetch(`api/photos/${locationData._id}`);
    const photoData = await photoRes.json();

    const locatWithPhoto = {
      ...locationData,
      photos: photoData.map((photo) => photo.secure_url),
    };
    locatWithPhoto.photos.push(
      "https://res.cloudinary.com/dkux7gsfb/image/upload/v1693753920/nextjs_upload/Dewan-hall_k9p5z6.jpg"
    );
    
    return locatWithPhoto;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
