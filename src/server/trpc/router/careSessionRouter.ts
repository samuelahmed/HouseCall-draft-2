import { router, publicProcedure, privateProcedure } from "../trpc";
import { z } from "zod";
import slug from "slug";

//This router is for the following schemas:
//CareSession
//PotentialCareSession

export const careSessionRouter = router({
  // ************************
  // *       CREATE         *
  // ************************

  createOneSession: privateProcedure
    .input(
      z.object({
        name: z.string(),
        address: z.string(),
        medicalNotes: z.string(),
        overview: z.string(),
        title: z.string(),
        hourlyRate: z.number(),
        totalHours: z.number(),
        totalCompensation: z.number(),
        acceptedCaregiverId: z.string(),
        careSessionStatus: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const {
        acceptedCaregiverId,
        name,
        address,
        medicalNotes,
        overview,
        title,
        hourlyRate,
        totalHours,
        totalCompensation,
        careSessionStatus,
      } = input;
      //Instead of generating random string here it would be better to do something else
      //This will probably collide eventually
      const sessionId = Math.random().toString(36).substring(7);
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });
      if (!user) {
        throw new Error("Meow! user not found.");
      }
      const userId = user.id;
      const item = await ctx.prisma.careSession.create({
        data: {
          name,
          address,
          medicalNotes,
          overview,
          title,
          hourlyRate,
          totalHours,
          totalCompensation,
          acceptedCaregiverId,
          careSessionStatus,
          slug: slug(sessionId),
          authorId: userId,
        },
      });
      return item;
    }),

  createOnePotentialCaregiver: privateProcedure
    .input(
      z.object({
        careSessionId: z.string(),
        caregiverId: z.string(),
        status: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { careSessionId, caregiverId, status } = input;
      const item = await ctx.prisma.potentialCareSession.create({
        data: {
          careSessionId,
          caregiverId,
          status,
        },
      });
      return item;
    }),

  // ************************
  // *        READ          *
  // ************************

  //BROKEN
  readOnePotentialCaregiver: privateProcedure
  .input(
    z.object({
      careSessionId: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const { careSessionId } = input;
    const item = await ctx.prisma.potentialCareSession.findFirst({
      where: {
        careSessionId,
      },
    });
    return item;
  }),

  readOneSessionBySessionId: privateProcedure
    .input(z.object({ sessionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { sessionId } = input;
      const returnedSession = ctx.prisma.careSession.findUnique({
        where: {
          sessionId,
        },
      });
      return returnedSession;
    }),

  readOneSessionBySlug: privateProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const { slug } = input;
      const card = await ctx.prisma.careSession.findUnique({
        where: {
          slug,
        },
      });
      return card;
    }),

  readAllPotentialCareSessionsByCareSessionId: privateProcedure
    .input(z.object({ careSessionId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { careSessionId } = input;
      const potentialCareSessions = await ctx.prisma.potentialCareSession.findMany(
        {
          where: {
            careSessionId,
          },
        }
      );
      return potentialCareSessions;
    }),
    

  readAllSessions: publicProcedure.query(({ ctx }) => {
    const items = ctx.prisma.careSession.findMany({
      include: {
        author: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
    });
    return items;
  }),


  readAllSessionsByUser: privateProcedure.query(({ ctx }) => {
    if (!ctx.session || !ctx.session.user) {
      return null;
    }
    const items = ctx.prisma.careSession.findMany({
      where: {
        authorId: ctx.session.user.id,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
    });
    return items;
  }),

  readAllPotentialSessionsByUser: privateProcedure.query(async ({ ctx }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new Error("Meow! Not authorized.");
    }
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    if (!user) {
      throw new Error("Meow! user not found.");
    }
    const userId = user.id;
    const currentUserPotentialCareSessions =
      await ctx.prisma.potentialCareSession.findMany({
        where: {
          caregiverId: userId,
        },
      });
    const careSessionIds = currentUserPotentialCareSessions.map(
      (session) => session.careSessionId
    );
    const careSessions = await ctx.prisma.careSession.findMany({
      where: {
        sessionId: {
          in: careSessionIds,
        },
      },
    });
    return careSessions;
  }),

  readAllHistoricalSessionsByUser: privateProcedure.query(async ({ ctx }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new Error("Meow! Not authorized.");
    }
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    if (!user) {
      throw new Error("Meow! user not found.");
    }
    const userId = user.id;
    const currentUserPotentialCareSessions =
      await ctx.prisma.potentialCareSession.findMany({
        where: {
          caregiverId: userId,
          //ADD STATUS: COMPLETED WHEN IT IS ADDED TO THE SCHEMA
        },
      });
    const careSessionIds = currentUserPotentialCareSessions.map(
      (session) => session.careSessionId
    );
    const careSessions = await ctx.prisma.careSession.findMany({
      where: {
        sessionId: {
          in: careSessionIds,
        },
      },
    });
    return careSessions;
  }),

  // ************************
  // *       UPDATE         *
  // ************************

  // ************************
  // *       DELETE         *
  // ************************

  //BROKEN
  deleteOnePotentialCaregiver: privateProcedure
    .input(
      z.object({
        careSessionId: z.string(),
        caregiverId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { careSessionId } = input;
      const item = await ctx.prisma.potentialCareSession.delete({
        where: {
          // careSessionId,z
        },
      });
      return item;
    }),
});
