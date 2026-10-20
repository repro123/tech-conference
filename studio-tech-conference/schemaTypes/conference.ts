import {defineType, defineField} from 'sanity'

export const conference = defineType({
  name: 'conference',
  title: 'Conference',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Conference Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brandCode',
      title: 'Brand Code',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {name: 'venue', title: 'Venue', type: 'string'},
        {name: 'city', title: 'City', type: 'string'},
        {
          name: 'cityAbbreviation',
          title: 'City Abbreviation',
          type: 'string',
        },
        {name: 'state', title: 'State', type: 'string'},
      ],
    }),
  ],
})
