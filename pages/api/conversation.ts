// import { NextApiRequest, NextApiResponse } from "next";

// import prisma from "@/libs/prismadb";
// import useCurrentUser from "@/hooks/useCurrentUser";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { data: currentUser } = useCurrentUser();
//   if (req.method !== "GET") {
//     return res.status(405).end();
//   }
//   console.log(currentUser);

//   if (!currentUser) {
//     return [];
//     // return res.status(400).end();
//   }

//   try {
//     const conversations = await prisma.conversation.findMany({
//       orderBy: {
//         lastMessageAt: "desc",
//       },
//       where: {
//         userIds: {
//           has: currentUser.id,
//         },
//       },
//       include: {
//         users: true,
//         messages: {
//           include: {
//             sender: true,
//             seen: true,
//           },
//         },
//       },
//     });

//     return res.status(200).json(conversations);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).end();
//   }
// }

import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import useCurrentUser from "@/hooks/useCurrentUser";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { currentUser } = await serverAuth(req, res);
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  if (!currentUser) {
    return [];
  }
  // console.log(currentUser);
  try {
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        userIds: {
          has: currentUser.id,
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          },
        },
      },
    });

    return res.status(200).json(conversations);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
