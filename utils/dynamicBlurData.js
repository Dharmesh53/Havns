const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "http://localhost:3000";

export async function dynamicBlurDataUrl(url) {
  const base64str = await fetch(
    `${baseURL}/_next/image?url=${url}&w=8&q=70`
  ).then(async (res) =>
    Buffer.from(await res.arrayBuffer()).toString("base64")
  );

    const blur=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 5">
        <filter id="b" color-interpolation-filters='sRGB'>
            <feGaussianBlur in='SourceGraphic' stdDeviation={20}/>
        </filter>
        <image preserveAspectRatio="none" filter="url(#b)" x='0' y='0' height='100%' width='100%'
         href='data:image/webp;base64 ${base64str}' />
    </svg>`

  return `data:image/svg+xml;base64,${base64str}`;
}
