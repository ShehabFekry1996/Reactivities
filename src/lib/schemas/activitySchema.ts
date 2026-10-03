import {z} from 'zod';

const requiredString = (fieldName:string) => z.string().min(1, { message: `${fieldName} is required` });

export const activitySchema = z.object({
    title:requiredString('Title'),
    description:requiredString('Description'),
    venue:requiredString('Venue'),
    city:requiredString('City'),
    date:requiredString('Date'),
    category:requiredString('Category'),
});


export type ActivitySchema = z.infer<typeof activitySchema>;