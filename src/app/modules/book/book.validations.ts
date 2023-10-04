import { z } from "zod";

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    author: z.string({
      required_error: "Title is required",
    }),
    genre: z.string({
      required_error: "Title is required",
    }),
    publicationDate: z.string({
      required_error: "Title is required",
    }),
    addedBy: z.string({
      required_error: "Adder user's email is required!",
    }),
    reviews: z
      .array(
        z.object({
          reviewerEmail: z.string({}).optional(),
          rating: z.number({}).optional(),
          comment: z.string({}).optional(),
        })
      )
      .default([]),
  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string({}).optional(),
    author: z.string({}).optional(),
    genre: z.string({}).optional(),
    publicationDate: z.string({}).optional(),
    addedBy: z.string({}).optional(),
    reviews: z
      .array(
        z.object({
          reviewerEmail: z.string({}).optional(),
          rating: z.number({}).optional(),
          comment: z.string({}).optional(),
        })
      )
      .default([]),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
};
