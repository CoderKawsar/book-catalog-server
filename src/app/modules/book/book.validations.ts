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
    publicationDate: z.date({
      required_error: "Title is required",
    }),
    reviews: z.array(z.string({})).default([]),
  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string({}).optional(),
    author: z.string({}).optional(),
    genre: z.string({}).optional(),
    publicationDate: z.date({}).optional(),
    reviews: z.array(z.string({})).default([]).optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
};
