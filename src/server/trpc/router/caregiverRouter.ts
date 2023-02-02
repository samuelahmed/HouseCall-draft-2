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

  //create one CaregiverPage

  //This page will be created when:
    //1. A caregiver applies for a session - this page is created with caregiver current info & status pending & session unique info (like caregiver's notes)
    //2. A caregiver is accepted for a session - This page is updated to reflect the accepted status
    //3. A caregiver is declined for a session - This page is updated to reflect the declined status

  //On this page the information displayed will be:
    //1. Caregiver's name
    //2. Caregiver's Image (maybe)
    //3. Caregiver's notes when applying for the session (this needs to be built completely)
    //4. Caregiver's hourly rate
    //5. Caregiver's total expected hours
    //6. Caregiver's total expected compensation
    //7. Caregiver's status (accepted, pending, declined)
    //8. Caregiver's rating (this needs to be built completely)
    //9. Caregiver's reviews (DO WE WANT THIS?)

  //On this page the follow actions can be taken:
    //10. Button to Accept Caregiver
    //11. Button to Decline Caregiver
    //12. Button to Message Caregiver

  createOneCaregiverPage: privateProcedure
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

  // ************************
  // *        READ          *
  // ************************

  // ************************
  // *       UPDATE         *
  // ************************

  // ************************
  // *       DELETE         *
  // ************************
});
