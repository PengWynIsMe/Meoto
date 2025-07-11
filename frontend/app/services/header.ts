import qs from "qs";

export async function getHeader() {
  const query = qs.stringify({
    populate: {
      menu_items: {
        populate: {
          sub_items: {
            populate: {
              items: {
                populate: "image",
              },
            },
          },
        },
      },
      logo: true,
    },
  });

  const res = await fetch(`http://127.0.0.1:1337/api/header?${query}`);
  const json = await res.json();
  return json.data;
}
