"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const createBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required",
        }),
        author: zod_1.z.string({
            required_error: "Title is required",
        }),
        genre: zod_1.z.string({
            required_error: "Title is required",
        }),
        publicationDate: zod_1.z.string({
            required_error: "Title is required",
        }),
        addedBy: zod_1.z.string({
            required_error: "Adder user's email is required!",
        }),
        reviews: zod_1.z
            .array(zod_1.z.object({
            reviewerEmail: zod_1.z.string({}).optional(),
            rating: zod_1.z.number({}).optional(),
            comment: zod_1.z.string({}).optional(),
        }))
            .default([]),
    }),
});
const updateBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({}).optional(),
        author: zod_1.z.string({}).optional(),
        genre: zod_1.z.string({}).optional(),
        publicationDate: zod_1.z.string({}).optional(),
        addedBy: zod_1.z.string({}).optional(),
        reviews: zod_1.z
            .array(zod_1.z.object({
            reviewerEmail: zod_1.z.string({}).optional(),
            rating: zod_1.z.number({}).optional(),
            comment: zod_1.z.string({}).optional(),
        }))
            .default([]),
    }),
});
exports.BookValidation = {
    createBookZodSchema,
    updateBookZodSchema,
};
