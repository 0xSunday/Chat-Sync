import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { data } = await req.body;
      const { id, name, isGroup, members } = await data;
      // const photo = await req.formData();
      // const file = photo.get('image')

      console.log(name);
      console.log(currentUser.name);

      if (!currentUser?.id || !currentUser?.email) {
        // return new NextResponse("Unauthorized", { status: 400 });
        return res.status(400);
      }

      if (isGroup && (!members || members.length < 2 || !name)) {
        // return new NextResponse("Invalid data", { status: 400 });
        return res.status(400);
      }

      if (isGroup) {
        const newConversation = await prisma.conversation.create({
          data: {
            name,
            isGroup,
            users: {
              connect: [
                ...members.map((member: { value: string }) => ({
                  id: member.value,
                })),
                {
                  id: currentUser.id,
                },
              ],
            },
          },
          include: {
            users: true,
          },
        });

        // Update all connections with new conversation
        // newConversation.users.forEach((user) => {
        //   if (user.email) {
        //     pusherServer.trigger(
        //       user.email,
        //       "conversation:new",
        //       newConversation
        //     );
        //   }
        // });

        // return NextResponse.json(newConversation);
        return res.status(200).json(newConversation);
      }

      const existingConversations = await prisma.conversation.findMany({
        where: {
          OR: [
            {
              userIds: {
                equals: [currentUser.id, id],
              },
            },
            {
              userIds: {
                equals: [id, currentUser.id],
              },
            },
          ],
        },
      });

      const singleConversation = existingConversations[0];

      if (singleConversation) {
        // return NextResponse.json(singleConversation);
        return res.status(200).json(singleConversation);
      }

      const newConversation = await prisma.conversation.create({
        data: {
          users: {
            connect: [
              {
                id: currentUser.id,
              },
              {
                id: id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      // Update all connections with new conversation
      // newConversation.users.map((user) => {
      //   if (user.email) {
      //     pusherServer.trigger(user.email, "conversation:new", newConversation);
      //   }
      // });
      return res.status(200).json(newConversation);
      // return NextResponse.json(newConversation);
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// // import getCurrentUser from "@/app/actions/getCurrentUser";
// // import { NextResponse } from "next/server";

// import prisma from "@/libs/prismadb";
// import useCurrentUser from "@/hooks/useCurrentUser";
// // import { NextApiRequest, NextApiResponse } from "next";
// import serverAuth from "@/libs/serverAuth";
// // import { pusherServer } from "@/app/libs/pusher";

// // export async function POST(request: Request) {

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {

//   const { data: currentUser } = useCurrentUser();
//   const body = await req.body;
//   const { userId, isGroup, members, name } = body;
//   if (req.method !== "POST" && req.method !== "GET") {
//     return res.status(405).end();
//   }

//   try {

//     if (req.method === 'POST') {
//       // const { currentUser } = await serverAuth(req, res);

//       if (isGroup) {
//           const newConversation = await prisma.conversation.create({
//             data: {
//               name,
//               isGroup,
//               users: {
//                 connect: [
//                   ...members.map((member: { value: string }) => ({
//                     id: member.value,
//                   })),
//                   {
//                     id: currentUser.id,
//                   },
//                 ],
//               },
//             },
//             include: {
//               users: true,
//             },
//           });

//           // Update all connections with new conversation
//           // newConversation.users.forEach((user) => {
//           //   if (user.email) {
//           //     pusherServer.trigger(user.email, "conversation:new", newConversation);
//           //   }
//           // });

//           return NextResponse.json(newConversation);
//         }

//         const existingConversations = await prisma.conversation.findMany({
//           where: {
//             OR: [
//               {
//                 userIds: {
//                   equals: [currentUser.id, userId],
//                 },
//               },
//               {
//                 userIds: {
//                   equals: [userId, currentUser.id],
//                 },
//               },
//             ],
//           },
//         });

//         const singleConversation = existingConversations[0];

//         if (singleConversation) {
//           return NextResponse.json(singleConversation);
//         }

//         const newConversation = await prisma.conversation.create({
//           data: {
//             users: {
//               connect: [
//                 {
//                   id: currentUser.id,
//                 },
//                 {
//                   id: userId,
//                 },
//               ],
//             },
//           },
//           include: {
//             users: true,
//           },
//         });

//         // Update all connections with new conversation
//         // newConversation.users.map((user) => {
//         //   if (user.email) {
//         //     pusherServer.trigger(user.email, "conversation:new", newConversation);
//         //   }
//         // });

//         return NextResponse.json(newConversation);

//     }

//   } catch (error) {
//     console.log(error);
//     return res.status(400).end();
//   }
// }

// try {

// if (!currentUser?.id || !currentUser?.email) {
//   return new NextResponse("Unauthorized", { status: 401 });
// }

// if (isGroup && (!members || members.length < 2 || !name)) {
//   return new NextResponse("Invalid data", { status: 400 });
// }

// console.log(userId);

// if (isGroup) {
//   const newConversation = await prisma.conversation.create({
//     data: {
//       name,
//       isGroup,
//       users: {
//         connect: [
//           ...members.map((member: { value: string }) => ({
//             id: member.value,
//           })),
//           {
//             id: currentUser.id,
//           },
//         ],
//       },
//     },
//     include: {
//       users: true,
//     },
//   });

//   // Update all connections with new conversation
//   // newConversation.users.forEach((user) => {
//   //   if (user.email) {
//   //     pusherServer.trigger(user.email, "conversation:new", newConversation);
//   //   }
//   // });

//   return NextResponse.json(newConversation);
// }

// const existingConversations = await prisma.conversation.findMany({
//   where: {
//     OR: [
//       {
//         userIds: {
//           equals: [currentUser.id, userId],
//         },
//       },
//       {
//         userIds: {
//           equals: [userId, currentUser.id],
//         },
//       },
//     ],
//   },
// });

// const singleConversation = existingConversations[0];

// if (singleConversation) {
//   return NextResponse.json(singleConversation);
// }

// const newConversation = await prisma.conversation.create({
//   data: {
//     users: {
//       connect: [
//         {
//           id: currentUser.id,
//         },
//         {
//           id: userId,
//         },
//       ],
//     },
//   },
//   include: {
//     users: true,
//   },
// });

// // Update all connections with new conversation
// // newConversation.users.map((user) => {
// //   if (user.email) {
// //     pusherServer.trigger(user.email, "conversation:new", newConversation);
// //   }
// // });

// return NextResponse.json(newConversation);
// } catch (error: any) {
//   return new NextResponse("Internal Error", { status: 500 });
// }
// }
