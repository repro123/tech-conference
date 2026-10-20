import {defineType, defineField} from 'sanity'

export const talk = defineType({
  name: 'talk',
  title: 'Talk',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Talk Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'speaker',
      title: 'Speaker',
      type: 'reference',
      to: [{type: 'speaker'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'day',
      title: 'Conference Day',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1).max(3),
    }),
    defineField({
      name: 'track',
      title: 'Track',
      type: 'reference',
      to: [{type: 'track'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startTime',
      title: 'Start Time',
      type: 'string',
      description: 'Use 24-hour format, e.g. 09:00',
      validation: (Rule) =>
        Rule.regex(/^([01]\d|2[0-3]):[0-5]\d$/).error('Use HH:mm format, e.g. 09:00'),
    }),
    defineField({
      name: 'endTime',
      title: 'End Time',
      type: 'string',
      description: 'Use 24-hour format, e.g. 10:00',
      validation: (Rule) =>
        Rule.regex(/^([01]\d|2[0-3]):[0-5]\d$/).error('Use HH:mm format, e.g. 10:00'),
    }),
    defineField({
      name: 'location',
      title: 'Room',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'highlighted',
      title: 'Highlighted Talk',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
