import { router, publicProcedure, privateProcedure } from "../trpc";
import { z } from "zod";
import slug from "slug";

//This router is for the following prisma models:
  //CareSession
  //PotentialCareSession

export const careSessionRouter = router({
  // ************************
  // *       CREATE         *
  // ************************
  createOneCareSession: privateProcedure
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
      const currentUserId = user.id;
      const careSession = await ctx.prisma.careSession.create({
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
          userId: currentUserId,
        },
      });
      return careSession;
    }),

  createOnePotentialCaregiverPage: privateProcedure
    .input(
      z.object({
        careSessionId: z.string(),
        caregiverId: z.string(),
        status: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { careSessionId, caregiverId, status } = input;
      //Instead of generating random string here it would be better to do something else
      //This will probably collide eventually
      const secondSlug = Math.random().toString(36).substring(7);
      const potentialCaregiverPage = await ctx.prisma.potentialCareSession.create({
        data: {
          careSessionId,
          caregiverId,
          status,
          slug: slug(secondSlug),
        },
      });
      return potentialCaregiverPage;
    }),

  // ************************
  // *        READ          *
  // ************************

  // NOTE: THIS WILL PULL ALL USER INFORMATION
  //       INCLUDING HASHED PASSWORDS.
  // SHOULD THIS BE MOVED TO USER ROUTER?
  readOneUserByPotentialCareSessionCaregiverId: privateProcedure
    .input(z.object({ caregiverId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { caregiverId } = input;
      const userInformation = await ctx.prisma.user.findUnique({
        where: {
          id: caregiverId,
        },
      });
      if (!userInformation) {
        throw new Error("Meow! user not found.");
      }
      return userInformation;
    }),

  readOnePotentialCaregiver: privateProcedure
    .input(
      z.object({
        caregiverId: z.string(),
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { caregiverId, id } = input;
      const potentialCaregiver = await ctx.prisma.potentialCareSession.findFirst({
        where: {
          caregiverId: caregiverId,
          careSessionId: id,
        },
      });
      return potentialCaregiver;
    }),

  readOneSessionBySessionId: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const careSession = ctx.prisma.careSession.findUnique({
        where: {
          id,
        },
      });
      return careSession;
    }),

  readOneSessionBySlug: privateProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const { slug } = input;
      const careSession = await ctx.prisma.careSession.findUnique({
        where: {
          slug,
        },
      });
      return careSession;
    }),

  readOnePotentialCaregiverPageBySlug: privateProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const { slug } = input;
      const potentialCaregiver = await ctx.prisma.potentialCareSession.findUnique({
        where: {
          slug,
        },
      });
      return potentialCaregiver;
    }),

  readAllPotentialCareSessionsByCareSessionId: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const potentialCareSessions =
        await ctx.prisma.potentialCareSession.findMany({
          where: {
            careSessionId: id,
          },
        });
      return potentialCareSessions;
    }),

  readAllSessions: publicProcedure.query(({ ctx }) => {
    const careSessions = ctx.prisma.careSession.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
    });
    return careSessions;
  }),

  readAllSessionsByUser: privateProcedure.query(({ ctx }) => {
    if (!ctx.session || !ctx.session.user) {
      return null;
    }
    const careSessions = ctx.prisma.careSession.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
    });
    return careSessions;
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
          status: "Pending",
        },
      });
    const careSessionIds = currentUserPotentialCareSessions.map(
      (session) => session.careSessionId
    );
    const careSessions = await ctx.prisma.careSession.findMany({
      where: {
        id: {
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
        caregiverId: userId
        //ADD STATUS: COMPLETED WHEN IT IS ADDED TO THE SCHEMA
        // careSessionStatus: "accepted"
        //why is this not working?
        },
    });
    const careSessionIds = currentUserPotentialCareSessions.map(
      (session) => session.careSessionId
    );
    const careSessions = await ctx.prisma.careSession.findMany({
      where: {
        id: {
          in: careSessionIds,
        },
      },
    });
    return careSessions;
  }),

  // ************************
  // *       UPDATE         *
  // ************************

  updateOneCareSession: privateProcedure
    .input(
      z.object({
        acceptedCaregiverId: z.string(),
        careSessionStatus: z.string(),
        careSessionId: z.string(),
        slug: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const {
        acceptedCaregiverId,
        careSessionStatus,
        careSessionId,
        slug,
        userId,
      } = input;
      const updatedCareSession = await ctx.prisma.careSession.upsert({
        create: {
          slug,
          userId,
          acceptedCaregiverId,
          careSessionStatus,
        },
        update: {
          acceptedCaregiverId,
          careSessionStatus,
          slug,
          userId,
        },
        where: {
          id: careSessionId,
        },
      });
      return updatedCareSession;
    }),

  // ************************
  // *       DELETE         *
  // ************************

  //THIS IS PROBABLY A REALLY BAD IDEA TO DELETE THE POTENTIAL CAREGIVERS
  //INSTEAD IT SHOULD BE UPDATED TO HAVE A STATUS OF "CANCELLED"
  deleteOnePotentialCaregiver: privateProcedure
    .input(
      z.object({
        caregiverId: z.string(),
        careSessionId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { caregiverId, careSessionId } = input;
      const potentialCareSession =
        await ctx.prisma.potentialCareSession.findFirst({
          where: {
            caregiverId,
            careSessionId,
          },
        });
      if (!potentialCareSession) {
        throw new Error("Potential care session not found");
      }
      const deletedPotentialCareSession =
        await ctx.prisma.potentialCareSession.delete({
          where: {
            id: potentialCareSession.id || "",
          },
        });
      return deletedPotentialCareSession;
    }),
});
