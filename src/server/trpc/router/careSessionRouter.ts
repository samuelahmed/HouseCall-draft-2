import { router, publicProcedure, privateProcedure } from "../trpc";
import { z } from "zod";
import slug from "slug";

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
        totalHours: z.number().nonnegative(),
        totalCompensation: z.number(),
        acceptedCaregiverId: z.string(),
        careSessionStatus: z.string(),
        sessionDay: z.number(),
        sessionMonth: z.number(),
        sessionYear: z.number(),
        sessionStartHour: z.number(),
        sessionStartMinute: z.number(),
        sessionEndHour: z.number(),
        sessionEndMinute: z.number(),

        city: z.string(),
        postalCode: z.string(),
        location: z.string(),
        slug: z.string(),
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
        sessionDay,
        sessionMonth,
        sessionYear,
        sessionStartHour,
        sessionStartMinute,
        sessionEndHour,
        sessionEndMinute,
        city,
        postalCode,
        location,
        slug,
      } = input;

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });
      if (!user) {
        throw new Error("Error! user not found.");
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
          sessionDay,
          sessionMonth,
          sessionYear,
          sessionStartHour,
          sessionStartMinute,
          sessionEndHour,
          sessionEndMinute,
          slug: slug,
          userId: currentUserId,
          city,
          postalCode,
          location,
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
      const potentialCaregiverPage =
        await ctx.prisma.potentialCareSession.create({
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

  //This will read all information including hashed passwords
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
        throw new Error("Error! user not found.");
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
      const potentialCaregiver =
        await ctx.prisma.potentialCareSession.findFirst({
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
      const potentialCaregiver =
        await ctx.prisma.potentialCareSession.findUnique({
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

  readAllSessionsForTable: privateProcedure.query(({ ctx }) => {
    if (!ctx.session || !ctx.session.user) {
      return null;
    }
    const careSessions = ctx.prisma.careSession.findMany({
      where: {
        careSessionStatus: {
          in: ["New", "Active"],
        },
      },
      // include: {
      //   user: {
      //     select: {
      //       id: true,
      //       username: true,
      //       role: true,
      //     },
      //   },
      // },
    });
    return careSessions;
  }),

  readAllNewSessionsByUser: privateProcedure.query(({ ctx }) => {
    if (!ctx.session || !ctx.session.user) {
      return null;
    }
    const careSessions = ctx.prisma.careSession.findMany({
      where: {
        userId: ctx.session.user.id,
        careSessionStatus: "New",
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

  readAllActiveSessionsByUser: privateProcedure.query(({ ctx }) => {
    if (!ctx.session || !ctx.session.user) {
      return null;
    }
    const careSessions = ctx.prisma.careSession.findMany({
      where: {
        userId: ctx.session.user.id,
        careSessionStatus: "Active",
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

  //used for discover page
  readAllSessionsWithStatusNew: privateProcedure.query(({ ctx }) => {
    if (!ctx.session || !ctx.session.user) {
      return null;
    }
    const careSessions = ctx.prisma.careSession.findMany({
      where: {
        careSessionStatus: {
          in: ["New", "Active"],
        },
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

  //used for patient-new page
  readAllCurrentUserSessionsWithStatusNew: privateProcedure.query(({ ctx }) => {
    if (!ctx.session || !ctx.session.user) {
      return null;
    }
    const careSessions = ctx.prisma.careSession.findMany({
      where: {
        userId: ctx.session.user.id,
        careSessionStatus: {
          in: ["New", "Active"],
        },
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

  readAllScheduledSessionsByUser: privateProcedure.query(({ ctx }) => {
    if (!ctx.session || !ctx.session.user) {
      return null;
    }
    const careSessions = ctx.prisma.careSession.findMany({
      where: {
        userId: ctx.session.user.id,
        careSessionStatus: "Scheduled",
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

  readAllCompletedSessionsByUser: privateProcedure.query(({ ctx }) => {
    if (!ctx.session || !ctx.session.user) {
      return null;
    }
    const careSessions = ctx.prisma.careSession.findMany({
      where: {
        userId: ctx.session.user.id,
        careSessionStatus: "Completed",
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

  readAllCanceledSessionsByUser: privateProcedure.query(({ ctx }) => {
    if (!ctx.session || !ctx.session.user) {
      return null;
    }
    const careSessions = ctx.prisma.careSession.findMany({
      where: {
        userId: ctx.session.user.id,
        careSessionStatus: "Canceled",
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

  readAllAppliedPotentialSessionsByUser: privateProcedure.query(
    async ({ ctx }) => {
      if (!ctx.session || !ctx.session.user) {
        throw new Error("Error! Not authorized.");
      }
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });
      if (!user) {
        throw new Error("Error! user not found.");
      }
      const userId = user.id;
      const currentUserPotentialCareSessions =
        await ctx.prisma.potentialCareSession.findMany({
          where: {
            caregiverId: userId,
            status: "Applied",
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
    }
  ),

  readAllScheduledPotentialSessionsByUser: privateProcedure.query(
    async ({ ctx }) => {
      if (!ctx.session || !ctx.session.user) {
        throw new Error("Error! Not authorized.");
      }
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });
      if (!user) {
        throw new Error("Error! user not found.");
      }
      const userId = user.id;
      const currentUserPotentialCareSessions =
        await ctx.prisma.potentialCareSession.findMany({
          where: {
            caregiverId: userId,
            status: "Accepted",
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
    }
  ),

  readAllHistoricalSessionsByUser: privateProcedure.query(async ({ ctx }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new Error("Error! Not authorized.");
    }
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    if (!user) {
      throw new Error("Error! user not found.");
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

  updateOneCareSessionTwo: privateProcedure
    .input(
      z.object({
        careSessionStatus: z.string(),
        careSessionId: z.string(),
        slug: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { careSessionStatus, slug, careSessionId, userId } = input;
      const updatedCareSession = await ctx.prisma.careSession.upsert({
        create: {
          slug,
          userId,
          careSessionStatus,
        },
        update: {
          careSessionStatus,
        },
        where: {
          id: careSessionId,
        },
      });
      return updatedCareSession;
    }),

  updateOnePotentialCareSession: privateProcedure
    .input(
      z.object({
        status: z.string(),
        caregiverId: z.string(),
        careSessionId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { status, caregiverId, careSessionId } = input;
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
      const updatedPotentialCareSession =
        await ctx.prisma.potentialCareSession.update({
          where: {
            id: potentialCareSession.id || "",
          },
          data: {
            status,
          },
        });
      return updatedPotentialCareSession;
    }),

  cancelOneCareSession: privateProcedure
    .input(
      z.object({
        patientId: z.string(),
        careSessionId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { patientId, careSessionId } = input;
      const careSession = await ctx.prisma.careSession.findFirst({
        where: {
          id: careSessionId,
        },
      });
      if (!careSession) {
        throw new Error("Care session not found");
      }
      if (careSession.userId !== patientId) {
        throw new Error("You do not own this session");
      }
      const updatedCareSession = await ctx.prisma.careSession.update({
        where: {
          id: careSession.id || "",
        },
        data: {
          careSessionStatus: "Canceled",
        },
      });
      return updatedCareSession;
    }),

  reActivateOneCareSession: privateProcedure
    .input(
      z.object({
        patientId: z.string(),
        careSessionId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { patientId, careSessionId } = input;
      const careSession = await ctx.prisma.careSession.findFirst({
        where: {
          id: careSessionId,
        },
      });
      if (!careSession) {
        throw new Error("Care session not found");
      }
      if (careSession.userId !== patientId) {
        throw new Error("You do not own this session");
      }
      const updatedCareSession = await ctx.prisma.careSession.update({
        where: {
          id: careSession.id,
        },
        data: {
          careSessionStatus: "Active",
        },
      });
      return updatedCareSession;
    }),

  updateAllOtherPotentialCareSessionsToClosed: privateProcedure
    .input(
      z.object({
        caregiverId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { caregiverId } = input;
      const potentialCareSessions =
        await ctx.prisma.potentialCareSession.findMany({
          where: {
            caregiverId: {
              not: caregiverId,
            },
          },
        });
      if (!potentialCareSessions) {
        throw new Error("Potential care session not found");
      }
      const updatedPotentialCareSessions =
        await ctx.prisma.potentialCareSession.updateMany({
          where: {
            caregiverId: {
              not: caregiverId,
            },
          },
          data: {
            status: "Closed",
          },
        });
      return updatedPotentialCareSessions;
    }),

  updateOnePotentialCaregiver: privateProcedure
    .input(
      z.object({
        status: z.string(),
        caregiverId: z.string(),
        careSessionId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { caregiverId, careSessionId, status } = input;
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
        await ctx.prisma.potentialCareSession.update({
          where: {
            id: potentialCareSession.id || "",
          },
          data: {
            status,
          },
        });
      return deletedPotentialCareSession;
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
