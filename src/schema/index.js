import { z } from "zod";

const todoShema = z.object({
  task: z.string().min(1),
  completed: z.boolean(),
});

export { todoShema };
