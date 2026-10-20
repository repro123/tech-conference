import {defineType, defineField} from 'sanity'

export const track = defineType({
  name: 'track',
  title: 'Track',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Track Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'color',
      title: 'Track Color',
      type: 'string',
      description: 'Hex color, e.g. #B5E9FC',
      validation: (Rule) =>
        Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Enter a valid hex color, e.g. #B5E9FC'),
    }),
  ],
})
