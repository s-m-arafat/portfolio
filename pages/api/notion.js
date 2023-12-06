// // pages/api/notion.js
// import axios from "axios";
// const pageId = "c1fe1b8ea8d44cb0bb860cdf05188f07";

// export default async function handler(req, res) {
//   try {
//     const response = await axios.get(
//       `https://api.notion.com/v1/page/${pageId}/`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
//           "Notion-Version": "2022-06-28",
//           "Accept": "application/json",
//         },
//       }
//     );

//     res.status(200).json(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
import { NotionAPI } from "notion-client";

const notion = new NotionAPI({
  activeUser: process.env.USER_ID,
  authToken: process.env.NOTION_TOKEN,
});
export default notion;
