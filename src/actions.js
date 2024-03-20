import { HttpError } from 'wasp/server';

export const createNote = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }

  return context.entities.Note.create({
    data: {
      description: args.description,
      content: args.content,
      isPublic: args.isPublic,
      userId: context.user.id
    }
  });
};

export const updateNote = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }

  const note = await context.entities.Note.findUnique({
    where: { id: args.id }
  });
  if (note.userId !== context.user.id) { throw new HttpError(403); }

  return context.entities.Note.update({
    where: { id: args.id },
    data: {
      description: args.description,
      content: args.content,
      isPublic: args.isPublic
    }
  });
};

export const deleteNote = async ({ noteId }, context) => {
  if (!context.user) { throw new HttpError(401); }

  const note = await context.entities.Note.findUnique({
    where: { id: noteId }
  });
  if (note.userId !== context.user.id) { throw new HttpError(403); }

  return context.entities.Note.delete({
    where: { id: noteId }
  });
};