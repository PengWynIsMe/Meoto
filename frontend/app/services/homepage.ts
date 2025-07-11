// app/services/homepage.ts
export async function getHomePageData() {
  const res = await fetch(
    "http://127.0.0.1:1337/api/home-page?populate[Slider][populate]=image"
  );
  const data = await res.json();
  return data.data.Slider;
}
