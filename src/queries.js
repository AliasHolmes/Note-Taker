import { HttpError } from 'wasp/server'

export const getNote = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const note = await context.entities.Note.findUnique({
    where: { id: args.id }
  });

  if (!note) throw new HttpError(404, `Note with id ${args.id} not found`);
  if (!note.isPublic && note.userId !== context.user.id) throw new HttpError(403, 'Unauthorized access to note');

  return note;
}

export const getNotes = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const userId = context.user.id;
  return context.entities.Note.findMany({
    where: {
      OR: [
        { isPublic: true },
        { userId }
      ]
    }
  });
}